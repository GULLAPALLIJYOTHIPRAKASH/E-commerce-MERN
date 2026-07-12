import { useEffect, useRef, useState } from "react";
import AddProductsSidebar from "../../components/Admin-View/AddProductsSidebar";
import {toast} from "react-toastify";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { AddAdminProduct, DeleteAdminProduct, GetAllAdminProducts, UpdateAdminProduct } from "../../redux/Admin/product-slice";
import AdminProductCard from "../../components/Admin-View/AdminProductCard";

const initialObj = {

    image: null,
    title:"",
    description:"",
    category:"men",
    brand:"nike",
    price:null,
    salePrice:null,
    totalStock:null

}
function Products(){

    const [showAddProducts , setShowAddProducts] = useState(false);
    const [addProductsform  , setAddProductsForm] = useState(initialObj);
    const [previewImg , setPreviewImg] = useState('');
    const ImageRef = useRef();
    const [loading , setLoading] = useState(false);
    const[editStatus , setEditStatus] = useState(false);

    const dispatch = useDispatch();
    const {productsList} = useSelector((state) => state.AdminProducts)

    // Handle show/hide Add Product sidebar
    const HandleShowAddProducts = () => {

        setShowAddProducts(!showAddProducts);

        // reset
        setAddProductsForm(initialObj);
        setPreviewImg("");
        setEditStatus(false);
        
    }

    // Handle All inputs
    const HandleAllInputs = (e) => {

        let name = e.target.name;
        let val = e.target.value;

        let data = {
            ...addProductsform,
            [name]:val
        }


        if(name === "price" || name === "salePrice" || name === "totalStock" ){

            data = {
                ...data ,
                [name] : Number(val)
            }
        }
        

        

        setAddProductsForm(data)
        

        
        
    }

    // reset preview img
    // const HandlePreviewImg = () => {

    //     console.log("preview reset");
        
    //     setAddProductsForm({
    //         ...addProductsform,
    //         image:null
    //     });
    //     setPreviewImg(null);

    //     // reset the Image file
    //     if(ImageRef.current){

    //         ImageRef.current.value="";
    //     }
    // }


    // reset preview & delete Image from cloudinary 
    const HandlePreviewImg = async (publicId) => {


        
        let id = publicId.split("/")[1];

        setLoading(true);

        try {

            const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL
            
           const response = await axios.delete(`${BackendAPI_URL}/api/admin/dashboard/delete-cloudinary/${id}`, {
                withCredentials : true
            });


            if(response.data.success){


                setAddProductsForm({
                ...addProductsform,
                image:null
                });
                setPreviewImg(null);

                // reset the Image file
                if(ImageRef.current){

                ImageRef.current.value="";
                }


                toast("Banner Delete from cloudinary");


            }
            
        } catch (error) {
            
            console.log(error.message);
            
        }
        finally{
            setLoading(false);
        }

        
    }


    // Handle Img upload
    const HandleImgUpload = async (e)=> {

        const file = e.target.files[0]

        
        //reset every time when  same file selected
        e.target.value='';

        // stop if file is empty
        if(!file) return ;

        // 5MB size
        const Max_Img_Size = 5 * 1024 *1025 

        if(file.size >= Max_Img_Size){

            toast.warn("Image size should  be less than 5MB only",{

                toastId:'Img-size-warn',
                autoClose:1000
            });

            return ;
        }

        setLoading(true);
        try {
            const formdata = new FormData();

            // multer single image
            formdata.append("image" , file);


            const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL

            const response = await axios.post(`${BackendAPI_URL}/api/admin/product/uploadImg` , formdata , {
                withCredentials : true
            });


            if(response?.data?.success){

                // Img url
                setAddProductsForm(
                    {
                        ...addProductsform,
                        image: {
                            url:response.data?.data.url,
                            publicId:response?.data?.data?.publicId
                        }
                    }
                )

                setPreviewImg(response.data?.data);


                toast("Product Image upload Successfuly", {
                    toastId:"ImguploadSuccessfuly",
                    autoClose:1000
                })
            }            


            
        } catch (error) {
            

            console.log(error.message);
            
        }
        finally{

            setLoading(false);
        }
        
        
    }

    // Add submit Product Handle 
    const HandleAddProducts = async (e) => {

        e.preventDefault();

        setLoading(true)

        try {

            const formData =  {...addProductsform};
            const response = await dispatch(AddAdminProduct(formData)).unwrap();


            if(response.success){

                // refetch newly added products
                dispatch(GetAllAdminProducts());

                // reset
                setAddProductsForm(initialObj);
                setPreviewImg("");
                setLoading(false);
                setShowAddProducts(false);

                toast.success(response.message , {
                    toastId:"AdminAddproduct"
                })

            }
            
        } catch (error) {
            
            console.log(error);
            
        }
        finally{
            setLoading(false);

        }
    }

    // Delete Product Handle 
    const HandleDeleteProducts = async (productId) => {

        setLoading(true);        
        try {
            
            const response = await dispatch(DeleteAdminProduct(productId)).unwrap();

            if(response.success){

                // refetch all products
                dispatch(GetAllAdminProducts());

                toast.success("Product deleted Successfuly",{
                    toastId:"deletedProduct"
                });

            }

        } catch (error) {

            console.log(error);
            
            
        }
        finally{
            setLoading(true);        

        }

    }


    // Handle edit status
    const HandleEditStatus = (id) => {

        const productData = productsList?.find((item) => item?._id.toString() === id);

        // edit product data
        setAddProductsForm({

            ...productData
    
        })

        setEditStatus(!editStatus);
        // show Add/editform sidebar
        setShowAddProducts(true);

        console.log(productData);
        
    }


    // Submit edit product Data
    const SubmitEditProduct = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const formData =  {...addProductsform};
            const response = await dispatch(UpdateAdminProduct({productId:formData?._id , formData})).unwrap();


            if(response.success){

                // refetch newly added products
                dispatch(GetAllAdminProducts());

                // reset
                setAddProductsForm(initialObj);
                setPreviewImg("");
                setLoading(false);
                setShowAddProducts(false);
                setEditStatus(false);

                toast.success(response.message , {
                    toastId:"AdminEditproduct"
                })

            }
            
        } catch (error) {
            
            console.log(error);
            
        }
        finally{
            setLoading(false);

        }
    }




    // get all productcs
    useEffect(() => {

        dispatch(GetAllAdminProducts())
    },[dispatch])


    if(loading){

        return(<>
        
        <h1 className="text-2xl">Loading</h1>
        </>)
    }
    
    return(<>
    <div className="products-container">
        <div className="products-center">
            <div className="heading text-right">
                <button onClick={HandleShowAddProducts} className="text-white bg-black p-2 text-sm cursor-pointer hover:opacity-80  transition-all linear duration-300">Add New Products</button>
            </div>

            {/* products section start */}
            <AdminProductCard HandleEditStatus={HandleEditStatus} HandleDeleteProducts={HandleDeleteProducts} productsList={productsList}/>
            {/* products section end */}
        </div>
    </div>

    {/* Add/Edit Products sidebar */}
    <AddProductsSidebar SubmitEditProduct={SubmitEditProduct} editStatus={editStatus} previewImg={previewImg} HandleImgUpload={HandleImgUpload} HandleAddProducts={HandleAddProducts} HandlePreviewImg={HandlePreviewImg} ImageRef={ImageRef} HandleAllInputs={HandleAllInputs} addProductsform={addProductsform} showAddProducts={showAddProducts} HandleShowAddProducts={HandleShowAddProducts}/>
    
    </>)
}

export default Products;