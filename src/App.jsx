import { v4 as uuidV4 } from "uuid"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import TextEditor from "./pages/TextEditor"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/documents/:id" element={<TextEditor />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
