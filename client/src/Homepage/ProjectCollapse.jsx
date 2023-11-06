

function Collapse({set}){
    return(
        <label className="btn btn-circle swap swap-rotate mr-0 md:mr-4"  >
  
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />

        <svg onClick={set(true)} className="swap-off fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
        {/* hamburger icon */}
        <svg onClick={set(false)} className="swap-on fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
        
        {/* close icon */}
        
        
        </label>
    )
}

export default Collapse