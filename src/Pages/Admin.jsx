import React, { useEffect, useState } from "react";

const Admin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError("Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Submissions</h2>
        <button className="cta-button" onClick={load}>Refresh</button>
      </div>
      {loading && <p className="admin-status">Loading...</p>}
      {error && <p className="admin-error">{error}</p>}
      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Track</th>
              <th>Source</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) => (
              <tr key={x._id || x.id}>
                <td>{new Date(x.createdAt).toLocaleString()}</td>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td>{x.phone}</td>
                <td>{x.track}</td>
                <td>{x.source}</td>
                <td>{x.message}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="admin-status">No submissions yet</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
