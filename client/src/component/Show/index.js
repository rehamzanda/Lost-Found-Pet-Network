import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../Show/style.css";

const Show = () => {
  const { id } = useParams(); // Get the pet ID from the URL parameters
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch("/js/data.json")
      .then((response) => response.json())
      .then((data) => {
        const petDetails = data.pet.find((item) => item.id === parseInt(id, 10));
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
