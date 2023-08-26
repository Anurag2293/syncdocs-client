import { v4 as uuidV4 } from "uuid"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'

import UserState from "./context/user/UserState"
import TextEditor from "./pages/TextEditor"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"

function App() {

	return (
		<UserState>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/documents/:id" element={<TextEditor />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</UserState>
	)
}

export default App
