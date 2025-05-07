import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
<<<<<<< HEAD
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

=======
import axios from "axios";
import "./../Show/style.css";

const Show = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pets/${id}`)
      .then((response) => {
        setPet(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading pet details...</p>;
  }

  if (error) {
    return <p>Error loading pet details: {error.message}</p>;
  }

  if (!pet) {
    return <p>No pet found with that ID.</p>;
  }

>>>>>>> Feature-Kareem
  return (
    <div className="pet-details-container">
      <h1>Pet Details</h1>
      <div className="pet-details">
<<<<<<< HEAD
        <img src={pet.image} alt={pet.name} />
        <div className="pet-details-info">
        <h2>{pet.name}</h2>
        <p>{pet.description}</p>
        <p>Type: {pet.type}</p>
        <p>Status: {pet.status}</p>
        <p>Age: {pet.age}</p>
        <p>Location: {pet.location.address}, {pet.location.city}, {pet.location.state}, {pet.location.zip}</p>
        <p>Owner: {pet.owner.name}, {pet.owner.email}, {pet.owner.contact}</p>
=======
      <img src={`http://localhost:5000/${pet.image}`} alt={pet.name} />
        <div className="pet-details-info">
          <h2>{pet.name}</h2>
          <p>{pet.description}</p>
          <p>Species: {pet.species || pet.type}</p> {/* Handle both field names */}
          <p>Status: {pet.status}</p>
          <p>Age: {pet.age}</p>
          {pet.location && (
            <p>Location: {pet.location.address}, {pet.location.city}, {pet.location.state}, {pet.location.zip}</p>
          )}
          {pet.owner && (
            <p>Owner: {pet.owner.name}, {pet.owner.email}, {pet.owner.contact}</p>
          )}
>>>>>>> Feature-Kareem
        </div>
        <Link to={`/`}><button>Done</button></Link>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Show;
=======
export default Show;
>>>>>>> Feature-Kareem
