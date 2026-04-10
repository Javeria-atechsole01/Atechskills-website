import React, { useState } from "react";

const EnrollModal = ({ open, onClose, track, source }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:4000/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, track, source }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Quick {source === "join" ? "Join" : "Enroll"} — {track}</h3>
        <form onSubmit={submit} className="modal-form">
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <textarea name="message" placeholder="Message (optional)" value={form.message} onChange={handleChange} />
          <div className="modal-actions">
            <button type="button" className="modal-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-primary" disabled={status === "loading"}>
              {status === "loading" ? "Submitting..." : source === "join" ? "Join Now" : "Enroll Now"}
            </button>
          </div>
          {status === "success" && <p className="modal-success">Submitted! We will contact you soon.</p>}
          {status === "error" && <p className="modal-error">Something went wrong. Try again.</p>}
        </form>
      </div>
    </div>
  );
};

export default EnrollModal;
