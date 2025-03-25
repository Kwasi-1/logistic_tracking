import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
        <div className="flex justify-between text-sm mt-2">
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
      <div>
        <h3 className="font-semibold text-lg mb-2">Shipment Progress</h3>
        <div className="border-l-2 border-gray-200 pl-4 space-y-4">
          {shipment.progress.map((event, idx) => (
            <div key={idx} className="relative">
              <div
                className={`absolute -left-4 top-1 w-3 h-3 ${event.iconColor} rounded-full`}
              />
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
          ))}
        </div>
      </div>
    </div>
  );
}
