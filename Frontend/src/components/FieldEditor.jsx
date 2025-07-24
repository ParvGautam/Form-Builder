import React, { useState } from "react";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "date", label: "Date" },
  { value: "dropdown", label: "Dropdown" },
];

const FieldEditor = ({ addField }) => {
  const [type, setType] = useState("text");
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState("");
  const [required, setRequired] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    const field = { type, label, required };
    if (type === "dropdown") {
      field.options = options.split(",").map((opt) => opt.trim()).filter(Boolean);
    }
    addField(field);
    setLabel("");
    setOptions("");
    setType("text");
    setRequired(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Field Label</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Field Type</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {FIELD_TYPES.map((ft) => (
            <option key={ft.value} value={ft.value}>{ft.label}</option>
          ))}
        </select>
      </div>
      {type === "dropdown" && (
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Dropdown Options (comma separated)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="Option1, Option2, Option3"
          />
        </div>
      )}
      <div className="mb-2 flex items-center">
        <input
          id="required"
          type="checkbox"
          className="mr-2"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
        />
        <label htmlFor="required" className="text-sm">Required</label>
      </div>
      <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Field</button>
    </form>
  );
};

export default FieldEditor; 