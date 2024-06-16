import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FormData.css'; 

const FormData = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forms');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="formDataContainer">
      <h2>Form Data</h2>
      <table className="formDataTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Country Code</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.form_type}</td>
              <td>{data.name}</td>
              <td>{data.country_code}</td>
              <td>{data.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" ><button className='button'>Home</button></Link>
      </div>
  );
};

export default FormData;
