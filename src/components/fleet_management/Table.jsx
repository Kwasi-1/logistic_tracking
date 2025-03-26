import { Icon } from "@iconify/react";
import { useState } from "react";
import StatusText from "./StatusText"; // Import the StatusText component

const Table = ({
  columns,
  data,
  searchPlaceholder,
  buttonLabel,
  onRowClick,
  onButtonClick,
  onOperatorClick, // New prop for operator click
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered data based on search term
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle operator click
  const handleOperatorClick = (e, row) => {
    e.stopPropagation(); // Prevent row click
    if (onOperatorClick) onOperatorClick(row);
  };

  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 border rounded-lg focus:outline outline-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="p-2 py-3 border-2 text-sm border-[#619B7D] text-[#619B7D] hover:text-white rounded-lg flex items-center ml-4 hover:bg-[#619B7D] transition duration-300"
            onClick={onButtonClick}
          >
            <Icon icon="akar-icons:plus" className="mr-2" />
            {buttonLabel}
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 uppercase font-semibold text-gray-600 text-sm">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-b-0 hover:bg-gray-100 cursor-pointer text-sm text-gray-600"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {/* Status Text for the status column */}
                    {col.key === "status" ? (
                      <StatusText text={row[col.key]} />
                    ) : col.key === "operator" ? (
                      <button
                        className=" underline hover:text-gray-400 transition duration-300"
                        onClick={(e) => handleOperatorClick(e, row)}
                      >
                        {row[col.key]}
                      </button>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
