import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminAddBanner, AdminDeleteBanners, AdminGetAllBanners } from "../../redux/Admin/dashboard-slice";

const initialObj={
        url:"",
        publicId:"",
        size:"",
        createdBy:""
    }
function Dashboard(){

    
    const [image , setImage] = useState(initialObj);
    const [loading ,setLoading] = useState(false);
    const ImageRef = useRef();

    const dispatch  = useDispatch();

    // user redux
    const {user} = useSelector((state) => state.auth);

    // banner redux
    const {bannersList} = useSelector((state) => state.AdminDashboard);


    // Upload Img cloudinary
    const HandleUpload = async (e) => {

        let file = e.target.files[0];
        
        console.log(file);
        
        
        // reset every time if same reselected
        e.target.value = "";

        if(!file) return ;


        // 5MB only
        const Max_Img_Size = 5 * 1024 * 1024 ;


        if(file.size > Max_Img_Size){

            toast.warn("Please upload below 5MB file only.");

            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("image" , file);

             const response = await axios.post("http://localhost:5000/api/admin/product/uploadImg" , formData , {
                withCredentials : true
            });

            console.log(response);
            
            if(response?.data?.success){

                // store result
                setImage({
                    ...response.data?.data,
                    createdBy:user.id
                });
            }            
            
        } catch (error) {
            
            console.log(error);
            
        }
        finally{

            setLoading(false);
        }


    }

    // close preview
    const HandlePreview = async (publicId) => {

        console.log(publicId);
        

        try {
            
           const response = await axios.delete(`http://localhost:5000/api/admin/dashboard/delete-cloudinary/${publicId}` , {
                withCredentials : true
            });

            console.log(response);

            
        } catch (error) {
            
            console.log(error.message);
            
        }

        setImage(initialObj);

        // reset 
        if(ImageRef.current){
            ImageRef.current.value="";
        }
    }

    // Submit Upload Image
    const SubmitUploadImage = async (e) => {
        e.preventDefault();


        
        if(image.url.trim()){
        
            setLoading(true);
            try {
                const response = await dispatch(AdminAddBanner(image)).unwrap();

                console.log(response);

                if(response.success){

                    // fetch all banner with new
                    dispatch(AdminGetAllBanners());

                    // reset
                    setImage(initialObj);

                    toast.success(response.message , {
                        toastId:"BannerUploaded",
                        autoClose:2000
                    })


                }
                
            } catch (error) {
                
                console.log(error);
                
            }
            finally{
                setLoading(false);
            }
        }else{

            toast.warn("Please Upload Image");
        }
    }


    // Handle Delete Banner
    const HandleDelete = async(bannerId)=> {

        console.log(bannerId);

        setLoading(true);
        
        try {
            
            const response = await dispatch(AdminDeleteBanners(bannerId)).unwrap();

            console.log(response);

            if(response.success){

                // refetch 
                dispatch(AdminGetAllBanners());
                
                toast.success(response.message , {
                    toastId:"Delete_Banner",
                    autoClose:2000
                })
            }
            
        } catch (error) {
            
            console.log(error);
            
        }
        finally{
            
            setLoading(false);
        }
    }

    useEffect(() => {

        dispatch(AdminGetAllBanners());

    },[dispatch])

    if(loading){

        return(<><h1 className="text-lg font-medium">Loading</h1></>)
    }

    console.log(bannersList);
    
    
    return(<>
    <div className="dashboard-container">
        <div className="dashboard-center">
            {/* <div className="heading">
                <h1 className="text-base  text-right">Add New Banners</h1>
            </div> */}

            {/* upload Banner form */}
            <form onSubmit={SubmitUploadImage} className="upload-form">
                <div className="field">
                    <label className="text-base font-normal block mb-1" >Upload a Image</label>
                    <input ref={ImageRef} onChange={HandleUpload} type="file" name="img-upload" id="img-upload" accept="/*"  className="hidden" />
                </div>

{  !image.url ?  

    <label htmlFor="img-upload" className="w-[100%] block p-6 text-center border-2 border-gray-300 border-dashed">

        <i className=" text-lg fa-solid fa-cloud-arrow-up"></i>
        <p className="text-base">Click to upload image</p>
    </label>
:
        <div className="preview-container bg-gray-50 shadow-sm p-6 flex justify-between items-center">
            <img className="w-20 h-20 rounded-full"  src={image.url} alt="banner Image preview" />
            <p className="text-base font-normal">Size :{(image?.size / (1024 * 1024)).toFixed(2)}MB</p>
            <i onClick={() => HandlePreview(image?.publicId)} className="text-lg fa-solid fa-xmark cursor-pointer"></i>
        </div>
}

        <button className="w-[100%] text-base  p-2 bg-black text-white mt-2 rounded-lg cursor-pointer hover:opacity-80 transition-all linear duration-200 tracking-[1px]">Upload</button>
            </form>

            {/* All Banners section */}
            <section className="all-banners mt-5 ">

                {bannersList && bannersList.length > 0 && bannersList?.map((item) => {

                    return(
                        <article key={item?._id} className="single-img mb-5">
                            <div className="img-container relative w-full h-[250px] md:h-[450px] object-cover rounded-lg overflow-hidden">
                                <img  className="w-[100%] h-[100%]  object-cover object-center overflow-hidden" src={item?.banner_url} alt="banner Image" />
                               {/* delete icon */}
                              <div onClick={()=>HandleDelete(item?._id)} className="delete-icon  absolute top-5 right-5 bg-white rounded-full flex justify-center items-center w-[40px] h-[40px] group cursor-pointer ">
                                  <i className=" text-lg text-red-600  group-hover:translate-y-[-4px] transition-all linear duration-300 fa-regular fa-trash-can "></i>
                              </div>
                            </div>
                        </article>
                    )
                })}
            </section>
        </div>
    </div>
    
    </>)
}

export default Dashboard;