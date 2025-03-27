import { useState } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import ModalLayout from "../layouts/ModalLayout";

function CreateShipment({ isOpen, onClose }) {
  const [serviceType, setServiceType] = useState("FTL");
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    pickupDate: "",
  });

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Create Shipment"
      description="Set up a new shipment with our easy-to-use form"
    >
      <div className="py-4 bg-white rounded-lg">
        {/* Service Type */}
        <div className="mb-6">
          <h3 className="mb-2 font-medium">Choose your service type</h3>
          <div className="flex gap-4">
            <button
              className={`p-4 border rounded-lg w-full ${
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
              className={`p-4 border rounded-lg w-full ${
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
            <div className="relative flex flex-col gap-4 items-start">
              {/* Pickup Address */}
              <div className="flex items-center gap-2 border rounded bg-white px-2 w-full">
                <span className="w-3 h-3 bg-black rounded-full"></span>
                <AddressAutofill accessToken={MAPBOX_TOKEN}>
                  <input
                    type="text"
                    name="pickupAddress"
                    placeholder="Pickup location"
                    className="w-full p-2 outline-none"
                    autoComplete="address-line1"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                  />
                </AddressAutofill>
              </div>

              {/* Vertical Line */}
              <div className="absolute left-[13px] top-[20px] bottom-[20px] w-[3px] bg-black"></div>

              {/* Delivery Address */}
              <div className="flex items-center gap-2 rounded border bg-white px-2 w-full">
                <span className="w-3 h-3 bg-black rounded-full"></span>
                <AddressAutofill
                  accessToken={MAPBOX_TOKEN}
                  options={{
                    country: "GH",
                    language: "en",
                    types: "place,region,locality",
                    fuzzyMatch: true,
                    autocomplete: true,
                    limit: 5,
                  }}
                >
                  <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="Delivery location"
                    className="w-full p-2 outline-none"
                    autoComplete="address-line1"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                  />
                </AddressAutofill>
              </div>
            </div>

            <input
              type="date"
              name="pickupDate"
              placeholder="Preferred pickup date"
              className="w-full p-2 mb-2 border mt-3 rounded"
              value={formData.pickupDate}
              onChange={handleInputChange}
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

        {/* Remove the existing buttons and let ModalLayout handle navigation */}
      </div>
    </ModalLayout>
  );
}

export default CreateShipment;
