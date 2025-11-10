import React from 'react';
import { Hospital, Lock, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MedBetaLanding({ onLogin }) {
  const navigate = useNavigate();
  
  const handleLogin = (role) => {
    if (onLogin) onLogin(role);
    navigate('/dashboard');
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-400 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-light">
                +
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">MedBeta</span>
            </div>

            {/* Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-10">
              <li><a href="#home" className="text-gray-900 hover:text-teal-400 transition">Home</a></li>
              <li><a href="#features" className="text-gray-900 hover:text-teal-400 transition">Features</a></li>
              <li><a href="#hospitals" className="text-gray-900 hover:text-teal-400 transition">Hospitals</a></li>
              <li><a href="#contact" className="text-gray-900 hover:text-teal-400 transition">Contact</a></li>
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative group">
                <button className="text-gray-900 px-3 sm:px-5 py-2 hover:text-teal-400 transition text-sm sm:text-base">
                  Login
                </button>
                <div className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <button onClick={() => handleLogin('patient')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">Login as Patient</button>
                  <button onClick={() => handleLogin('doctor')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">Login as Doctor</button>
                  <button onClick={() => handleLogin('pharmacist')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">Login as Pharmacist</button>
                  <button onClick={() => handleLogin('superadmin')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">Login as Super Admin</button>
                </div>
              </div>
              <button className="bg-teal-400 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-teal-500 transition text-sm sm:text-base">
                Register
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8">
                Smart, Secure,<br />
                Real-time<br />
                Healthcare Records.
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0">
                MedBeta lets hospitals and doctors securely access patient medical history from any healthcare facility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start">
                <button className="bg-teal-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-teal-500 transition font-medium text-sm sm:text-base">
                  Get Started as Doctor
                </button>
                <button className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-md border-2 border-gray-300 hover:border-teal-400 hover:text-teal-400 transition font-medium text-sm sm:text-base">
                  View Demo
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative order-first lg:order-last">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] flex items-center justify-center">
                {/* Medical Illustration */}
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md transform scale-75 sm:scale-90 lg:scale-100">
                  {/* Medical Cross Icon */}
                  <div className="absolute top-0 left-0 w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-white text-2xl">
                    +
                  </div>

                  {/* Monitor/Screen */}
                  <div className="absolute top-20 left-16 w-56 h-40 bg-white rounded-xl border-4 border-teal-400 shadow-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-teal-200 rounded-full"></div>
                      </div>
                      <div className="flex-1 space-y-2 mt-2">
                        <div className="h-2 bg-teal-100 rounded w-20"></div>
                        <div className="h-2 bg-teal-100 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <svg className="w-full h-8" viewBox="0 0 200 30">
                        <path d="M 0 15 Q 20 5, 40 15 T 80 15 T 120 15 T 160 15 T 200 15" stroke="#45d4cb" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                      <div className="w-5 h-3 border-2 border-teal-400 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Medical Card */}
                  <div className="absolute top-72 left-32 w-24 h-16 bg-teal-200 rounded-lg shadow-md p-2">
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-white rounded w-10"></div>
                      <div className="h-1.5 bg-white rounded w-16"></div>
                    </div>
                  </div>

                  {/* Patient Sitting */}
                  <div className="absolute top-48 -left-8">
                    {/* Shadow */}
                    <div className="absolute bottom-0 w-24 h-4 bg-teal-400 opacity-30 rounded-full blur-sm"></div>
                    {/* Body */}
                    <div className="relative">
                      <div className="w-20 h-24 bg-teal-400 rounded-t-3xl"></div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-900 rounded-full"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-blue-900 rounded-b-full"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-12 bg-blue-800 rounded-b-lg"></div>
                      <div className="absolute -bottom-2 left-1 w-10 h-2 bg-blue-900 rounded-full"></div>
                    </div>
                  </div>

                  {/* Doctor Standing */}
                  <div className="absolute top-44 right-0">
                    {/* Shadow */}
                    <div className="absolute bottom-0 w-20 h-3 bg-blue-900 opacity-30 rounded-full blur-sm"></div>
                    {/* Body */}
                    <div className="relative">
                      <div className="w-16 h-32 bg-teal-400 rounded-t-2xl"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-28 bg-white rounded-t-2xl"></div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-300 rounded-full"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-6 bg-blue-900 rounded-b-full"></div>
                      <div className="absolute bottom-0 left-0 w-7 h-14 bg-blue-900 rounded-b-lg"></div>
                      <div className="absolute bottom-0 right-0 w-7 h-14 bg-blue-900 rounded-b-lg"></div>
                      <div className="absolute top-10 -left-2 w-3 h-16 bg-orange-300 rounded-full"></div>
                      <div className="absolute top-8 -right-4 w-12 h-16 bg-gray-700 rounded-lg"></div>
                      <div className="absolute -bottom-2 left-0 w-8 h-2 bg-blue-950 rounded-full"></div>
                      <div className="absolute -bottom-2 right-0 w-8 h-2 bg-blue-950 rounded-full"></div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-32 right-20 w-3 h-3 bg-teal-300 rounded-full"></div>
                  <div className="absolute top-64 right-8 w-2 h-2 bg-teal-300 rounded-full"></div>
                  <div className="absolute bottom-12 left-24 w-2 h-2 bg-teal-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose MedBeta?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover the features that make healthcare management simple and secure</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-xl flex items-center justify-center mb-4 sm:mb-5 mx-auto">
                <Hospital className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Cross-Hospital Access
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                View records from any connected facility
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-xl flex items-center justify-center mb-4 sm:mb-5 mx-auto">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Secure Cloud Storage
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                End-to-end encryption for patient data
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-xl flex items-center justify-center mb-4 sm:mb-5 mx-auto">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Real-Time Updates
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Instantly sync new diagnoses and treatments
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-xl flex items-center justify-center mb-4 sm:mb-5 mx-auto">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Doctor Collaboration
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Multiple specialists can update the same profile
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}