// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import PatientList from './components/PatientList.jsx';
import AddPatient from './components/AddPatient.jsx';
import ReportForm from './components/ReportForm.jsx';
import MedicineAssignment from './components/MedicineAssignment.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/add-report" element={<ReportForm />} />
            <Route path="/assign-medicine" element={<MedicineAssignment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

