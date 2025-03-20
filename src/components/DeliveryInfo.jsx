import { Icon } from "@iconify/react/dist/iconify.js";

const DetailItem = ({ title, value, subtitle, icon, extra, borderColour, iconColor }) => (
  <div className="flex-1 flex flex-col gap-1">
    <p className="text-base text-gray-500 font-sans">{title}</p>
    <p className={`text-3xl font-semibold text-black pb-2 border-b-4`} style={{ borderColor: borderColour, width: 'fit-content' }}>
      {icon && <Icon icon={icon} className={`inline-block w-11 h-11 rounded-full mr-1 ${iconColor}`}/>}
      {value}
    </p>
    {subtitle && <p className="text-lg font-semibold mt-1">{subtitle}</p>}
    {extra && <p className="text-base text-gray-600 mt-1">{extra}</p>}
    
  </div>
);

const DeliveryInfo = () => {
  const deliveryData = {
    status: { title: "Status", value: "In Transit", subtitle: "Driver Assigned", extra: "Mike Tyson", borderColour: "#619B7D" },
    vehicle: { title: "Vehicle", value: "KIA F5", subtitle: "Order", extra: "MAT-MR-2025-00315", borderColour: "#619B7D" },
    pickup: { title: "Pickup", value: "Oyarifa WH", subtitle: "In Transit", extra: "11 Nov 2:30PM", icon: "ri:arrow-up-circle-fill", iconColor: "text-black", borderColour: "#FFA600" },
    destination: { title: "Destination", value: "Cepodek", subtitle: "Arriving", icon: "ri:arrow-down-circle-fill", iconColor: "text-[#8DB6A2]", borderColour: "#929292" },
  };

  return (
    <div className="flex items-center justify-center z-20 absolute bottom-0 inset-x-0 mb-10">
      <div className="w-[70%] mx-auto bg-white shadow-lg rounded-lg flex justify-between items-start p-8 space-x-6">
        {Object.values(deliveryData).map((item, index) => (
          <DetailItem key={index} title={item.title} value={item.value} subtitle={item.subtitle} icon={item.icon} extra={item.extra} borderColour={item.borderColour} iconColor={item.iconColor} />
        ))}
      </div>
    </div>
  );
};

export default DeliveryInfo;
