import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function LandingPage() {
  const [courses, setCourses] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://backend-react-hook.onrender.com/courses")
      .then(res => {
        if (!res.ok) {
          throw new Error("Could not fetch the courses")
        }
        return res.json()
      })
      .then(data => {
        setCourses(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(err.message)
        setIsLoading(false)  
      })
  }, [])

  if (isLoading) return <div className="text-center p-10">Loading courses...</div>
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Course Dashboard</h1>

      {courses.length === 0 && !isLoading ? (
        <p>No courses available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600 mb-3">Instructor: {course.instructor}</p>
              
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${course.enrollment_status === "open" ? "bg-green-100 text-green-700" : 
                  course.enrollment_status === "closed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.enrollment_status}
              </span>

              <Link to={`/courses/${course.id}`}>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LandingPage