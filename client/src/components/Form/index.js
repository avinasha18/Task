// Form.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import styles from './Form.module.css';

const Form = () => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [countryCode, setCountryCode] = useState(localStorage.getItem('countryCode') || '');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCountries(['+1', '+91', '+44']); 
  }, []);

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('countryCode', countryCode);
    localStorage.setItem('phoneNumber', phoneNumber);
  }, [name, countryCode, phoneNumber]);

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(name)) {
      newErrors.name = 'Name should contain only alphabetic characters';
    }

    if (!countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number should contain only numeric characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      formType: type,
      name,
      countryCode,
      phoneNumber,
    };

    try {
      await axios.post('http://localhost:5000/api/forms', formData);
      alert('Form submitted successfully');
      localStorage.clear();
      navigate('/data')
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className={styles.container}>
      <h2>{`Form ${type}`}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.input} ${errors.name && styles.error}`}
            required
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="countryCode">Country Code:</label>
          <select
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className={`${styles.input} ${errors.countryCode && styles.error}`}
            required
          >
            <option value="">Select</option>
            {countries.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          {errors.countryCode && <p className={styles.errorMessage}>{errors.countryCode}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`${styles.input} ${errors.phoneNumber && styles.error}`}
            required
          />
          {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form
