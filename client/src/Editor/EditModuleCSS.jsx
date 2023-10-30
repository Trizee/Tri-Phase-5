import Editor from '@monaco-editor/react'
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"
import { useRef } from 'react'

function EditorModuleCSS({value,set,active}){

    const editorRef = useRef(null)

    function handleEditorDidMount(editor){

        editorRef.current = editor
    
        const doc = new Y.Doc()
        
        const provider = new WebrtcProvider('css',doc)
        const type = doc.getText('css')
        
        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness)
        
      }

    return (
      <Editor 
      height={active === 'css'?'95vh':'0'}
      value={value}
      theme="vs-dark"
      language='css'
      onMount={handleEditorDidMount}
      onChange={set}
      />
    )
}

export default EditorModuleCSS