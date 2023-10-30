import EditorComponent from "./Editor"


function Drawer(){
    return(
        <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <EditorComponent />
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
            
            </ul>
        </div>
        </div>
    )
}

export default Drawer