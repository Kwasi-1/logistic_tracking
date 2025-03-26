import { useState } from "react";

const operators = [
  "Jacob Silva",
  "Carlos Garcia",
  "John Doe",
  "Emily Brown",
  "Unassigned",
];

const OperatorModal = ({ isOpen, onClose, onAssign }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOperators = operators.filter((op) =>
    op.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="backdrop"
      className="absolute inset-0 flex justify-center items-center text-xs"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-2 -ml-[15%] rounded-lg w-[300px] border">
        <input
          type="text"
          placeholder="Search operator..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <ul className="max-h-40 overflow-auto">
          {filteredOperators.map((op) => (
            <li
              key={op}
              className="p-2 hover:bg-gray-100 cursor-pointer "
              onClick={() => {
                onAssign(op);
                onClose();
              }}
            >
              {op}
            </li>
          ))}
        </ul>
        {/* <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button> */}
      </div>
    </div>
  );
};

export default OperatorModal;
