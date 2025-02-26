// // src/components/AddPatient.jsx
// import { useState } from 'react';

// function AddPatient() {
//   const [patient, setPatient] = useState({
//     name: '',
//     age: '',
//     condition: '',
//   });

//   const handleChange = (e) => {
//     setPatient({ ...patient, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('New Patient:', patient);
//     // In a real app, you might send this data to a server or update global state
//     alert('Patient added successfully!');
//     setPatient({ name: '', age: '', condition: '' });
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={patient.name}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             placeholder="Patient Name"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Age</label>
//           <input
//             type="number"
//             name="age"
//             value={patient.age}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             placeholder="Patient Age"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Condition</label>
//           <input
//             type="text"
//             name="condition"
//             value={patient.condition}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             placeholder="Medical Condition"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Add Patient
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddPatient;
// import { useState } from 'react';

// function AddPatient() {
//   const [patient, setPatient] = useState({
//     name: '',
//     age: '',
//     condition: '',
//     id: ''
//   });

//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [success, setSuccess] = useState(null); // Success state

//   function generateRandomId() {
//     return Math.floor(1000 + Math.random() * 9000);
//   }




//   const handleChange = (e) => {
//     setPatient({ ...patient, [e.target.name]: e.target.value });
    
    
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch('http://localhost:5000/api/patients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(patient),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to add patient');
//       }

//       setSuccess('Patient added successfully!');
//       setPatient({ name: '', age: '', condition: '' });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>

//       {error && <p className="text-red-600">{error}</p>}
//       {success && <p className="text-green-600">{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={patient.name}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             placeholder="Patient Name"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Age</label>
//           <input
//             type="number"
//             name="age"
//             value={patient.age}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             placeholder="Patient Age"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Condition</label>
//           <input
//             type="text"
//             name="condition"
//             value={patient.condition}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             placeholder="Medical Condition"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
//           disabled={loading}
//         >
//           {loading ? 'Adding...' : 'Add Patient'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddPatient;


import { useState } from 'react';

function AddPatient() {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    condition: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success state

  function generateRandomId() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random ID
  }

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Assign a random 4-digit ID to the patient
    const newPatient = {
      ...patient,
      id: generateRandomId(), // Assigning random ID
    };

    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add patient');
      }

      setSuccess(`Patient added successfully! (ID: ${newPatient.id})`);
      setPatient({ name: '', age: '', condition: '' });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Patient Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={patient.age}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Patient Age"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Condition</label>
          <input
            type="text"
            name="condition"
            value={patient.condition}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Medical Condition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
