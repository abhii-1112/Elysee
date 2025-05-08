// 'use client'
// import { useState } from 'react'

// export default function Register() {
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     email: '', 
//     password: '' 
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [success, setSuccess] = useState(false)

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
    
//     try {
//       const response = await fetch('http://localhost:5000/api/user/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       })

//       const data = await response.json()
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed')
//       }
      
//       setSuccess(true)
//     } catch (error) {
//       alert(error.message)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (success) {
//     return (
//       <div style={{
//         maxWidth: '400px',
//         margin: '20px auto',
//         padding: '20px',
//         background: '#ffffff',
//         border: '2px solid #000000',
//         borderRadius: '8px',
//         textAlign: 'center'
//       }}>
//         <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#000000' }}>
//           Registration Successful!
//         </h2>
//         <p style={{ marginBottom: '20px', color: '#333333' }}>
//           Your account has been created.
//         </p>
//         <button
//           onClick={() => setSuccess(false)}
//           style={{
//             padding: '8px 16px',
//             background: '#0066cc',
//             color: '#ffffff',
//             border: 'none',
//             borderRadius: '4px'
//           }}
//         >
//           Back to Form
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div style={{
//       maxWidth: '400px',
//       margin: '20px auto',
//       padding: '20px',
//       background: '#ffffff',
//       border: '2px solid #000000',
//       borderRadius: '8px'
//     }}>
//       <h2 style={{
//         fontSize: '20px',
//         fontWeight: 'bold',
//         marginBottom: '20px',
//         textAlign: 'center',
//         color: '#000000'
//       }}>
//         Create Account
//       </h2>
      
//       <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
//         <div>
//           <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Name</label>
//           <input
//             name="name"
//             type="text"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #000000',
//               borderRadius: '4px'
//             }}
//           />
//         </div>
        
//         <div>
//           <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Email</label>
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #000000',
//               borderRadius: '4px'
//             }}
//           />
//         </div>
        
//         <div>
//           <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Password</label>
//           <input
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             minLength="6"
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #000000',
//               borderRadius: '4px'
//             }}
//           />
//         </div>
        
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           style={{
//             width: '100%',
//             padding: '10px',
//             background: isSubmitting ? '#666666' : '#0066cc',
//             color: '#ffffff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           {isSubmitting ? 'Creating Account...' : 'Register'}
//         </button>
//       </form>
      
//       <div style={{ marginTop: '15px', textAlign: 'center' }}>
//         <p style={{ color: '#000000' }}>
//           Already have an account?{' '}
//           <a href="/login" style={{ color: '#0066cc' }}>Sign in</a>
//         </p>
//       </div>
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }
      
      setSuccess(true)
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Registration Successful!</h2>
        <p className="mb-6 text-gray-700">Your account has been created successfully.</p>
        <button
          onClick={() => setSuccess(false)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
        >
          Back to Form
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
