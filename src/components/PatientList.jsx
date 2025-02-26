// // src/components/PatientList.jsx
// import { useState } from 'react';

// function PatientList() {
//   // Sample patient data
//   const [patients] = useState([
//     { id: 1, name: 'John Doe', age: 30, condition: 'Flu' },
//     { id: 2, name: 'Jane Smith', age: 25, condition: 'Cold' },
//     { id: 3, name: 'Alice Johnson', age: 45, condition: 'Diabetes' },
//   ]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Patient List</h2>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">ID</th>
//             <th className="py-2 px-4 border-b">Name</th>
//             <th className="py-2 px-4 border-b">Age</th>
//             <th className="py-2 px-4 border-b">Condition</th>
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((patient) => (
//             <tr key={patient.id}>
//               <td className="py-2 px-4 border-b text-center">{patient.id}</td>
//               <td className="py-2 px-4 border-b">{patient.name}</td>
//               <td className="py-2 px-4 border-b text-center">{patient.age}</td>
//               <td className="py-2 px-4 border-b">{patient.condition}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PatientList;

import { useState, useEffect } from 'react';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients'); // Replace with actual API endpoint
        if (!response.ok) throw new Error('Failed to fetch patients');
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Patient List</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{patient.id}</td>
                <td className="py-2 px-4 border-b">{patient.name}</td>
                <td className="py-2 px-4 border-b text-center">{patient.age}</td>
                <td className="py-2 px-4 border-b">{patient.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientList;
