import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../Show/style.css";

const Show = () => {
  const { id } = useParams(); // Get the pet ID from the URL parameters
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`/pets/${id}`) // Fetch pet details by ID
      .then((response) => {
        console.log(response.data); // Check the response structure
        const petDetails = response.data.find((item) => item._id === id); // Use _id for MongoDB
        setPet(petDetails);
      })
      .catch((error) => console.error("Error fetching pet data:", error));
  }, [id]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

  return (
    <div className="pet-details-container">
      <h1>Pet Details</h1>
      <div className="pet-details">
        <img src={pet.image} alt={pet.name} />
        <div className="pet-details-info">
        <h2>{pet.name}</h2>
        <p>{pet.description}</p>
        <p>Type: {pet.type}</p>
        <p>Status: {pet.status}</p>
        <p>Age: {pet.age}</p>
        <p>Location: {pet.location.address}, {pet.location.city}, {pet.location.state}, {pet.location.zip}</p>
        <p>Owner: {pet.owner.name}, {pet.owner.email}, {pet.owner.contact}</p>
        </div>
        <Link to={`/`}><button>Done</button></Link>
      </div>
    </div>
  );
};

export default Show;
