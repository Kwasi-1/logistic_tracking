import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";

function FirstStep({ formData, handleInputChange }) {
  return (
    <div className="px6">
      <h1 className="capitalize text-xl mb-2">Vehicle details</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 pb-24">
        <InputField
          label="VIN/SN"
          name="vin"
          placeholder="e.g., ABC12345"
          value={formData.vin}
          onChange={handleInputChange}
        />

        <InputField
          label="Vehicle Name"
          name="vehicleName"
          placeholder="e.g., Mercedes Truck"
          value={formData.vehicleName}
          onChange={handleInputChange}
        />

        <InputField
          label="Year"
          name="year"
          type="number"
          placeholder="e.g., 2020"
          value={formData.year}
          onChange={handleInputChange}
        />

        <InputField
          label="Make"
          name="make"
          placeholder="e.g., Toyota"
          value={formData.make}
          onChange={handleInputChange}
        />

        <InputField
          label="Model"
          name="model"
          placeholder="e.g., Prius"
          value={formData.model}
          onChange={handleInputChange}
        />

        <InputField
          label="License Plate"
          name="licensePlate"
          placeholder="e.g., ABC123"
          value={formData.licensePlate}
          onChange={handleInputChange}
        />

        <SelectField
          label="Type"
          name="type"
          options={["Car", "Truck", "Motorcycle"]}
          value={formData.type}
          onChange={handleInputChange}
        />

        <SelectField
          label="Status"
          name="status"
          options={["Active", "Inactive"]}
          value={formData.status}
          onChange={handleInputChange}
        />

        <SelectField
          label="Ownership"
          name="ownership"
          options={["Owned", "Leased"]}
          value={formData.ownership}
          onChange={handleInputChange}
        />

        <InputField
          label="Color"
          name="color"
          placeholder="e.g., Silver"
          value={formData.color}
          onChange={handleInputChange}
        />

        <InputField
          label="Body Type"
          name="bodyType"
          placeholder="e.g., Hatchback"
          value={formData.bodyType}
          onChange={handleInputChange}
        />

        <InputField
          label="MSRP"
          name="msrp"
          placeholder="e.g., $24,950"
          value={formData.msrp}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default FirstStep;
