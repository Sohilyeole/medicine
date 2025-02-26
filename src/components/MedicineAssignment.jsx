// // src/components/MedicineAssignment.jsx
// import { useState } from 'react';

// function MedicineAssignment() {
//   // Overall assignment state, including patientId and a list of medicines.
//   const [assignment, setAssignment] = useState({
//     patientId: '',
//     medicines: [] // Each item: { medicine: string, quantity: string }
//   });

//   // Local state for new medicine entry before adding to the list.
//   const [newMedicine, setNewMedicine] = useState({
//     medicine: '',
//     quantity: '',
//   });

//   // Handle changes for the patient ID.
//   const handleChange = (e) => {
//     setAssignment({ ...assignment, [e.target.name]: e.target.value });
//   };

//   // Handle changes for the new medicine entry fields.
//   const handleNewMedicineChange = (e) => {
//     setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
//   };

//   // Add the new medicine entry to the list.
//   const addMedicine = () => {
//     if (newMedicine.medicine.trim() !== '' && newMedicine.quantity.trim() !== '') {
//       setAssignment({
//         ...assignment,
//         medicines: [...assignment.medicines, newMedicine],
//       });
//       // Reset new medicine fields.
//       setNewMedicine({ medicine: '', quantity: '' });
//     } else {
//       alert("Please enter both the medicine name and quantity.");
//     }
//   };

//   // Remove a medicine from the list by index.
//   const removeMedicine = (index) => {
//     const updatedMedicines = assignment.medicines.filter((_, i) => i !== index);
//     setAssignment({ ...assignment, medicines: updatedMedicines });
//   };

//   // Handle form submission.
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Medicine Assignment:', assignment);
//     // Here you might send the data to a back-end server.
//     alert('Medicine assigned successfully!');
//     // Reset the form.
//     setAssignment({ patientId: '', medicines: [] });
//     setNewMedicine({ medicine: '', quantity: '' });
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Assign Medicine</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Patient ID */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Patient ID</label>
//           <input
//             type="text"
//             name="patientId"
//             value={assignment.patientId}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             placeholder="Enter Patient ID"
//             required
//           />
//         </div>

//         {/* Medicine List Section */}
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold mb-2">Medicines</h3>
//           {/* Display list of added medicines */}
//           {assignment.medicines.length > 0 && (
//             <ul className="mb-4">
//               {assignment.medicines.map((med, index) => (
//                 <li
//                   key={index}
//                   className="flex justify-between items-center border p-2 mb-2"
//                 >
//                   <span>
//                     {med.medicine} - {med.quantity}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => removeMedicine(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* Inputs for adding a new medicine */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Medicine Name</label>
//             <input
//               type="text"
//               name="medicine"
//               value={newMedicine.medicine}
//               onChange={handleNewMedicineChange}
//               className="w-full border rounded p-2"
//               placeholder="Enter Medicine Name"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Quantity</label>
//             <input
//               type="text"
//               name="quantity"
//               value={newMedicine.quantity}
//               onChange={handleNewMedicineChange}
//               className="w-full border rounded p-2"
//               placeholder="Enter Quantity (e.g., 2 pills)"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={addMedicine}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
//           >
//             Add Medicine
//           </button>
//         </div>

//         {/* Submit Assignment */}
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
//         >
//           Assign Medicine
//         </button>
//       </form>
//     </div>
//   );
// }

// export default MedicineAssignment;


import { useState } from "react";
import axios from "axios";

function MedicineAssignment() {
  const [assignment, setAssignment] = useState({
    patientId: "",
    medicines: [],
  });

  const [newMedicine, setNewMedicine] = useState({
    medicine: "",
    quantity: "",
    duration: "",
  });

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleNewMedicineChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };

  const addMedicine = () => {
    if (
      newMedicine.medicine.trim() !== "" &&
      newMedicine.quantity.trim() !== "" &&
      newMedicine.duration.trim() !== ""
    ) {
      setAssignment({
        ...assignment,
        medicines: [...assignment.medicines, newMedicine],
      });
      setNewMedicine({ medicine: "", quantity: "", duration: "" });
    } else {
      alert("Please fill all medicine details.");
    }
  };

  const removeMedicine = (index) => {
    const updatedMedicines = assignment.medicines.filter((_, i) => i !== index);
    setAssignment({ ...assignment, medicines: updatedMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { patientId, medicines } = assignment;

      // Send each medicine as a separate request (to match backend schema)
      for (const med of medicines) {
        await axios.post("http://localhost:5000/api/medicines", {
          patientId,
          medicineName: med.medicine,
          dosage: med.quantity,
          duration: med.duration,
        });
      }

      alert("Medicine assigned successfully!");
      setAssignment({ patientId: "", medicines: [] });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to assign medicine.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Assign Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Patient ID</label>
          <input
            type="text"
            name="patientId"
            value={assignment.patientId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter Patient ID"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Medicines</h3>
          {assignment.medicines.length > 0 && (
            <ul className="mb-4">
              {assignment.medicines.map((med, index) => (
                <li key={index} className="flex justify-between items-center border p-2 mb-2">
                  <span>{med.medicine} - {med.quantity} - {med.duration}</span>
                  <button type="button" onClick={() => removeMedicine(index)} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Medicine Name</label>
            <input
              type="text"
              name="medicine"
              value={newMedicine.medicine}
              onChange={handleNewMedicineChange}
              className="w-full border rounded p-2"
              placeholder="Enter Medicine Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="text"
              name="quantity"
              value={newMedicine.quantity}
              onChange={handleNewMedicineChange}
              className="w-full border rounded p-2"
              placeholder="Enter Quantity (e.g., 2 pills)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={newMedicine.duration}
              onChange={handleNewMedicineChange}
              className="w-full border rounded p-2"
              placeholder="Enter Duration (e.g., 3 days)"
            />
          </div>
          <button type="button" onClick={addMedicine} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4">
            Add Medicine
          </button>
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Assign Medicine
        </button>
      </form>
    </div>
  );
}

export default MedicineAssignment;
