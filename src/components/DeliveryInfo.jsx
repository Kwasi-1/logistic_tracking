import { Icon } from "@iconify/react/dist/iconify.js";

const DetailItem = ({
  title,
  value,
  subtitle,
  icon,
  extra,
  borderColour,
  iconColor,
}) => (
  <div className="w-fit">
    <p className="text-base text-gray-500 font-sans mb-1">{title}</p>
    <p
      className={`text-2xl font-semibold text-black pb-2 border-b-4`}
      style={{ borderColor: borderColour, width: "full" }}
    >
      {icon && (
        <Icon
          icon={icon}
          className={`inline-block w-10 h-10 rounded-full mr-1 ${iconColor}`}
        />
      )}
      {value}
    </p>
    {subtitle && (
      <p className="text-base text-black font-semibold mt-1">{subtitle}</p>
    )}
    {extra && <p className="text-sm text-gray-500 mt-1">{extra}</p>}
  </div>
);

const DeliveryInfo = () => {
  const deliveryData = {
    status: {
      title: "Status",
      value: "In Transit",
      subtitle: "Driver Assigned",
      extra: "Mike Tyson",
      borderColour: "#619B7D",
    },
    vehicle: {
      title: "Vehicle",
      value: "KIA F5",
      subtitle: "Order",
      extra: "MAT-MR-2025-00315",
      borderColour: "#619B7D",
    },
    pickup: {
      title: "Pickup",
      value: "Oyarifa WH",
      subtitle: "In Transit",
      extra: "11 Nov 2:30PM",
      icon: "ri:arrow-up-circle-fill",
      iconColor: "text-black",
      borderColour: "#FFA600",
    },
    destination: {
      title: "Destination",
      value: "Cepodek",
      subtitle: "Arriving",
      icon: "ri:arrow-down-circle-fill",
      iconColor: "text-[#8DB6A2]",
      borderColour: "#929292",
    },
  };

  return (
    <div className="flex items-center justify-center z-20 absolute bottom-0 inset-x-0 mb-10">
      <div className="w-[60%] mx-auto bg-white shadow-lg rounded-lg flex justify-evenly items-start py-7 px-6 lg:px-0  space-x-6">
        {Object.values(deliveryData).map((item, index) => (
          <DetailItem
            key={index}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
            extra={item.extra}
            borderColour={item.borderColour}
            iconColor={item.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryInfo;
