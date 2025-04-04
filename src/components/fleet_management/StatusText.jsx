import { Icon } from "@iconify/react/dist/iconify.js";

const StatusText = ({ text, textClassName = "" }) => {
  const scheme = (status) => {
    const lowerStatus = status.toLowerCase();

    if (
      [
        "completed",
        "closed",
        "success",
        "successful",
        "active",
        "transferred",
        "paid",
        "delivered",
        "approved",
        "booked",
        "on-time",
        "actioned",
        "yes",
      ].includes(lowerStatus)
    ) {
      return {
        icon: "ic:round-check-circle",
        color: "text-green-500 bg-green-200/10 border-green-500",
      };
    }

    if (
      [
        "cancelled",
        "failed",
        "inactive",
        "returned",
        "return",
        "rejected",
        "overdue",
        "late",
        "failure",
      ].includes(lowerStatus)
    ) {
      return {
        icon: "jam:close-circle-f",
        color: "text-red-500 bg-red-200/10 border-red-500",
      };
    }

    if (
      [
        "commented",
        "Picked Up",
        "in_progress",
        "partly paid",
        "Halfway there",
        "partially ordered",
        "no",
        "submitted",
      ].includes(lowerStatus)
    ) {
      return {
        icon: "ic:round-check-circle",
        color: "text-sky-500 bg-sky-200/10 border-sky-500",
      };
    }

    return {
      icon: "ph:warning-circle-fill",
      color: "text-amber-500 bg-amber-200/10 border-amber-500",
    };
  };

  return text ? (
    <div
      className={`flex flex-row gap-x-1 items-center ${
        scheme(text).color
      } pl-2 pr-4 rounded-full w-fit h-fit capitalize`}
    >
      <Icon icon={scheme(text).icon} />
      <p className={textClassName}>{String(text).replaceAll("_", " ")}</p>
    </div>
  ) : (
    <p>-</p>
  );
};

export default StatusText;
