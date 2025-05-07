import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../Found/style.css';

const Found = () => {
  const [petInfo, setPetInfo] = useState({
    name: '',
    species: '',
    status: 'Found', // Default to 'found'
    age: '',
    description: '',
    image: null
  });

  const [ownerInfo, setOwnerInfo] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerContact: ''
  });

  const [locationInfo, setLocationInfo] = useState({
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    
    // Append pet info
    formData.append('name', petInfo.name);
    formData.append('species', petInfo.species);
    formData.append('status', petInfo.status); // Set status to 'found'
    formData.append('age', petInfo.age);
    formData.append('description', petInfo.description);
    if (petInfo.image) {
      formData.append('image', petInfo.image);
    }

    // Append owner info
    formData.append('ownerName', ownerInfo.ownerName);
    formData.append('ownerEmail', ownerInfo.ownerEmail);
    formData.append('ownerContact', ownerInfo.ownerContact);

    // Append location info
    formData.append('address', locationInfo.address);
    formData.append('city', locationInfo.city);
    formData.append('state', locationInfo.state);
    formData.append('zip', locationInfo.zip);

    try {
      const response = await axios.post('http://localhost:5000/api/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Pet reported successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('There was an error reporting the pet!', error);
      setError(error.response?.data?.error || 'Failed to report pet');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link to="/" className="back">Back</Link>
      <h1>Report a Found Pet</h1>
      
      {error && <div className="error-message">{error}</div>}

      <label>
        <p>Pet Name</p>
        <input 
          type="text" 
          value={petInfo.name} 
          onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })} 
          required
        />
      </label>

      <label>
        <p>Species</p>
        <select 
          name="species" 
          value={petInfo.species} 
          onChange={(e) => setPetInfo({ ...petInfo, species: e.target.value })}
          required
        >
          <option value="">-- Select --</option> 
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        <p>Status</p>
      </label>
      <select
        name="status"
        value={petInfo.status}
        onChange={(e) => setPetInfo({ ...petInfo, status: e.target.value })}
        required
      >
        <option value="Found">Found</option>
        <option value="Lost">Lost</option>
        <option value="Other">Other</option>
      </select>
      <label>
        <p>Age</p>
        <input 
          type="number" 
          value={petInfo.age} 
          onChange={(e) => setPetInfo({ ...petInfo, age: e.target.value })}
          required
        />
      </label>

      <label>
        <p>Description</p>
        <textarea 
          value={petInfo.description} 
          onChange={(e) => setPetInfo({ ...petInfo, description: e.target.value })}
          required
        />
      </label>

      <label>
        <p>Image</p>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setPetInfo({ ...petInfo, image: e.target.files[0] })}
        />
      </label>

      <h1>Owner Information</h1>
      <label>
        <p>Name</p>
        <input 
          type="text" 
          value={ownerInfo.ownerName} 
          onChange={(e) => setOwnerInfo({ ...ownerInfo, ownerName: e.target.value })}
          required
        />
      </label>

      <label>
        <p>Email</p>
        <input 
          type="email" 
          value={ownerInfo.ownerEmail} 
          onChange={(e) => setOwnerInfo({ ...ownerInfo, ownerEmail: e.target.value })}
          required
        />
      </label>

      <label>
        <p>Contact</p>
        <input 
          type="tel" 
          value={ownerInfo.ownerContact} 
          onChange={(e) => setOwnerInfo({ ...ownerInfo, ownerContact: e.target.value })}
          required
        />
      </label>

      <h1>Location Information</h1>
      <label>
        <p>Address</p>
        <input 
          type="text" 
          value={locationInfo.address} 
          onChange={(e) => setLocationInfo({ ...locationInfo, address: e.target.value })}
          required
        />
      </label>

      <label>
        <p>City</p>
        <input 
          type="text" 
          value={locationInfo.city} 
          onChange={(e) => setLocationInfo({ ...locationInfo, city: e.target.value })}
          required
        />
      </label>

      <label>
        <p>State</p>
        <input 
          type="text" 
          value={locationInfo.state} 
          onChange={(e) => setLocationInfo({ ...locationInfo, state: e.target.value })}
          required
        />
      </label>

      <label>
        <p>Zip</p>
        <input 
          type="text" 
          value={locationInfo.zip} 
          onChange={(e) => setLocationInfo({ ...locationInfo, zip: e.target.value })}
          required
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default Found;