import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function CourseDetailsPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch(`https://backend-react-hook.onrender.com/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
      .then(res => res.json())
      .then(() => {
        setIsEditing(false)
        alert('Course updated successfully!')
      })
  }

  if (!course) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading course details...
      </p>
    )
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? (
          <input
            name="name"
            value={course.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        ) : (
          course.name
        )}
      </h1>

      <p className="mb-3">
        <strong className="text-gray-700">Instructor:</strong>{' '}
        {isEditing ? (
          <input
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        ) : (
          course.instructor
        )}
      </p>

      <p className="mb-3">
        <strong className="text-gray-700">Status:</strong>{' '}
        {isEditing ? (
          <input
            name="enrollment_status"
            value={course.enrollment_status}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        ) : (
          course.enrollment_status
        )}
      </p>

      <p className="mb-3">
        <strong className="text-gray-700">Description:</strong>{' '}
        {isEditing ? (
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
            rows={4}
          />
        ) : (
          course.description
        )}
      </p>

      {/* Duration */}
      {/* Duration Editing Section */}
<p className="mb-6">
  <strong className="text-gray-700">Duration:</strong>{' '}
  {isEditing ? (
    <div className="flex gap-2 mt-1">
      <input
        type="text"
        name="start_date" 
        value={course.start_date}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-1/2"
        placeholder="Start Date"
      />
      <input
        type="text"
        name="end_date"
        value={course.end_date}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-1/2"
        placeholder="End Date"
      />
    </div>
  ) : (
    `${course.start_date} - ${course.end_date}`
  )}
</p>

      <div className="flex gap-4">
        <Link to="/">
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            Back
          </button>
        </Link>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default CourseDetailsPage
