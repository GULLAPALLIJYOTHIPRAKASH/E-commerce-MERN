import { useEffect, useState } from "react";
import AddProductsSidebar from "../../components/Admin-View/AddProductsSidebar";

const initialObj = {

    image: null,
    title:"",
    description:"",
    category:"men",
    brand:"nike",
    price:0,
    salePrice:0,
    totalStock:0

}
function Products(){

    const [showAddProducts , setShowAddProducts] = useState(false);
    const [addProductsform  , setAddProductsForm] = useState(initialObj)

    // Handle show/hide Add Product sidebar
    const HandleShowAddProducts = () => {

        setShowAddProducts(!showAddProducts);

        setShowAddProducts(initialObj);
    }

    // Handle All inputs
    const HandleAllInputs = (e) => {

        let name = e.target.name;
        let val = e.target.value;

        const data = {
            ...addProductsform,
            [name]:val
        }

        

        setAddProductsForm(data)
        
        
    }

    useEffect(() => {

        console.log(addProductsform);
        
    })
    return(<>
    <div className="products-container">
        <div className="products-center">
            <div className="heading text-right">
                <button onClick={HandleShowAddProducts} className="text-white bg-black p-2 text-sm cursor-pointer hover:opacity-80  transition-all linear duration-300">Add New Products</button>
            </div>
        </div>
    </div>

    {/* Add/Edit Products sidebar */}
    <AddProductsSidebar HandleAllInputs={HandleAllInputs} addProductsform={addProductsform} showAddProducts={showAddProducts} HandleShowAddProducts={HandleShowAddProducts}/>
    
    </>)
}

export default Products;