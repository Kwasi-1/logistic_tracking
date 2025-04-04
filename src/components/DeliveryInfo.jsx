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
  <div className="w-full sm:w-fit">
    <p className="text-sm sm:text-base text-gray-500 font-sans mb-1">{title}</p>
    <p
      className="text-xl sm:text-2xl font-semibold text-black pb-2 border-b-4"
      style={{ borderColor: borderColour }}
    >
      {icon && (
        <Icon
          icon={icon}
          className={`inline-block w-6 h-6 sm:w-10 sm:h-10 rounded-full mr-1 ${iconColor}`}
        />
      )}
      {value}
    </p>
    {subtitle && (
      <p className="text-sm sm:text-base text-black font-semibold mt-1">
        {subtitle}
      </p>
    )}
    {extra && <p className="text-xs sm:text-sm text-gray-500 mt-1">{extra}</p>}
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
    <div className="flex items-center justify-center z-20 relative mt-10 md:mt-0 sm:absolute bottom-0 inset-x-0 pb-6 sm:mb-10 px-4">
      <div className="w-[90%] sm:w-[60%] md:max-w-[80%] xl:w-[60%] mx-auto bg-white shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-4 sm:px-8">
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
