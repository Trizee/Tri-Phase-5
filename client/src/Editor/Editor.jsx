import { useState, useEffect } from "react";
import EditorModuleHTML from "./EditModuleHTML";
import EditorModuleCSS from "./EditModuleCSS";
import EditorModuleJS from "./EditModuleJS";

function EditorComponent(){

  const [html,setHtml] = useState('')
  const [css,setCss] = useState('')
  const [js,setJs] = useState('')
  const [srcDoc,setSrcDoc] = useState('')
  
  // Making useStates for switcher function
  const [active,setActive] = useState('html')
  
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


  // tab tab-bordered tab-active tab tab-bordered

  return (
    <>
    <div class="grid grid-cols-2">
    <div>
    <ul class="menu xl:menu-horizontal lg:min-w-max bg-base-300 w-full flex justify-center">
        <a className={active === 'html'?'tab tab-bordered tab-active':'tab tab-bordered'} onClick={()=>setActive('html')}>HTML</a> 
        <a className={active === 'css'?'tab tab-bordered tab-active':'tab tab-bordered'} onClick={()=>setActive('css')}>CSS</a> 
        <a className={active === 'js'?'tab tab-bordered tab-active':'tab tab-bordered'} onClick={()=>setActive('js')}>JAVASCRIPT</a>
    </ul>
    <EditorModuleHTML value={html} set={setHtml} active={active}/>
    <EditorModuleCSS value={css} set={setCss} active={active}/>
    <EditorModuleJS  value={js} set={setJs} active={active}/>
    </div>
    <div className="mockup-browser bg-base-300 rounded-none">
    <div class="mockup-browser-toolbar">
    <div class="inpu">YourWebsite.com</div>
    </div>
    <iframe 
    srcDoc = {srcDoc}
    title="output"
    sandbox="allow-scripts"
    height= '100%'
    width= '100%'
    /> 
    
    </div>
    </div>
  </>
  )
}

export default EditorComponent
