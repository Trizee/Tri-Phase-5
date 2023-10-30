import Editor from '@monaco-editor/react'
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"
import { useRef } from 'react'

function EditorModuleHTML({value,set,active}){

    const editorRef = useRef(null)

    function handleEditorDidMount(editor){

        editorRef.current = editor
    
        const doc = new Y.Doc()
        
        const provider = new WebrtcProvider('html',doc)
        const type = doc.getText('html')
        
        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness)
        
      }

    return (
      <Editor 
      height={active === 'html'?'95vh':'0'}
      value={value}
      theme="vs-dark"
      language='html'
      onMount={handleEditorDidMount}
      onChange={set}
      />
    )
}

export default EditorModuleHTML