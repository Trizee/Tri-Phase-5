import { useNavigate } from "react-router-dom"

function FullScreenPreview({preview}){

    const navigate = useNavigate()
    
    const srcDoc = `<html>
    <body><h1>Nothing Yet</h1></body>
    <style>body{text-align:center; font-size:12px;}</style>
    </html>`
    
    return(
        <div className="mockup-browser rounded-none h-screen w-auto">
            <div className="mockup-browser-toolbar">
                <div className="input border border-base-300 text-center">{preview.title}</div>
                <div className="modal-action p-0 m-0 w-32 md:w-auto">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button onClick={()=>navigate(-1)} className="block text-xl text-gray-300 hover:text-white">x</button>
                    </form>
                </div>
                </div>
            <div className="flex justify-center m-0 p-0 h-full border-t border-base-300">
            <iframe 
            srcDoc = {srcDoc}
            title="output"
            sandbox="allow-scripts allow-forms"
            height= '100%'
            width= '100%'
            /> 
            </div>
        </div>
    )
}

export default FullScreenPreview