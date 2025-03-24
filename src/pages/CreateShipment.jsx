import { useState } from "react";

function CreateShipment({ onClose }) {
  const [serviceType, setServiceType] = useState("FTL");

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create Shipment</h2>
      </div>

      {/* Service Type */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium">Choose your service type</h3>
        <div className="flex gap-4">
          <button
            className={`p-4 border rounded-lg ${
              serviceType === "FTL"
                ? "border-[#619B7D] bg-[#E6F5EE]"
                : "border-gray-300"
            }`}
            onClick={() => handleServiceTypeChange("FTL")}
          >
            <h4 className="font-medium">Full truckload (FTL)</h4>
            <p className="text-sm text-gray-500">
              Best for shipments that fill an entire truck
            </p>
          </button>

          <button
            className={`p-4 border rounded-lg ${
              serviceType === "LTL"
                ? "border-[#619B7D] bg-[#E6F5EE]"
                : "border-gray-300"
            }`}
            onClick={() => handleServiceTypeChange("LTL")}
          >
            <h4 className="font-medium">Less-than-truckload (LTL)</h4>
            <p className="text-sm text-gray-500">
              Best for shipments under 12 pallets
            </p>
          </button>
        </div>
      </div>

      {/* Pickup & Delivery */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium">Pickup & delivery</h3>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <input
            type="text"
            placeholder="Pickup location"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Delivery location"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="date"
            placeholder="Preferred pickup date"
            className="w-full p-2 mb-2 border rounded"
          />
          <p className="text-sm text-gray-500">
            Pickup date not guaranteed. Pickup may be up to 2 days after the
            preferred date.
          </p>
        </div>
      </div>

      {/* Shipment Information */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium">Shipment information</h3>
        <p className="text-gray-500 text-sm">Step 1 of 3</p>
        <div className="bg-gray-50 p-4 rounded-lg border flex justify-between">
          <div>
            <p>Total weight</p>
            <p>---</p>
          </div>
          <div>
            <p>Total items</p>
            <p>---</p>
          </div>
          <div>
            <p>Price</p>
            <p>---</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-[#619B7D] text-white p-3 rounded-lg">
          See quotes →
        </button>
      </div>
    </div>
  );
}

export default CreateShipment;
