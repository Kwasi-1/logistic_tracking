import { useState } from "react";

function VehicleModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vin: "",
    vehicleName: "",
    type: "Car",
    status: "Active",
    ownership: "Owned",
    labels: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && formData.vin && formData.vehicleName) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick} // Close when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[500px]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-2xl font-semibold mb-4">
          {step === 1 ? "Add with a VIN" : "Identification"}
        </h2>

        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">VIN/SN</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="vin"
                  placeholder="VIN/SN"
                  className="w-full p-2 border rounded-md"
                  value={formData.vin}
                  onChange={handleInputChange}
                />
                <button className="bg-gray-200 px-4 py-2 rounded-md w-40">
                  Decode VIN
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Asset Identification Number or Serial Number.
                <a href="#" className="text-blue-500">
                  Learn More
                </a>
              </p>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Vehicle Name</label>
              <input
                type="text"
                name="vehicleName"
                placeholder="Mercedes truck"
                className="w-full p-2 border rounded-md"
                value={formData.vehicleName}
                onChange={handleInputChange}
              />
              <p className="text-gray-500 text-sm mt-1">
                Enter a nickname to distinguish this asset.
                <a href="#" className="text-blue-500">
                  Learn More
                </a>
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-[#619B7D] text-white px-4 py-2 rounded-md"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">Type</label>
              <select
                name="type"
                className="w-full p-2 border rounded-md"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Status</label>
              <select
                name="status"
                className="w-full p-2 border rounded-md"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Ownership</label>
              <select
                name="ownership"
                className="w-full p-2 border rounded-md"
                value={formData.ownership}
                onChange={handleInputChange}
              >
                <option value="Owned">Owned</option>
                <option value="Leased">Leased</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Labels</label>
              <input
                type="text"
                name="labels"
                placeholder="Please select"
                className="w-full p-2 border rounded-md"
                value={formData.labels}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between gap-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded-md"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="bg-[#619B7D] text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VehicleModal;
