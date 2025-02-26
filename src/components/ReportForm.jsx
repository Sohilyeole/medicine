// src/components/ReportForm.jsx
import { useState } from 'react';

function ReportForm() {
  const [report, setReport] = useState({
    patientId: '',
    reportDetails: '',
  });

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Report:', report);
    // In a real app, save the report details
    alert('Report added successfully!');
    setReport({ patientId: '', reportDetails: '' });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Patient Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Patient ID</label>
          <input
            type="text"
            name="patientId"
            value={report.patientId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter Patient ID"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Report Details</label>
          <textarea
            name="reportDetails"
            value={report.reportDetails}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter report details"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Report
        </button>
      </form>
    </div>
  );
}

export default ReportForm;
