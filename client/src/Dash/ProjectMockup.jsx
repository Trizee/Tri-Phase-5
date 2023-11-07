

function ProjectMockup({project}){


    const preview = project.version[project.version.length-1]

    const srcDoc = 
    `
    <html>
    <body>${preview.html}</body>
    <style>${preview.css}</style>
    </html>
    `

    return(
        <>

        <div className="mockup-browser border border-base-300 rounded-none h-96">
            <div className="mockup-browser-toolbar">
                <div className="input border border-base-300 text-center">{project.title}</div>
                <div className="modal-action p-0 m-0">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="hidden md:block text-xl text-gray-300 hover:text-white">x</button>
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

        </>
    )
}

export default ProjectMockup