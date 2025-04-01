const Textarea = ({
  label,
  value,
  onChange,
  placeholder = "Enter text...",
  rows = 4,
  className = "",
  id,
  required = false,
  ...props
}) => {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="bg-white px-1 text-[11px] font-semibold text-gray-500">
          {label.toUpperCase()}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600 ${className}`}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Textarea;
