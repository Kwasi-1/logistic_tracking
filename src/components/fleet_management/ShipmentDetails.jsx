import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ShipmentDetails({ shipment, onClose }) {
  return (
    <div className="fixed right-0 top-0 h-screen overflow-auto max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 z-50">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">{shipment.id}</h2>
          <p className="text-gray-500 text-sm">{shipment.primaryReference}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-100 px-3 py-1 rounded-md text-sm shadow">
            View in ▼
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b mb-4">
        {["Status", "Details", "Comments", "Documents"].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-500"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Map Section */}
      <div className="mb-4">
        <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-400">[Map Placeholder]</p>
        </div>
        <div className="flex justify-between text-sm mt-5">
          <div>
            <p className="font-semibold">Status</p>
            <p className="text-blue-500">{shipment.status}</p>
          </div>
          <div>
            <p className="font-semibold">Last known position</p>
            <p>{shipment.lastKnownPosition.location}</p>
            <p className="text-gray-400 text-xs">
              {shipment.lastKnownPosition.timestamp}
            </p>
          </div>
          <div>
            <p className="font-semibold">ETA</p>
            <p>{shipment.eta.location}</p>
            <p className="text-gray-400 text-xs">{shipment.eta.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Shipment Progress Timeline */}
      <div className="py-4 px-3">
        <h3 className="font-semibold text-lg my-4">Shipment Progress</h3>
        <div className="relative">
          <div className="absolute left-[10px] top-1 bottom-0 w-1 bg-[#619B7D]"></div>
          <div className="relative pl-6 space-y-8">
            {shipment.progress.map((event, index) => {
              // ✅ Declare variables properly inside the callback body
              const isFirst = index === 0;
              const isLast = index === shipment.progress.length - 1;

              return (
                <div
                  key={index}
                  className={`relative flex gap-5 ${
                    isLast ? "items-end" : "items-start"
                  } ${!isFirst && !isLast && "items-center"}`}
                >
                  {/* Line Dot */}
                  <div
                    className={`bg-[#619B7D] ${
                      isFirst || isLast
                        ? "w-10 h-10 -ml-[31px]"
                        : "w-4 h-4 -ml-5 mr-[10px]"
                    } rounded-full flex items-center justify-center`}
                  >
                    {isFirst && (
                      <Icon
                        icon="icon-park-outline:arrow-up"
                        className="h-4 w-4 text-white"
                      />
                    )}
                    {isLast && (
                      <Icon
                        icon="icon-park-outline:arrow-down"
                        className="h-4 w-4 text-white"
                      />
                    )}
                  </div>

                  {/* Event Details */}
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    {event.location && (
                      <p className="text-gray-500 text-sm">{event.location}</p>
                    )}
                    {event.address && (
                      <p className="text-gray-400 text-xs">{event.address}</p>
                    )}
                    <div className="flex items-center text-sm mt-1">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                      {event.time}
                    </div>
                    {event.status && (
                      <span
                        className={`${event.status.color} text-xs ${event.status.bgColor} px-2 py-1 rounded`}
                      >
                        {event.status.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
