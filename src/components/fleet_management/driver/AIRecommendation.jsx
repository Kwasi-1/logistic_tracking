import React from "react";

const AIRecommendation = () => {
  return (
    <div className="bg-[#e0e6e930] p-4 rounded-xl border border-[#e0e6e930]">
      <h3 className="text-lg font-semibold">AI Score</h3>
      <div className="mt-2 text-center">
        <div className="text-5xl font-bold text-red-500">41</div>
        <p className="text-xs text-gray-400">
          20% of similar scores have been approved
        </p>
        <p className="text-sm font-semibold text-red-500">
          AI Recommendation: Reject
        </p>
      </div>
    </div>
  );
};

export default AIRecommendation;
