
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Markets from "./Routes/Markets";

function App() {


	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/markets" element={<Markets />} />
				<Route path="/" element={<Navigate to="/markets/" />} />
				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
