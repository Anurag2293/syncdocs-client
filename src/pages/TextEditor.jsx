import { useState, useCallback, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { io } from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom'

const SAVE_INTERVAL_MS = 2000
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
    const navigate = useNavigate()
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
        const s = io('http://localhost:3001', {
            transports: ['websocket', 'polling', 'flashsocket'],
            query: {
                documentId: documentId,
                username: 'Rishabh'
            },
            auth: {
                token: '123'
            }
        })
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    // For fetching initial document
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.on("connect_error", (err) => {
            alert(err.message)
            navigate('/dashboard')
        })

        socket.once('load-document', document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document', documentId)
    }, [socket, quill, documentId])

    // For writing to the document
    useEffect(() => {
        if (quill == null || socket == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler);
        }
    }, [socket, quill])

    // For receiving changes from other users and updating the document
    useEffect(() => {
        if (quill == null || socket == null) return

        const handler = (delta) => {
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-changes', handler);
        }
    }, [socket, quill])

    // For saving the document every two seconds
    useEffect(() => {
        if (quill == null || socket == null) return

        const interval = setInterval(() => {
            socket.emit('save-changes', quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])

    // As soon as the component is mounted, we want to create a new instance of Quill by calling this callBack function
    const wrapperRef = useCallback((wrapper) => { 
        if (wrapper == null) return

        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: 'snow', 
            modules: {
                toolbar: TOOLBAR_OPTIONS
            },
        })

        q.disable()
        q.setText('Loading...')

        setQuill(q)
    }, [])

    return (
        <div className="container bg-editor-white m-0" ref={wrapperRef}></div>
    )
}

export default TextEditor