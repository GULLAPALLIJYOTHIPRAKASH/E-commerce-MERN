function OrderDetailView({showOrderDetail, HanldeOrderDetails}){


    return(<>
    <div className={`order-details-view-container w-[100%] h-[100%] fixed top-0 left-0 ${showOrderDetail ? 'left-[0]' : 'left-[100%]'} bg-gray-500/10 z-100 transition-all linear duration-300 flex justify-center items-center`}>
        <div className="details-center w-[100%] p-3 max-w-[650px] max-h-[350px] mx-[20px] scrollbar-thin overflow-y-auto bg-white rounded-lg">
            <div onClick={HanldeOrderDetails} className="close-btn text-right mb-3">
                <i className="text-lg cursor-pointer fa-solid fa-xmark"></i>
            </div>
            {/* order details */}
            <div className="order-info border-b-2">
                {/* Order Id */}
                <div className="field mb-1 flex justify-between items-center ">
                    <h1 className="text-sm font-medium text-gray-500">Order Id</h1>
                    <h3 className="text-sm font-medium text-black">ORD202607070001</h3>
                </div>
                 <div className="field mb-1 flex justify-between items-center">
                    <h1 className="text-sm font-medium text-gray-500">Ord Date</h1>
                    <h3 className="text-sm font-medium text-black">5/27/2026</h3>
                </div>
                <div className="field mb-1 flex justify-between items-center">
                    <h1 className="text-sm font-medium text-gray-500">Payment Method</h1>
                    <h3 className="text-sm font-medium text-black">Paypal</h3>
                </div>
                <div className="field mb-1 flex justify-between items-center">
                    <h1 className="text-sm font-medium text-gray-500">Payment Status</h1>
                    <h3 className="text-sm font-medium text-black">Paid</h3>
                </div>
                 <div className="field mb-1 flex justify-between items-center">
                    <h1 className="text-sm font-medium text-gray-500">Price</h1>
                    <h3 className="text-sm font-medium text-black">$999</h3>
                </div>
                 <div className="field mb-1 flex justify-between items-center">
                    <h1 className="text-sm font-medium text-gray-500">Status</h1>
                    <h3 className="text-sm font-medium text-black">Delivered</h3>
                </div>
                

            </div>

            {/* product details */}
            <div className="products-info border-b-2">
                <h1 className="text-sm font-medium my-1">Product Details</h1>
                {
                    [...Array(5)].map((i) => {

                        return(<div className="field mb-1 flex justify-between items-center ">
                    <h1 className="text-[12px] font-medium text-gray-500 line-clamp-1">Men's Red T-Shirt  ×2</h1>
                    <h3 className="text-[12px] font-medium text-black">$199</h3>
                </div>)
                    })
                }
                
                

            </div>
            {/* order Address */}
            <div className="details-info ">
                <h1 className="text-sm font-medium my-1">Address</h1>
                <h1 className="text-sm font-medium text-gray-500 my-1">Test</h1>

                {/* Order Id */}
                <div className="field mb-1 flex">
                    <h1 className="text-sm  text-gray-500">Address: </h1>
                    <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">24-29-207, Gulabithota Vijayawada, Andhra Pradesh - 520003</h3>
                </div>
                <div className="field mb-1 flex">
                    <h1 className="text-sm font-medium text-gray-500">City: </h1>
                    <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">Vijayawada</h3>
                </div>
                <div className="field mb-1 flex">
                    <h1 className="text-sm font-medium text-gray-500">Pincode: </h1>
                    <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">520003</h3>
                </div>
                <div className="field mb-1 flex">
                    <h1 className="text-sm font-medium text-gray-500">Phone: </h1>
                    <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">1262620003</h3>
                </div>
                  <div className="field mb-1 flex">
                    <h1 className="text-sm font-medium text-gray-500">Notes: </h1>
                    <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">Primary</h3>
                </div>
               
                

            </div>
        </div>
    </div>
    </>)
}

export default OrderDetailView;