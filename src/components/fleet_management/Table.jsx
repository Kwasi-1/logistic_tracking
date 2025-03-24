import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ columns, data, searchPlaceholder, buttonLabel, routePath }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleButtonClick = () => {
    navigate(routePath);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="p-2 border rounded-lg focus:outline outline-2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-3 bg-[#619B7D] text-white rounded-lg flex items-center ml-4 hover:bg-[#619B7Dcf]" onClick={handleButtonClick}>
          <Icon icon="akar-icons:plus" className="mr-2" />
          {buttonLabel}
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th key={col.key} className="p-3 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
