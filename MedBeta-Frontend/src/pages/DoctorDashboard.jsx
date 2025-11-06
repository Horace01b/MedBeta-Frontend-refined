import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/40");
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2024-11-06", time: "10:00", patient: "Jane Doe", type: "Consultation" },
    { id: 2, date: "2024-11-07", time: "14:30", patient: "John Smith", type: "Follow-up" },
  ]);
  
  const appointmentHistory = [
    { id: 1, patient: "Sarah Wilson", date: "03/09/2024", time: "09:00 AM", status: "Completed", type: "Consultation" },
    { id: 2, patient: "Mike Johnson", date: "02/09/2024", time: "02:30 PM", status: "Completed", type: "Follow-up" },
    { id: 3, patient: "Emma Davis", date: "01/09/2024", time: "11:15 AM", status: "Completed", type: "Emergency" },
    { id: 4, patient: "Robert Brown", date: "30/08/2024", time: "04:00 PM", status: "Cancelled", type: "Consultation" },
    { id: 5, patient: "Lisa Garcia", date: "29/08/2024", time: "10:30 AM", status: "Completed", type: "Surgery" },
  ];
  
  const bookings = [
    { id: 1, name: "Jane Doe", date: "04/09/2024", time: "10:00 AM" },
    { id: 2, name: "John Smith", date: "05/09/2024", time: "11:30 AM" },
    { id: 3, name: "Alice Johnson", date: "05/09/2024", time: "02:00 PM" },
  ];

  const handleConfirm = (name) => alert(`${name}'s appointment confirmed!`);
  const handleReject = (name) => alert(`${name}'s appointment rejected!`);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoCall = (patientName) => {
    setCurrentPatient(patientName);
    setShowVideoCall(true);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (day) => {
    if (!day) return [];
    const dateStr = formatDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
    return appointments.filter(apt => apt.date === dateStr);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 bg-white shadow-md m-2 sm:m-4 rounded-2xl p-4 sm:p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Doctor Dashboard</h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowProfileSettings(!showProfileSettings)}
              className="text-sm text-teal-600 hover:text-teal-800"
            >
              Settings
            </button>
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full w-10 h-10 cursor-pointer"
              onClick={() => setShowProfileSettings(!showProfileSettings)}
            />
          </div>
        </div>

        {/* Profile Settings Modal */}
        {showProfileSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Profile Settings</h3>
                <button 
                  onClick={() => setShowProfileSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-3" />
                  <label className="block">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="bg-teal-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-600">
                      Upload Photo
                    </span>
                  </label>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" value="Dr. John Doe" disabled className="w-full p-2 border rounded-md bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value="doctor@example.com" disabled className="w-full p-2 border rounded-md bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <input type="text" value="MD123456" disabled className="w-full p-2 border rounded-md bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("bookings")}
            className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "bookings" ? "bg-teal-500 text-white" : "border hover:bg-gray-50"
            }`}
          >
            Manage Bookings
          </button>
          <button 
            onClick={() => setActiveTab("records")}
            className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "records" ? "bg-teal-500 text-white" : "border hover:bg-gray-50"
            }`}
          >
            View Records
          </button>
          <button 
            onClick={() => setActiveTab("prescription")}
            className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "prescription" ? "bg-teal-500 text-white" : "border hover:bg-gray-50"
            }`}
          >
            Create Prescription
          </button>
          <button 
            onClick={() => setActiveTab("calendar")}
            className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "calendar" ? "bg-teal-500 text-white" : "border hover:bg-gray-50"
            }`}
          >
            Calendar
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "bookings" && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Manage Bookings</h2>
            <input
              type="text"
              placeholder="Search patients"
              className="border rounded-md w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">{b.name}</div>
                  <div className="text-sm text-gray-600">
                    <div>{b.date} at {b.time}</div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleConfirm(b.name)}
                      className="bg-teal-500 text-white px-2 py-1 rounded-md text-xs flex-1"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleReject(b.name)}
                      className="border border-gray-400 px-2 py-1 rounded-md text-xs flex-1"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleVideoCall(b.name)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs flex-1"
                    >
                      Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Patient</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b">
                      <td className="p-3">{b.name}</td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3">{b.time}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleConfirm(b.name)}
                            className="bg-teal-500 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleReject(b.name)}
                            className="border border-gray-400 px-3 py-1 rounded-md text-sm"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleVideoCall(b.name)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Video Call
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Appointment History */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Appointment History</h3>
              
              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-3">
                {appointmentHistory.map((apt) => (
                  <div key={apt.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{apt.patient}</div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        apt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>{apt.date} at {apt.time}</div>
                      <div className="text-xs text-gray-500 mt-1">{apt.type}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 text-sm font-medium">Patient</th>
                      <th className="p-3 text-sm font-medium">Date</th>
                      <th className="p-3 text-sm font-medium">Time</th>
                      <th className="p-3 text-sm font-medium">Type</th>
                      <th className="p-3 text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentHistory.map((apt) => (
                      <tr key={apt.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm">{apt.patient}</td>
                        <td className="p-3 text-sm">{apt.date}</td>
                        <td className="p-3 text-sm">{apt.time}</td>
                        <td className="p-3 text-sm">{apt.type}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            apt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "records" && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Patient Records</h2>
            <div className="space-y-3">
              {bookings.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 rounded-md gap-3"
                >
                  <span className="font-medium">{p.name}</span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="border px-3 py-1 rounded-md text-sm hover:bg-gray-50">
                      View Record
                    </button>
                    <button className="border px-3 py-1 rounded-md text-sm hover:bg-gray-50">
                      Update Record
                    </button>
                    <button 
                      onClick={() => handleVideoCall(p.name)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                    >
                      Video Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "prescription" && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Create Prescription</h2>
            <div className="max-w-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Patient Name</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Select Patient</option>
                  {bookings.map(b => <option key={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Medication</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter medication" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Dosage</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="e.g., 500mg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Frequency</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="e.g., Twice daily" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Instructions</label>
                <textarea className="w-full p-2 border rounded-md" rows="3" placeholder="Additional instructions"></textarea>
              </div>
              <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
                Create Prescription
              </button>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Calendar & Scheduling</h2>
            
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <h3 className="text-lg font-medium">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                  {day}
                </div>
              ))}
              {getDaysInMonth(selectedDate).map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day);
                return (
                  <div key={index} className="min-h-[80px] border border-gray-200 p-1">
                    {day && (
                      <>
                        <div className="text-sm font-medium mb-1">{day}</div>
                        {dayAppointments.map(apt => (
                          <div key={apt.id} className="text-xs bg-teal-100 text-teal-800 p-1 rounded mb-1 truncate">
                            {apt.time} {apt.patient}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Schedule New Appointment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input type="date" className="p-2 border rounded-md" />
                <input type="time" className="p-2 border rounded-md" />
                <input type="text" placeholder="Patient name" className="p-2 border rounded-md" />
                <select className="p-2 border rounded-md">
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>Emergency</option>
                  <option>Surgery</option>
                </select>
              </div>
              <button className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                Schedule Appointment
              </button>
            </div>
          </div>
        )}

        {showVideoCall && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Video Call with {currentPatient}</h3>
                <button 
                  onClick={() => setShowVideoCall(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 bg-gray-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <p className="text-lg">{currentPatient}</p>
                    <p className="text-sm text-gray-300">Connecting...</p>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg border-2 border-white">
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 flex justify-center gap-4">
                <button className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600">
                  📞
                </button>
                <button className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600">
                  🎤
                </button>
                <button className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600">
                  📹
                </button>
                <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600">
                  💬
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
