import React from "react";

const EditsHistory = () => {
  return (
    <div className="bg-gray-200/50 p-4 mt-4 rounded-lg border border-[#e0e6e9] text-sm">
      <h3 className="text-base font-semibold">Edits History</h3>
      <ul className="mt-2 space-y-2 text-sm text-gray-500">
        <li>02/10/2022 - Address Change</li>
        <li>02/10/2022 - Number Change</li>
        <li>02/10/2022 - Email Address Change</li>
      </ul>
    </div>
  );
};

export default EditsHistory;
