import React from "react";

/**
 * DashboardNavButton - A reusable navigation button for the dashboard sidebar/topbar.
 *
 * Props:
 * - icon: JSX.Element (icon to display)
 * - label: string (button label)
 * - active: boolean (active state for styling)
 * - onClick: function (click handler)
 */
export default function DashboardNavButton({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-md  flex items-center transition-colors duration-200 font-medium    shadow-sm ${
        active
          ? "bg-[#54BB74]  text-[#1e1e1e] font-medium"
          : "bg-[#333333] text-white hover:bg-[#444444]"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {icon && React.cloneElement(icon, { className: (icon.props.className || "") + " mr-2 text-lg" })}
      {label}
    </button>
  );
}
