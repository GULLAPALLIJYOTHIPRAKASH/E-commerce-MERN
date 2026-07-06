function ShopOrders(){
    return(<>
    <div className="orders-section border-1 border-gray-300 p-4 mt-3 rounded-sm">
        <h1 className="text-base font-medium mb-3">Orders History</h1>
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
                    <tr className=" group">
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">6a170a3cf6c0392d69f92d8a</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">2026/05/27</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">Delivered</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">$999</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300"><button className="px-2 py-1 bg-black text-white rounded-lg">view</button></td>
                    </tr>
                    <tr className=" group">
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">6a170a3cf6c0392d69f92d8a</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">2026/05/27</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">Delivered</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">$999</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300"><button className="px-2 py-1 bg-black text-white rounded-lg">view</button></td>
                    </tr>
                    <tr className=" group">
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">6a170a3cf6c0392d69f92d8a</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">2026/05/27</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">Delivered</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">$999</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300"><button className="px-2 py-1 bg-black text-white rounded-lg">view</button></td>
                    </tr>
                    <tr className=" group">
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">6a170a3cf6c0392d69f92d8a</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">2026/05/27</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">Delivered</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300">$999</td>
                        <td className="text-[12px] md:text-base p-2 group-hover:bg-gray-100 trantion-all linear duration-300"><button className="px-2 py-1 bg-black text-white rounded-lg">view</button></td>
                    </tr>
                    
                </tbody>
            </table>
        </section>
        
    </div>
    </>)
}
export default ShopOrders;