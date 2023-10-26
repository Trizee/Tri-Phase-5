import { useState, useEffect } from "react";
import EditorModule from "./EditModule";

function EditorComponent(){

  const [html,setHtml] = useState('')
  const [css,setCss] = useState('')
  const [js,setJs] = useState('')
  const [srcDoc,setSrcDoc] = useState('')

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    },500)

    return () => clearTimeout(timeout)

  },[html,css,js])

  return (
    <>
    <EditorModule 
    value={html}
    set={setHtml}
    lang={'html'}
    room={'html'}
    />
    <EditorModule 
    value={css}
    set={setCss}
    lang={'css'}
    room={'css'}
    />
    <EditorModule 
    value={js}
    set={setJs}
    lang={'javascript'}
    room={'javascript'}
    />
    <div>
      <iframe 
      srcDoc = {srcDoc}
      title="output"
      sandbox="allow-scripts"
      width= '100%'
      />
    </div>
  </>
  )
}

export default EditorComponent
