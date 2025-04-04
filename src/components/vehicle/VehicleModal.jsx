import { useState, useEffect } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import FirstStep from "./modal/FirstStep";
import MaintenanceSchedule from "./modal/MaintenanceSchedule";
import Lifecycle from "./modal/Lifecycle";
import Financial from "./modal/Financial";
import Specifications from "./modal/Specifications";

function VehicleModal({ isOpen, onClose, vehicle, isEditMode }) {
  const [formData, setFormData] = useState({
    vin: "",
    vehicleName: "",
    type: "Car",
    status: "Active",
    ownership: "Owned",
    labels: "",
    year: "",
    make: "",
    model: "",
    licensePlate: "",
    color: "",
    meter: "",
    bodyType: "",
    msrp: "",
    acquisitionCost: "",
    bookValue: "",
    depreciationMethod: "Straight Line",
    residualValue: "",
    activeFleetServiceDate: "",
    inServiceOdometer: "",
    serviceLifeMonths: "",
    serviceLifeMeter: "",
    resaleValue: "",
    engineType: "",
    horsepower: "",
    torque: "",
    transmission: "",
    fuelType: "",
    fuelCapacity: "",
  });

  useEffect(() => {
    if (isEditMode && vehicle) {
      setFormData({
        vin: vehicle.vin,
        vehicleName: `${vehicle.id} [${vehicle.year} ${vehicle.make} ${vehicle.model}]`,
        type: "Car",
        status: vehicle.status,
        ownership: vehicle.ownership,
        labels: "",
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        licensePlate: vehicle.licensePlate,
        color: vehicle.color,
        meter: vehicle.meter,
        bodyType: vehicle.bodyType,
        msrp: vehicle.msrp,
        acquisitionCost: vehicle.acquisitionCost,
        bookValue: vehicle.bookValue,
        depreciationMethod: vehicle.depreciationMethod,
        residualValue: vehicle.residualValue,
        activeFleetServiceDate: vehicle.activeFleetServiceDate,
        inServiceOdometer: vehicle.inServiceOdometer,
        serviceLifeMonths: vehicle.serviceLifeMonths,
        serviceLifeMeter: vehicle.serviceLifeMeter,
        resaleValue: vehicle.resaleValue,
        engineType: vehicle.engineType,
        horsepower: vehicle.horsepower,
        torque: vehicle.torque,
        transmission: vehicle.transmission,
        fuelType: vehicle.fuelType,
        fuelCapacity: vehicle.fuelCapacity,
      });
    }
  }, [isEditMode, vehicle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Vehicle" : "Add Vehicle"}
      description={
        isEditMode
          ? "Edit the vehicle details below"
          : "Enter the vehicle details below"
      }
      tabs={[
        "Details",
        "Maintenance",
        "Lifecycle",
        "Financial",
        "Specifications",
      ]}
    >
      <FirstStep formData={formData} handleInputChange={handleInputChange} />
      <MaintenanceSchedule
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <Lifecycle formData={formData} handleInputChange={handleInputChange} />
      <Financial formData={formData} handleInputChange={handleInputChange} />
      <Specifications
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </ModalLayout>
  );
}

export default VehicleModal;
