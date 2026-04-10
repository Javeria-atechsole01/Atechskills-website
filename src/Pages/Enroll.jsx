import React, { useState } from "react";
import "./Enroll.css";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    gender: "",
    address: "",
    region: "",
    cnic: "",
    whatsapp: "",
    facebook: "",
    qualification: "",
    status: "",
    age: "",
    hearAbout: "",
    acceptTerms: false,
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="form-container">
      <img src="https://techskills.com/cdn/shop/files/Social_Sharing_Image.svg?v=1762201840" alt="ATechSkills" />
      <h2>DEVSECAI Bootcamp Application - Development | Security | AI</h2>
      <p>Please use your real details from your CNIC. Do not use false information.<br />
        اس سیکشن میں اپنی درست معلومات درج کریں</p>
      <form onSubmit={handleSubmit}>
        <label>Email *</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
        />

        <label>Full Name (As per CNIC) *</label>
        <input
          type="text"
          name="fullName"
          required
          onChange={handleChange}
        />

        <label>Gender *</label>
        <div className="radio-group">
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
        </div>

        <label>Full Address *</label>
        <textarea name="address" required onChange={handleChange}></textarea>

        <label>Select Region *</label>
        <select name="region" required onChange={handleChange}>
          <option value="">-- Choose --</option>
          <option>Lahore</option>
          <option>Karachi</option>
          <option>Islamabad</option>
          <option>Peshawar</option>
          <option>Hyderabad</option>
          <option>Quetta</option>
          <option>Sargodha</option>
          <option>Okara</option>
          <option>Dera Ghazi khan</option>
          <option>Kasur</option>
          <option>Sialkot</option>
          <option>Sahiwal</option>
          <option>taunsa</option>
          <option>Jang Saddar</option>
          <option>Sheikupura</option>
          <option>Gujrat</option>
          <option>Dubai</option>
          <option>India</option>
          <option>Europe</option>
          <option>Saudi Arabia</option>
          <option>Rest of the World</option>
        </select>

        <label>CNIC Number *</label>

        <input type="text" name="cnic" required onChange={handleChange} />

        <label>WhatsApp No *</label>
        <input type="text" name="whatsapp" required onChange={handleChange} />

        <label>Facebook Profile *</label>
        <input type="text" name="facebook" required onChange={handleChange} />

        <label>Qualification *</label>
        <select name="qualification" required onChange={handleChange}>
          <option value="">-- Select --</option>
          <option>Matric</option>
          <option>Intermediate</option>
          <option>Bachelor</option>
          <option>Master</option>
        </select>

        <label>Current Status *</label>
        <select name="status" required onChange={handleChange}>
          <option value="">-- Select --</option>
          <option>New to online world</option>
          <option>Freelancer</option>
          <option>Blogger</option>
          <option>office Job</option>
          <option>online Job</option>
          <option>Other</option>
        </select>

        <label>Age *</label>
        <select name="age" required onChange={handleChange}>
          <option value="">-- Select Age --</option>
          <option>18–25</option>
          <option>26–35</option>
          <option>36–45</option>
          <option>46–55</option>
          <option>56–65</option>
        </select>

        <label>How did you hear about us? *</label>
        <select name="hearAbout" required onChange={handleChange}>
          <option value="">-- Select --</option>
          <option>Facebook</option>
          <option>WhatsApp</option>
          <option>Friend</option>
          <option>Other</option>
        </select>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="acceptTerms" onChange={handleChange} required />
            Do you accept the Terms & Conditions?
          </label>
        </div>

        <label>Remarks (Optional)</label>
        <textarea name="remarks" onChange={handleChange}></textarea>

        <button type="submit" className="submitt-btn">Submit</button>
      </form>
    </div>
  );
}

