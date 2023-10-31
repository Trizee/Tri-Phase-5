

function Expand({set}){

    return(
    <div>
    <label className="swap swap-rotate fill-gray-500 hover:fill-white">
  
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />
        
        {/* Shrink Icon */}
        <svg onClick={()=>{set(true)}} className="hidden swap-on fill-gray-500 w-8 h-8  hover:fill-white md:block" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="Arrow / Shrink">
        <path id="Vector" d="M5 14H10V19M19 10H14V5"  />
        </g>
        </svg>


        {/*  Expand Icon/ */}
        <svg onClick={()=>{set(false)}} className="hidden swap-off fill-gray-500 w-8 h-8 hover:fill-white md:block" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="Arrow / Expand">
        <path id="Vector" d="M10 19H5V14M14 5H19V10"/>
        </g>
        </svg>
    
        
    
    </label>
    </div>
    )
}

export default Expand