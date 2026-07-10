 export const BgStatus = (status) => {

  switch (status) {
    case "pending":
      return "bg-black";

    case "confirmed":
      return "bg-green-500";

    case "inProcess":
    case "inShipped":
      return "bg-teal-500";

    case "delivered":
      return "bg-green-500";

    case "rejected":
      return "bg-red-500";

    default:
      return "bg-none text-black";
  }
};

function AdminOrders({ordersList , HanldeOrderDetails}){

  console.log(ordersList);
  
   
    return(<>
    <div className="orders-section p-4 mt-3 rounded-sm">
        {/* <h1 className="text-base font-medium mb-3">Orders History</h1> */}
        {/* order table */}
        <section className="overflow-x-auto">
            <table className="w-[100%] border-collapse">
                <thead>
                    <tr className="text-center text-[11px] sm:text-base text-gray-600  border-b-1 border-gray-600">

                    <th className="pb-2">Order Id</th>
                    <th className="pb-2">Order Date</th>
                    <th className="pb-2">Order Status</th>
                    <th className="pb-2">Price</th>
                    </tr>
                </thead>
                <tbody className="text-center w-full">
                   { ordersList && ordersList.length > 0 && ordersList?.map((item) => {
                  
                                          return(<tr key={item?._id + "order"} className=" group">
                                          <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-50 trantion-all linear duration-300">{item?._id}</td>
                                          <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-50 trantion-all linear duration-300">{ new Date(item?.orderDate).toLocaleDateString()}</td>
                                          <td className={`text-[12px] md:text-base p-2 group-hover:bg-gray-50 trantion-all linear duration-300 text-white`}><span className={`${BgStatus(`${item.orderStatus}`)} py-1 px-2 rounded-lg capitalize`}>{item.orderStatus}</span></td>
                                          <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-50 trantion-all linear duration-300">${item?.totalAmount}</td>
                                          <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-50 trantion-all linear duration-300"><button onClick={() => {HanldeOrderDetails(item?._id.toString());}} className="px-2 py-1 bg-black text-white rounded-lg cursor-pointer hover:opacity-70 transition-all linear duration-300">view</button></td>
                                      </tr>)
                                      })
                                  }
                    
                  
                    
                </tbody>
            </table>
        </section>
        
    </div>
    </>)
}
export default AdminOrders;