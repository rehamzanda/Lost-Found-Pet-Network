<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../Show/style.css";

const Edit = () => {
  const { id } = useParams(); // Get the pet ID from the URL parameters
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  const [petInfo, setPetInfo] = useState({
    name: "",
    species: "",
    age: "",
    description: "",
    image: null,
  });

  const [ownerInfo, setOwnerInfo] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [locationInfo, setLocationInfo] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pets /${id}`) // Fetch pet details by ID
      .then((response) => {
        console.log(response.data); // Check the response structure
        const petDetails = response.data.find((item) => item._id === id); // Use _id for MongoDB
        setPet(petDetails);
        setPetInfo({
          name: petDetails.name,
          species: petDetails.species,
          age: petDetails.age,
          description: petDetails.description,
          image: petDetails.image,
        });
        setOwnerInfo({
          name: petDetails.ownerName,
          email: petDetails.ownerEmail,
          contact: petDetails.ownerContact,
        });
        setLocationInfo({
          address: petDetails.address,
          city: petDetails.city,
          state: petDetails.state,
          zip: petDetails.zip,
        });
      })
      .catch((error) => console.error("Error fetching pet data:", error));
  }, [id]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`/api/pets/${id}`, {
        name: petInfo.name,
        species: petInfo.species,
        age: petInfo.age,
        description: petInfo.description,
        image: petInfo.image,
        ownerName: ownerInfo.name,
        ownerEmail: ownerInfo.email,
        ownerContact: ownerInfo.contact,
        address: locationInfo.address,
        city: locationInfo.city,
        state: locationInfo.state,
        zip: locationInfo.zip,
      })
      .then((response) => {
        console.log("Pet updated successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
      });
=======
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './../Found/style.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [petInfo, setPetInfo] = useState({
    name: '',
    species: '',
    status: '',
    age: '',
    description: '',
    image: null,
    existingImage: ''
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
        const petData = response.data;
        
        setPetInfo({
          name: petData.name,
          species: petData.species || petData.type || '',
          status: petData.status || 'Found',
          age: petData.age,
          description: petData.description,
          image: null,
          existingImage: petData.image
        });

        if (petData.owner) {
          setOwnerInfo({
            ownerName: petData.owner.name || '',
            ownerEmail: petData.owner.email || '',
            ownerContact: petData.owner.contact || ''
          });
        }

        if (petData.location) {
          setLocationInfo({
            address: petData.location.address || '',
            city: petData.location.city || '',
            state: petData.location.state || '',
            zip: petData.location.zip || ''
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPetData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    
    // Append pet info
    formData.append('name', petInfo.name);
    formData.append('species', petInfo.species);
    formData.append('status', petInfo.status);
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
      await axios.put(`http://localhost:5000/api/pets/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/`);
    } catch (error) {
      console.error('There was an error updating the pet!', error);
      setError(error.response?.data?.error || 'Failed to update pet');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading pet details...</p>;
  }

  if (error) {
    return <p>Error loading pet details: {error}</p>;
>>>>>>> Feature-Kareem
  }

  return (
    <form onSubmit={handleSubmit}>
<<<<<<< HEAD
      <Link to={`/`}><a href='/#' className="back">Back</a></Link>
      <h1>Report a Found Pet</h1>
      <label>
        <p>Pet Name</p>
        <input type="text" value={petInfo.name} onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })} />
        <p>Species</p>
          <select value={petInfo.species} onChange={(e) => setPetInfo({ ...petInfo, species: e.target.value })}> 
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        <p>Age</p>
        <input type="text" value={petInfo.age} onChange={(e) => setPetInfo({ ...petInfo, age: e.target.value })} />
        <p>Description</p>
        <input type="text" value={petInfo.description} onChange={(e) => setPetInfo({ ...petInfo, description: e.target.value })} />
        <p>Image</p>
        <input type="file" onChange={(e) => setPetInfo({ ...petInfo, image: e.target.files[0] })} />
=======
      <Link to={`/`} className="back">Back</Link>
      <h1>Edit Pet Information</h1>
      
      {error && <div className="error-message">{error}</div>}

      <div className="image-preview">
        {petInfo.existingImage && !petInfo.image && (
          <img 
            src={`http://localhost:5000/${petInfo.existingImage}`} 
            alt="Current pet" 
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        )}
        {petInfo.image && (
          <img 
            src={URL.createObjectURL(petInfo.image)} 
            alt="New pet preview" 
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        )}
      </div>

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
      </label>

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
        <p>Update Image</p>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setPetInfo({ ...petInfo, image: e.target.files[0] })}
        />
>>>>>>> Feature-Kareem
      </label>

      <h1>Owner Information</h1>
      <label>
        <p>Name</p>
<<<<<<< HEAD
        <input type="text" value={ownerInfo.name} onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })} />
        <p>Email</p>
        <input type="text" value={ownerInfo.email} onChange={(e) => setOwnerInfo({ ...ownerInfo, email: e.target.value })} />
        <p>Contact</p>
        <input type="text" value={ownerInfo.contact} onChange={(e) => setOwnerInfo({ ...ownerInfo, contact: e.target.value })} />
=======
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
>>>>>>> Feature-Kareem
      </label>

      <h1>Location Information</h1>
      <label>
        <p>Address</p>
<<<<<<< HEAD
        <input type="text" value={locationInfo.address} onChange={(e) => setLocationInfo({ ...locationInfo, address: e.target.value })} />
        <p>City</p>
        <input type="text" value={locationInfo.city} onChange={(e) => setLocationInfo({ ...locationInfo, city: e.target.value })} />
        <p>State</p>
        <input type="text" value={locationInfo.state} onChange={(e) => setLocationInfo({ ...locationInfo, state: e.target.value })} />
        <p>Zip</p>
        <input type="text" value={locationInfo.zip} onChange={(e) => setLocationInfo({ ...locationInfo, zip: e.target.value })} />
      </label>

      <button type="submit">Submit</button>
=======
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
        {isSubmitting ? 'Updating...' : 'Update'}
      </button>
>>>>>>> Feature-Kareem
    </form>
  );
};

<<<<<<< HEAD
export default Edit;

=======
export default Edit;
>>>>>>> Feature-Kareem
