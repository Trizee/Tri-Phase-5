import Editor from '@monaco-editor/react'
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"
import { useRef } from 'react'

function EditorModule({value,set,room,lang}){

    const editorRef = useRef(null)

    function handleEditorDidMount(editor){

        editorRef.current = editor
    
        const doc = new Y.Doc()
        
        const provider = new WebrtcProvider(`${room}`,doc)
        const type = doc.getText(`${room}`)
        
        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness)
        
      }

    return (
      <Editor 
      value={value}
      theme="vs-dark"
      language={lang}
      onMount={handleEditorDidMount}
      onChange={set}
      />
    )
}

export default EditorModule