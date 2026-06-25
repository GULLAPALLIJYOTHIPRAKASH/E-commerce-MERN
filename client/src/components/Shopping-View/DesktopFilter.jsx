import { ProductFilter } from "../config/config";

function DesktopFilter(){

    return(<>
     <section className="desktop-filter">
                {
                    Object.keys(ProductFilter).map((filterType) => {

               return( <div key={filterType + "desktop"} className="filters mt-5">
                    
                    <h1 className="text-xl font-medium text-black mb-2">{filterType}</h1>

                    <div className="category-filter">
                    {ProductFilter[filterType]?.map((chkOption) => {

                    return(

                        <div key={chkOption.id + "desktop"} className="field flex justify-start items-center gap-2 ">
                            <input className="w-[17px] h-[17px]  accent-teal-300 outline-none cursor-pointer hover:opacity-80 transition-all linear duration-200" type="checkbox" name={chkOption.id} id={chkOption.id} />
                            <label className="text-lg font-normal select-none cursor-pointer tracking-[1px]" htmlFor={chkOption.id}>{chkOption?.label}</label>
                        </div>
                        
                    )
                    
                })}
                </div>

                    {/* category filter */}
                    
                    
                </div>

                    )})
                    
                    }
            </section>
    
    </>)
}

export default  DesktopFilter;