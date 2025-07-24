import React, { useState } from "react";

const validateField = (field, value) => {
  if (field.required && !value) {
    return "This field is required.";
  }
  if (field.type === "text" && field.format === "email") {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return "Invalid email format.";
    }
  }
  return null;
};

const FormPreview = ({ fields }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // success or error

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    fields.forEach((field, idx) => {
      const name = field.label + idx;
      const error = validateField(field, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    setSubmitted(true);
    if (Object.keys(newErrors).length === 0) {
      
      try {
        setSubmitStatus(null);
        const response = await fetch("http://localhost:4000/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formId: null, 
            answers: values,
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!response.ok) throw new Error("Failed to submit");
        setSubmitStatus("success");
        setValues({});
      } catch {
        setSubmitStatus("error");
      }
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Form Preview</h2>
      {fields.length === 0 ? (
        <div className="text-gray-400">No fields to preview.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {fields.map((field, idx) => {
            const name = field.label + idx;
            return (
              <div key={idx} className="mb-4">
                <label className="block mb-1 font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === "text" && (
                  <input
                    type={field.format === "email" ? "email" : "text"}
                    className={`w-full border rounded px-3 py-2 ${errors[name] ? "border-red-500" : ""}`}
                    value={values[name] || ""}
                    onChange={(e) => handleChange(name, e.target.value)}
                  />
                )}
                {field.type === "date" && (
                  <input
                    type="date"
                    className={`w-full border rounded px-3 py-2 ${errors[name] ? "border-red-500" : ""}`}
                    value={values[name] || ""}
                    onChange={(e) => handleChange(name, e.target.value)}
                  />
                )}
                {field.type === "dropdown" && (
                  <select
                    className={`w-full border rounded px-3 py-2 ${errors[name] ? "border-red-500" : ""}`}
                    value={values[name] || ""}
                    onChange={(e) => handleChange(name, e.target.value)}
                  >
                    <option value="">Select...</option>
                    {field.options && field.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {errors[name] && (
                  <div className="text-red-500 text-xs mt-1">{errors[name]}</div>
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
          {submitted && Object.keys(errors).length === 0 && submitStatus === "success" && (
            <div className="text-green-600 mt-3">Form submitted and saved to backend!</div>
          )}
          {submitted && Object.keys(errors).length === 0 && submitStatus === "error" && (
            <div className="text-red-600 mt-3">Failed to submit form. Please try again.</div>
          )}
        </form>
      )}
    </div>
  );
};

export default FormPreview; 