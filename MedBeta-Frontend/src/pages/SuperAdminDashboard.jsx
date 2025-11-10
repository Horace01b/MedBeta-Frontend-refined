import React, { useState } from "react";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const systemStats = {
    totalHospitals: 45,
    totalDoctors: 1250,
    totalPatients: 8900,
    totalPharmacists: 180,
    monthlyRevenue: 125000
  };

  const hospitals = [
    { id: 1, name: "City General Hospital", doctors: 25, patients: 450, status: "Active" },
    { id: 2, name: "Metro Medical Center", doctors: 18, patients: 320, status: "Active" },
    { id: 3, name: "Regional Health Clinic", doctors: 12, patients: 180, status: "Pending" }
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 bg-white shadow-md m-2 sm:m-4 rounded-2xl p-4 sm:p-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Super Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">System Administrator</span>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              SA
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 overflow-x-auto">
          {["overview", "hospitals", "users", "analytics", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap capitalize ${
                activeTab === tab ? "bg-purple-500 text-white" : "border hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(systemStats).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Recent Activities</h3>
                <div className="space-y-2 text-sm">
                  <div>New hospital registered: Metro Health</div>
                  <div>Doctor verification completed: Dr. Smith</div>
                  <div>System maintenance scheduled</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">System Health</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Server Status</span>
                    <span className="text-green-600">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database</span>
                    <span className="text-green-600">Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hospitals" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Hospital Management</h2>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
                Add Hospital
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Hospital Name</th>
                    <th className="p-3 text-left">Doctors</th>
                    <th className="p-3 text-left">Patients</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((hospital) => (
                    <tr key={hospital.id} className="border-b">
                      <td className="p-3">{hospital.name}</td>
                      <td className="p-3">{hospital.doctors}</td>
                      <td className="p-3">{hospital.patients}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          hospital.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {hospital.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm">Edit</button>
                          <button className="text-red-600 text-sm">Suspend</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;