import React from "react";

/**
 * HourSelector Dropdown (for testing dynamic theme system)
 * Props:
 *   hour (number): currently selected hour (0-23)
 *   onChange (function): callback with new hour
 */
export default function HourSelector({ hour, onChange }) {
  return (
    <div style={{ display: "inline-block", marginLeft: 8 }}>
      <label htmlFor="hour-select" style={{ fontSize: 14, marginRight: 4 }}>Hour:</label>
      <select
        id="hour-select"
        value={hour}
        onChange={e => onChange(Number(e.target.value))}
        style={{ padding: "2px 6px", borderRadius: 4, fontSize: 14 }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <option key={i} value={i}>{i.toString().padStart(2, "0")}:00</option>
        ))}
      </select>
    </div>
  );
}
