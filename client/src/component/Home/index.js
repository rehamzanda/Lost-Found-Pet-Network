import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../Home/style.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [reportedPets, setReportedPets] = useState([]);

  useEffect(() => {
    // Fetch reported pets from the server
    axios.get('/api/pets')
      .then(response => {
        setReportedPets(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the pets!', error);
      });
  }, [deleteId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleReportButtonClick = (status) => {
    console.log(`Report ${status} button clicked`);
  };

  const handleEdit = (id) => {
    console.log(`Edit button clicked for pet with id: ${id}`);
  };

  const handleShow = (id) => {
    console.log(`Show button clicked for pet with id: ${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`/delete/${id}`)
      .then(() => {
        setDeleteId(id);
        console.log(`Pet with id: ${id} deleted`);
      })
      .catch((error) => {
        console.error('There was an error deleting the pet!', error);
      });
  };

  const filteredPets = reportedPets.filter((pet) => {
    const matchesType = filterType === "All" || pet.species.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = statusFilter === "All" || pet.status === statusFilter;
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const PetList = filteredPets.map((pet) => (
    <li className="reported-box" key={pet._id}>
      <div className="info-box">{pet.name}</div>
      <div className="box-img">
        <img src={pet.image} alt={pet.name} />
      </div>
      <div className="info-pet">
        <p>{pet.description}</p>
        <p>Species: {pet.species}</p>
        <p>Status: {pet.status}</p>
      </div>
      <Link to={`/Show/${pet._id}`}><button className="show-btn" onClick={() => handleShow(pet._id)}>Show</button></Link>
      <Link to={`/Edit/${pet._id}`}><button className="edit-btn" onClick={() => handleEdit(pet._id)}>Edit</button></Link>
      <button className="delete-btn" onClick={() => handleDelete(pet._id)}>Delete</button>
    </li>
  ));

  return (
    <div className="container">
      <h1>Pets Home Page</h1>
      <div className="report-btn">
        <button onClick={() => handleReportButtonClick("Lost")}>
          <Link to="/Lost">Report a Lost Pet</Link>
        </button>
        <button onClick={() => handleReportButtonClick("Found")}>
          <Link to="/Found">Report a Found Pet</Link>
        </button>
      </div>
      <div className="find-container">
        <div className="search-container">
          <h3>Find Pets</h3>
          <input
            type="text"
            placeholder="Search pets by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="All">All Types</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="All">All Statuses</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>
      </div>
      <div className="reported-container">
        <h2>Reported Pets</h2>
        {filteredPets.length > 0 ? (
          <ul>{PetList}</ul>
        ) : (
          <p>No pets match the current criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;