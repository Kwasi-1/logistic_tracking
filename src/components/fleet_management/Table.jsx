import { Icon } from "@iconify/react";
import { useState } from "react";
import StatusText from "./StatusText";

const Table = ({
  columns,
  data,
  searchPlaceholder,
  buttonLabel,
  onRowClick,
  onButtonClick,
  onOperatorClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filtered data based on search term
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Handle operator click
  const handleOperatorClick = (e, row) => {
    e.stopPropagation(); // Prevent row click
    if (onOperatorClick) onOperatorClick(row, e);
  };

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 border rounded-lg focus:outline outline-2"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
          />
          <button
            class="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none dark:bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green text-black font-medium"
            onClick={onButtonClick}
          >
            <Icon
              icon="mdi-light:plus-box"
              className="mr-1 font-thin text-xl"
            />
            {buttonLabel}
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 uppercase font-semibold text-gray-600 text-[12px] ">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-b-0 hover:bg-gray-100 cursor-pointer text-[13px] text-gray-600"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {/* Status Text for the status column */}
                    {col.key === "status" ? (
                      <StatusText text={row[col.key]} />
                    ) : col.key === "operator" ? (
                      <button
                        className="underline hover:text-gray-400 transition duration-300"
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

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 px-4">
          {/* <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div> */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Icon icon="mingcute:left-line" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Icon icon="mingcute:right-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
