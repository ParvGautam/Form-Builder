import React from "react";

const FieldList = ({ fields }) => {
  if (!fields.length) return <div className="text-gray-400">No fields added yet.</div>;
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Fields</h2>
      <ul className="space-y-2">
        {fields.map((field, idx) => (
          <li key={idx} className="p-3 bg-gray-100 rounded flex flex-col">
            <span className="font-medium">{field.label}</span>
            <span className="text-xs text-gray-500">Type: {field.type}</span>
            {field.type === "dropdown" && field.options && (
              <span className="text-xs text-gray-500">Options: {field.options.join(", ")}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FieldList; 