import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function LandingPage() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch("https://backend-react-hook.onrender.com/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-red-600">Course Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">
              {course.name}
            </h2>

            <p className="text-gray-600 mb-1">
              Instructor: {course.instructor}
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${
                  course.enrollment_status === "open"
                    ? "bg-green-100 text-green-700"
                    : course.enrollment_status === "closed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }
              `}
            >
              {course.enrollment_status}
            </span>

            <Link to={`/courses/${course.id}`}>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPage
