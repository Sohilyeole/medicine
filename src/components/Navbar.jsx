// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center ">
        {/* Brand */}
        <div className="text-white font-bold text-2xl">
          Doctor System
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-24 mx-32">
          <Link to="/" className="text-white hover:text-gray-200 transition duration-200">
            Dashboard
          </Link>
          <Link to="/patients" className="text-white hover:text-gray-200 transition duration-200">
            Patients
          </Link>
          <Link to="/add-patient" className="text-white hover:text-gray-200 transition duration-200">
            Add Patient
          </Link>
          <Link to="/add-report" className="text-white hover:text-gray-200 transition duration-200">
            Add Report
          </Link>
          <Link to="/assign-medicine" className="text-white hover:text-gray-200 transition duration-200">
            Assign Medicine
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              // Close icon
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger menu icon
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              onClick={toggleMenu}
              to="/"
              className="block text-white hover:text-gray-200 transition duration-200"
            >
              Dashboard
            </Link>
            <Link
              onClick={toggleMenu}
              to="/patients"
              className="block text-white hover:text-gray-200 transition duration-200"
            >
              Patients
            </Link>
            <Link
              onClick={toggleMenu}
              to="/add-patient"
              className="block text-white hover:text-gray-200 transition duration-200"
            >
              Add Patient
            </Link>
            <Link
              onClick={toggleMenu}
              to="/add-report"
              className="block text-white hover:text-gray-200 transition duration-200"
            >
              Add Report
            </Link>
            <Link
              onClick={toggleMenu}
              to="/assign-medicine"
              className="block text-white hover:text-gray-200 transition duration-200"
            >
              Assign Medicine
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
