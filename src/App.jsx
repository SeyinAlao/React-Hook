import { Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import CourseDetails from "./Pages/CourseDetails"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
    </Routes>
  )
}

export default App
