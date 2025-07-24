import React, { useEffect, useState } from "react";

const FormSummary = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:4000/api/responses");
        if (!res.ok) throw new Error("Failed to fetch responses");
        const data = await res.json();
        setResponses(data.responses || []);
      } catch {
        setError("Failed to fetch responses");
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, []);

  const total = responses.length;
  const lastSubmitted =
    responses.length > 0
      ? new Date(responses[0].submittedAt).toLocaleString()
      : "N/A";

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Form Summary</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-4">
            <span className="font-semibold">Total Responses:</span> {total}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Last Submitted At:</span> {lastSubmitted}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recent Responses</h3>
            {responses.length === 0 ? (
              <div className="text-gray-400">No responses yet.</div>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {responses.map((resp, idx) => (
                  <li key={resp._id || idx} className="p-3 bg-gray-100 rounded">
                    <div className="text-xs text-gray-500 mb-1">
                      Submitted: {new Date(resp.submittedAt).toLocaleString()}
                    </div>
                    <pre className="text-xs bg-gray-900 text-green-200 rounded p-2 overflow-x-auto">
                      {JSON.stringify(resp.answers, null, 2)}
                    </pre>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FormSummary; 