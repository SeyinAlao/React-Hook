import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function CourseDetailsPage() {
  const { id } = useParams()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch(`https://backend-react-hook.onrender.com/courses/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not find that course')
        }
        return res.json()
      })
      .then(data => {
        setCourse(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    fetch(`https://backend-react-hook.onrender.com/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update')
        return res.json()
      })
      .then(() => {
        setIsEditing(false)
        alert('Course updated successfully!')
      })
      .catch(err => {
        alert('Error saving: ' + err.message)
      })
  }

  if (loading) return <div className="text-center mt-10">Loading course details...</div>

  if (error) return (
    <div className="text-center mt-10 text-red-600">
      <p>Error: {error}</p>
      <Link to="/" className="text-blue-500 underline">Back to Dashboard</Link>
    </div>
  )

  if (!course) return null

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? (
            <input
              name="name"
              value={course.name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ) : (
            course.name
          )}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Instructor</label>
            {isEditing ? (
              <input
                name="instructor"
                value={course.instructor}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            ) : (
              <p className="text-lg">{course.instructor}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Enrollment Status</label>
            {isEditing ? (
              <select
                name="enrollment_status"
                value={course.enrollment_status}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 bg-white"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="inprogress">In Progress</option>
              </select>
            ) : (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1
                ${course.enrollment_status === 'open' ? 'bg-green-100 text-green-800' : 
                  course.enrollment_status === 'closed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                {course.enrollment_status}
              </span>
            )}
          </div>
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-500">Duration</label>
           {isEditing ? (
             <div className="flex gap-2 mt-1">
               <input
                 type="date" 
                 name="start_date"
                 value={course.start_date}
                 onChange={handleChange}
                 className="w-1/2 border p-2 rounded"
               />
               <input
                 type="date"
                 name="end_date"
                 value={course.end_date}
                 onChange={handleChange}
                 className="w-1/2 border p-2 rounded"
               />
             </div>
           ) : (
             <p className="text-lg mt-1">{course.start_date} — {course.end_date}</p>
           )}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
        {isEditing ? (
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-32"
          />
        ) : (
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <Link to="/">
          <button className="text-gray-600 hover:text-gray-900 font-medium">
            ← Back to Dashboard
          </button>
        </Link>

        {isEditing ? (
          <div className="flex gap-3">
             <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
               Cancel
             </button>
             <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md">
               Save Changes
             </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
            Edit Course
          </button>
        )}
      </div>
    </div>
  )
}

export default CourseDetailsPage