import { useState, useEffect } from "react";
import EditorModuleHTML from "./EditModuleHTML";
import EditorModuleCSS from "./EditModuleCSS";
import EditorModuleJS from "./EditModuleJS";
import Expand from "./Expand";

function EditorComponent(){

  const [html,setHtml] = useState('')
  const [css,setCss] = useState('')
  const [js,setJs] = useState('')
  const [srcDoc,setSrcDoc] = useState('')
  
  // Making useStates for switcher function
  const [active,setActive] = useState('html')
  // Use state for window expansion
  const [windowExpand,setWindowExpand] = useState(false)
  const [editorExpand,setEditorExpand] = useState(false)

  console.log(editorExpand)
  
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

  function editorCss(){
    if(editorExpand === false && windowExpand === false){
      return 'col-span-2'
    }
    else if(editorExpand === true){
      return 'col-span-4'
    }
    else if(windowExpand == true){
      return 'hidden'
    }
  }


  function windowCss(){
    if(editorExpand === false && windowExpand === false){
      return "mockup-browser bg-base-300 rounded-none col-span-2"
    }
    else if(windowExpand === true){
      return "mockup-browser bg-base-300 rounded-none col-span-4 h-screen"
    }
    else if(editorExpand == true){
      return 'hidden'
    }
  }
  

  // tab tab-bordered tab-active tab tab-bordered
  // w-9 h-8 pt-2 stroke-white stroke-1

  return (
    <>
    
    <div class="grid grid-cols-4 transition-transform">
    <div className={editorCss()}>
    <ul class="menu xl:menu-horizontal lg:min-w-max bg-base-300 w-full flex justify-center p-2 pb-4">
        <label htmlFor="my-drawer" className="drawer-button">
        <svg className="w-9 h-8 pt-2 fill-gray-500 stroke-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
        <g>
          <path d="M70,33.5H32c-1.104,0-2,0.896-2,2s0.896,2,2,2h38c1.104,0,2-0.896,2-2S71.104,33.5,70,33.5z"/>
          <path d="M70,48.5H32c-1.104,0-2,0.896-2,2s0.896,2,2,2h38c1.104,0,2-0.896,2-2S71.104,48.5,70,48.5z"/>
          <path d="M70,63.5H32c-1.104,0-2,0.896-2,2s0.896,2,2,2h38c1.104,0,2-0.896,2-2S71.104,63.5,70,63.5z"/>
          <path d="M87.5,26.5c0-5.523-4.478-10-10-10h-55c-5.523,0-10,4.477-10,10v47c0,5.522,4.477,10,10,10h55c5.522,0,10-4.478,10-10V26.5
            z M83.5,73.5c0,3.313-2.687,6-6,6h-55c-3.313,0-6-2.687-6-6v-47c0-3.313,2.687-6,6-6h55c3.313,0,6,2.687,6,6V73.5z"/>
        </g>
        </svg>
        </label>
        <a className={active === 'html'?'tab tab-bordered tab-active mr-4 ml-4':'tab tab-bordered mr-4 ml-4'} onClick={()=>setActive('html')}>HTML</a> 
        <a className={active === 'css'?'tab tab-bordered tab-active mr-4 ml-4':'tab tab-bordered mr-4 ml-4'} onClick={()=>setActive('css')}>CSS</a> 
        <a className={active === 'js'?'tab tab-bordered tab-active mr-4 ml-4':'tab tab-bordered mr-4 ml-4'} onClick={()=>setActive('js')}>JAVASCRIPT</a>
        <Expand set={setEditorExpand}/>
    </ul>
    <EditorModuleHTML value={html} set={setHtml} active={active}/>
    <EditorModuleCSS value={css} set={setCss} active={active}/>
    <EditorModuleJS  value={js} set={setJs} active={active}/>
    </div>
    <div className={windowCss()}>
    <div class="mockup-browser-toolbar" >
    <div class="input">YourWebsite.com</div>
    <Expand set={setWindowExpand}/>
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
