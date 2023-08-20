import { v4 as uuidV4 } from "uuid"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import TextEditor from "./components/TextEditor"

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} replace={true} />} />
				<Route path="/documents/:id" element={<TextEditor />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
