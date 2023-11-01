

function EditBtn({set}){
    return(
    <svg onClick={()=>{set(true)}} className="h-4 w-4 m-1 ml-auto stroke-gray-300 stroke-2 cursor-pointer hover:stroke-gray-200" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <defs>

    </defs>
            <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="#000000">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]">

    </path>
                </g>
            </g>
    </svg>
    )
}

export default EditBtn