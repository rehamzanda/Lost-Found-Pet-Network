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
  }

  return (
    <form onSubmit={handleSubmit}>
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
      </label>

      <h1>Owner Information</h1>
      <label>
        <p>Name</p>
        <input type="text" value={ownerInfo.name} onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })} />
        <p>Email</p>
        <input type="text" value={ownerInfo.email} onChange={(e) => setOwnerInfo({ ...ownerInfo, email: e.target.value })} />
        <p>Contact</p>
        <input type="text" value={ownerInfo.contact} onChange={(e) => setOwnerInfo({ ...ownerInfo, contact: e.target.value })} />
      </label>

      <h1>Location Information</h1>
      <label>
        <p>Address</p>
        <input type="text" value={locationInfo.address} onChange={(e) => setLocationInfo({ ...locationInfo, address: e.target.value })} />
        <p>City</p>
        <input type="text" value={locationInfo.city} onChange={(e) => setLocationInfo({ ...locationInfo, city: e.target.value })} />
        <p>State</p>
        <input type="text" value={locationInfo.state} onChange={(e) => setLocationInfo({ ...locationInfo, state: e.target.value })} />
        <p>Zip</p>
        <input type="text" value={locationInfo.zip} onChange={(e) => setLocationInfo({ ...locationInfo, zip: e.target.value })} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Edit;

