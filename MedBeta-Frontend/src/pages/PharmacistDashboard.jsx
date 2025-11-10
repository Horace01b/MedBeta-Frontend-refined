import React, { useState } from "react";

const PharmacistDashboard = () => {
  const [activeTab, setActiveTab] = useState("prescriptions");
  
  const prescriptions = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", medication: "Amoxicillin 500mg", status: "Pending", date: "2024-11-06" },
    { id: 2, patient: "Jane Wilson", doctor: "Dr. Johnson", medication: "Paracetamol 250mg", status: "Ready", date: "2024-11-06" },
    { id: 3, patient: "Mike Brown", doctor: "Dr. Davis", medication: "Ibuprofen 400mg", status: "Dispensed", date: "2024-11-05" }
  ];

  const inventory = [
    { id: 1, name: "Amoxicillin 500mg", stock: 150, minStock: 50, price: 25.00, expiry: "2025-06-15" },
    { id: 2, name: "Paracetamol 250mg", stock: 300, minStock: 100, price: 12.50, expiry: "2025-08-20" },
    { id: 3, name: "Ibuprofen 400mg", stock: 45, minStock: 50, price: 18.75, expiry: "2025-04-10" }
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 bg-white shadow-md m-2 sm:m-4 rounded-2xl p-4 sm:p-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Pharmacist Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Licensed Pharmacist</span>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
              💊
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 overflow-x-auto">
          {["prescriptions", "inventory", "sales", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap capitalize ${
                activeTab === tab ? "bg-green-500 text-white" : "border hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "prescriptions" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Prescription Management</h2>
            <div className="space-y-3 sm:hidden">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="border rounded-lg p-4">
                  <div className="font-medium">{rx.patient}</div>
                  <div className="text-sm text-gray-600">{rx.medication}</div>
                  <div className="text-xs text-gray-500">Dr: {rx.doctor}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      rx.status === 'Ready' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rx.status}
                    </span>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                      Process
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Patient</th>
                    <th className="p-3 text-left">Doctor</th>
                    <th className="p-3 text-left">Medication</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((rx) => (
                    <tr key={rx.id} className="border-b">
                      <td className="p-3">{rx.patient}</td>
                      <td className="p-3">{rx.doctor}</td>
                      <td className="p-3">{rx.medication}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          rx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          rx.status === 'Ready' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rx.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                          Process
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Inventory Management</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                Add Medicine
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Medicine</th>
                    <th className="p-3 text-left">Stock</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Expiry</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">
                        <span className={item.stock < item.minStock ? 'text-red-600 font-medium' : ''}>
                          {item.stock}
                        </span>
                      </td>
                      <td className="p-3">${item.price}</td>
                      <td className="p-3">{item.expiry}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.stock < item.minStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.stock < item.minStock ? 'Low Stock' : 'In Stock'}
                        </span>
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

export default PharmacistDashboard;