import { ProductFilter } from "../config/config";

function DesktopFilter({filters , HandleFilter}){

    

    
    

    return(<>
     <section className="desktop-filter">
         {/* category filter */}
                {
                    Object.keys(ProductFilter).map((filterType) => {

               return( <div key={filterType + "desktop"} className="filters mt-5">
                    
                    <h1 className="text-xl font-medium text-black mb-2">{filterType}</h1>

                    <div className="category-filter">
                    {ProductFilter[filterType]?.map((chkOption) => {

                    return(

                        <div key={chkOption.id + "desktop"} className="field flex justify-start items-center gap-2 ">
                            <input   onChange={() => HandleFilter(filterType ,chkOption.id)} checked={
                                filters && Object.keys(filters).length > 0 && filters[filterType] && filters[filterType].indexOf(chkOption.id) > -1 ? true : false} 
                            className="w-[17px] h-[17px]  accent-teal-300 outline-none cursor-pointer hover:opacity-80 transition-all linear duration-200" type="checkbox" name={chkOption.id} id={chkOption.id} />
                            <label className="text-lg font-normal select-none cursor-pointer tracking-[1px]" htmlFor={chkOption.id}>{chkOption?.label}</label>
                        </div>
                        
                    )
                    
                })}
                </div>

                    
                    
                </div>

                    )})
                    
                    }
            </section>
    
    </>)
}

export default  DesktopFilter;