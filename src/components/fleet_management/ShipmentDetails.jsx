import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function ShipmentDetails() {
  return (
    <div className="absolute right-0 top-0 h-screen overflow-auto max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">ME #12345678</h2>
          <p className="text-gray-500 text-sm">Primary reference #12345678</p>
        </div>
        <button className="bg-gray-100 px-3 py-1 rounded-md text-sm shadow">
          View in ▼
        </button>
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
            <p className="text-blue-500">In transit</p>
          </div>
          <div>
            <p className="font-semibold">Last known position</p>
            <p>Salt Lake City, UT</p>
            <p className="text-gray-400 text-xs">02/20/2023 2:00</p>
          </div>
          <div>
            <p className="font-semibold">ETA</p>
            <p>Chicago, IL</p>
            <p className="text-gray-400 text-xs">02/22/2023 18:30</p>
          </div>
        </div>
      </div>

      {/* Shipment Progress Timeline */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Shipment Progress</h3>
        <div className="border-l-2 border-gray-200 pl-4 space-y-4">
          {/* Pickup */}
          <div className="relative">
            <div className="absolute -left-4 top-1 w-3 h-3 bg-blue-500 rounded-full" />
            <p className="font-semibold">Pickup</p>
            <p className="text-gray-500 text-sm">Oakland Radio Warehouse</p>
            <p className="text-gray-400 text-xs">
              171 Montecito Ave, Oakland, CA 94610
            </p>
            <div className="flex items-center text-sm mt-1">
              <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
              02/19/2023 00:01 - 02/19/2023 23:59
            </div>
          </div>

          {/* Arrival */}
          <div className="relative">
            <div className="absolute -left-4 top-1 w-3 h-3 bg-green-500 rounded-full" />
            <p className="font-semibold">Arrival</p>
            <div className="flex items-center text-sm">
              <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
              02/19/2023 12:45
            </div>
            <span className="text-green-500 text-xs bg-green-100 px-2 py-1 rounded">
              On time
            </span>
          </div>

          {/* Loaded */}
          <div className="relative">
            <div className="absolute -left-4 top-1 w-3 h-3 bg-blue-500 rounded-full" />
            <p className="font-semibold">Loaded</p>
            <p className="text-sm text-gray-500">02/19/2023 1:30</p>
          </div>

          {/* Departure */}
          <div className="relative">
            <div className="absolute -left-4 top-1 w-3 h-3 bg-blue-500 rounded-full" />
            <p className="font-semibold">Departure</p>
            <p className="text-sm text-gray-500">02/19/2023 1:45</p>
          </div>

          {/* Interline Stop */}
          <div className="relative">
            <div className="absolute -left-4 top-1 w-3 h-3 bg-yellow-500 rounded-full" />
            <p className="font-semibold">Interline Stop</p>
            <p className="text-sm text-gray-500">Salt Lake City, UT</p>
            <p className="text-gray-400 text-xs">02/20/2023 2:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
