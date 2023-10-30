

function Expand({set}){

    return(
    <div>
    <label className="swap swap-rotate float-right">
  
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />
        
        {/* Shrink Icon */}
        <svg onClick={()=>{set(true)}} className="swap-on fill-current w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Arrow / Shrink">
        <path id="Vector" d="M5 14H10V19M19 10H14V5"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        </svg>


        {/*  Expand Icon/ */}
        <svg onClick={()=>{set(false)}} className="swap-off fill-current w-8 h-8" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <g id="Arrow / Expand">
        <path id="Vector" d="M10 19H5V14M14 5H19V10"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        </svg>
    
        
    
    </label>
    </div>
    )
}

export default Expand