import React, { useState } from "react";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  
  const USD_TO_KES = 150; // Exchange rate
  const convertToKES = (usdAmount) => Math.round(usdAmount * USD_TO_KES);

  const appointments = [
    { id: 1, doctor: "Dr. Smith", date: "2024-11-08", time: "10:00 AM", type: "Consultation", fee: 50 },
    { id: 2, doctor: "Dr. Johnson", date: "2024-11-10", time: "2:30 PM", type: "Follow-up", fee: 30 }
  ];

  const doctors = [
    { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiology", rating: 4.8, fee: 75, available: true },
    { id: 2, name: "Dr. Mike Johnson", specialty: "Dermatology", rating: 4.6, fee: 60, available: true },
    { id: 3, name: "Dr. Lisa Davis", specialty: "Pediatrics", rating: 4.9, fee: 55, available: false }
  ];

  const handlePayment = (amount, method) => {
    setPaymentAmount(convertToKES(amount));
    setSelectedPayment(method);
    setShowPayment(true);
  };

  const processPayment = () => {
    alert(`Payment of KES ${paymentAmount.toLocaleString()} via ${selectedPayment} processed successfully!`);
    setShowPayment(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 bg-white shadow-md m-2 sm:m-4 rounded-2xl p-4 sm:p-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Patient Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Welcome, John Doe</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              👤
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 overflow-x-auto">
          {["appointments", "doctors", "records", "payments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap capitalize ${
                activeTab === tab ? "bg-blue-500 text-white" : "border hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "appointments" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">My Appointments</h2>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="font-medium">{apt.doctor}</div>
                      <div className="text-sm text-gray-600">{apt.date} at {apt.time}</div>
                      <div className="text-xs text-gray-500">{apt.type}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">KES {convertToKES(apt.fee).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">${apt.fee} USD</div>
                      </div>
                      <button 
                        onClick={() => handlePayment(apt.fee, "")}
                        className="bg-green-500 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "doctors" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Available Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="border rounded-lg p-4">
                  <div className="text-center mb-3">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                      👨‍⚕️
                    </div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-gray-600">{doctor.specialty}</div>
                    <div className="text-sm text-yellow-600">⭐ {doctor.rating}</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <div className="text-lg font-bold text-blue-600">KES {convertToKES(doctor.fee).toLocaleString()}</div>
                      <div className="text-xs text-gray-500">${doctor.fee} USD</div>
                    </div>
                    <button 
                      disabled={!doctor.available}
                      onClick={() => handlePayment(doctor.fee, "")}
                      className={`w-full py-2 rounded-md text-sm ${
                        doctor.available 
                          ? "bg-blue-500 text-white hover:bg-blue-600" 
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {doctor.available ? "Book Appointment" : "Unavailable"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment History</h2>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Dr. Smith - Consultation</div>
                    <div className="text-sm text-gray-600">Nov 1, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">KES 7,500</div>
                    <div className="text-xs text-gray-500">$50.00 USD</div>
                    <div className="text-sm text-green-600">Paid via M-Pesa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Payment Options</h3>
                <button 
                  onClick={() => setShowPayment(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">KES {paymentAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">${Math.round(paymentAmount / USD_TO_KES)} USD</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { id: "mpesa", name: "M-Pesa", icon: "📱", color: "green" },
                  { id: "airtel", name: "Airtel Money", icon: "📲", color: "red" },
                  { id: "paypal", name: "PayPal", icon: "💳", color: "blue" },
                  { id: "card", name: "Bank Card", icon: "💳", color: "gray" }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.name)}
                    className={`w-full p-3 border rounded-lg flex items-center gap-3 hover:bg-gray-50 ${
                      selectedPayment === method.name ? `border-${method.color}-500 bg-${method.color}-50` : ""
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </button>
                ))}
              </div>

              {selectedPayment && (
                <div className="mt-4 space-y-3">
                  {selectedPayment === "M-Pesa" && (
                    <input 
                      type="tel" 
                      placeholder="Enter M-Pesa number (254...)" 
                      className="w-full p-3 border rounded-md"
                    />
                  )}
                  {selectedPayment === "Airtel Money" && (
                    <input 
                      type="tel" 
                      placeholder="Enter Airtel Money number" 
                      className="w-full p-3 border rounded-md"
                    />
                  )}
                  {selectedPayment === "PayPal" && (
                    <input 
                      type="email" 
                      placeholder="Enter PayPal email" 
                      className="w-full p-3 border rounded-md"
                    />
                  )}
                  {selectedPayment === "Bank Card" && (
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Card Number" 
                        className="w-full p-3 border rounded-md"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="p-3 border rounded-md"
                        />
                        <input 
                          type="text" 
                          placeholder="CVV" 
                          className="p-3 border rounded-md"
                        />
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={processPayment}
                    className="w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600"
                  >
                    Pay KES {paymentAmount.toLocaleString()}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;