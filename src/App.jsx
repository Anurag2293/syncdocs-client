import TextEditor from "./components/TextEditor"
import Home from "./components/Home"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/documents/:id" element={<TextEditor />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
