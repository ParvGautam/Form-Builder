import React, { useState } from "react";
import FieldEditor from "./FieldEditor";
import FieldList from "./FieldList";
import FormPreview from "./FormPreview";

const generateJsonSchema = (fields) => {
  return {
    type: "object",
    properties: fields.reduce((acc, field, idx) => {
      const name = field.label + idx;
      let schema = {};
      if (field.type === "text") {
        schema.type = "string";
      } else if (field.type === "date") {
        schema.type = "string";
        schema.format = "date";
      } else if (field.type === "dropdown") {
        schema.type = "string";
        schema.enum = field.options || [];
      }
      if (field.required) {
        schema.required = true;
      }
      acc[name] = schema;
      return acc;
    }, {}),
  };
};

const FormBuilder = () => {
  const [fields, setFields] = useState([]);

  // Add a new field to the form
  const addField = (field) => {
    setFields([...fields, field]);
  };

  const jsonSchema = generateJsonSchema(fields);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FieldEditor addField={addField} />
          <FieldList fields={fields} />
        </div>
        <div>
          <FormPreview fields={fields} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Live JSON Schema</h2>
        <pre className="bg-gray-900 text-green-200 rounded p-4 overflow-x-auto text-xs">
          {JSON.stringify(jsonSchema, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FormBuilder; 