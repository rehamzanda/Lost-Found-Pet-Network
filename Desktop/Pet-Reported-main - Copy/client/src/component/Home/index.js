import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../Home/style.css";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reportedPets, setReportedPets] = useState([]);

  useEffect(() => {
    fetch("/js/data.json")
      .then((response) => response.json())
      .then((data) => {
        setReportedPets(data.pet);
      })
      .catch((error) => console.error("Error fetching pet data:", error));
  }, []);

  const filteredPets = reportedPets.filter((pet) => {
    const matchesType = filterType === "All" || pet.type === filterType;
    const matchesStatus = statusFilter === "All" || pet.status === statusFilter;
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const PetList = filteredPets.map((pet) => (
    <li className="reported-box" key={pet.id}>
      <div className="info-box">{pet.name}</div>
      <div className="box-img">
        <img src={pet.image} alt={pet.name} />
      </div>
      <div className="info-pet">
        <p>{pet.description}</p>
        <p>Type: {pet.type}</p>
        <p>Status: {pet.status}</p>
      </div>
      <Link to={`/Show/${pet.id}`}><button className="show-btn"	>Show</button></Link>
      <Link to={`/Edit/${pet.id}`}><button className="edit-btn">Edit</button></Link>
      <Link to={`/Delete/${pet.id}`}><button className="delete-btn">Delete</button></Link>
    </li>
  ));

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

  return (
    <div className="container">
      <div className="container-nav">
      <h1>Pets Home Page</h1>
      <div className="report-btn">
        <button onClick={() => handleReportButtonClick("Found")}>
          <Link to="/Found">Report a Found or Lost Pet</Link>
        </button>
      </div>
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

