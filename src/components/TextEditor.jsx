import { useState, useCallback, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { io } from 'socket.io-client'


const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean']
]

const TextEditor = () => {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const socket = io('http://localhost:3001', {
            transports: ['websocket', 'polling', 'flashsocket']
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    // As soon as the component is mounted, we want to create a new instance of Quill by calling this callBack function
    const wrapperRef = useCallback((wrapper) => { 
        if (wrapper == null) return

        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        new Quill(editor, { theme: 'snow', modules: {
            toolbar: TOOLBAR_OPTIONS
        } })
    }, [])

    return (
        <div className="container" ref={wrapperRef}>TextEditor</div>
    )
}

export default TextEditor