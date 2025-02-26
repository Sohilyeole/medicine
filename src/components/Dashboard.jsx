// // src/components/Dashboard.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
//         <div className="container mx-auto text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Doctor System Dashboard
//           </h1>
//           <p className="text-lg md:text-xl">
//             Manage patients, reports, and medicines efficiently.
//           </p>
//         </div>
//       </section>

//       {/* Statistics Cards */}
//       <section className="container mx-auto py-8 px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//             <h2 className="text-2xl font-semibold mb-2">Total Patients</h2>
//             <p className="text-3xl font-bold text-blue-600">150</p>
//           </div>
//           <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//             <h2 className="text-2xl font-semibold mb-2">Reports Added</h2>
//             <p className="text-3xl font-bold text-green-600">45</p>
//           </div>
//           <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//             <h2 className="text-2xl font-semibold mb-2">Medicine Assignments</h2>
//             <p className="text-3xl font-bold text-purple-600">30</p>
//           </div>
//         </div>
//       </section>

//       {/* Quick Actions */}
//       <section className="container mx-auto py-8 px-4">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
//           <div className="flex flex-col md:flex-row gap-4">
//             <button
//               onClick={() => navigate('/add-patient')}
//               className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
//             >
//               Add New Patient
//             </button>
//             <button
//               onClick={() => navigate('/add-report')}
//               className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
//             >
//               Add Report
//             </button>
//             <button
//               onClick={() => navigate('/assign-medicine')}
//               className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300"
//             >
//               Assign Medicine
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }




// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [patientsCount, setPatientsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [medicinesCount, setMedicinesCount] = useState(0);

  useEffect(() => {
    // Fetch total patients
    axios.get('http://localhost:5000/api/patients')
      .then(res => setPatientsCount(res.data.length))
      .catch(err => console.error('Error fetching patients:', err));

    // Fetch total reports
    axios.get('http://localhost:5000/api/reports')
      .then(res => setReportsCount(res.data.length))
      .catch(err => console.error('Error fetching reports:', err));

    // Fetch total medicine assignments
    axios.get('http://localhost:5000/api/medicines')
      .then(res => setMedicinesCount(res.data.length))
      .catch(err => console.error('Error fetching medicines:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Doctor System Dashboard
          </h1>
          <p className="text-lg md:text-xl">
            Manage patients, reports, and medicines efficiently.
          </p>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Total Patients</h2>
            <p className="text-3xl font-bold text-blue-600">{patientsCount}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Reports Added</h2>
            <p className="text-3xl font-bold text-green-600">{reportsCount}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Medicine Assignments</h2>
            <p className="text-3xl font-bold text-purple-600">{medicinesCount}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate('/add-patient')}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Add New Patient
            </button>
            <button
              onClick={() => navigate('/add-report')}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
            >
              Add Report
            </button>
            <button
              onClick={() => navigate('/assign-medicine')}
              className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300"
            >
              Assign Medicine
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
