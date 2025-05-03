import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Found = () => {
  const [petInfo, setPetInfo] = useState({
    name: '',
    species: '',
    age: '',
    description: '',
    image: null
  })

  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    email: '',
    contact: ''
  })

  const [locationInfo, setLocationInfo] = useState({
    address: '',
    city: '',
    state: '',
    zip: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post('/add-pet', {
      petInfo,
      ownerInfo,
      locationInfo
    })
    .then(response => {
      console.log('Pet reported successfully:', response.data)
      navigate('/')
      // Reset form fields
      setPetInfo({
        name: '',
        species: '',
        age: '',
        description: '',
        image: null
      })
      setOwnerInfo({
        name: '',
        email: '',
        contact: ''
      })
      setLocationInfo({
        address: '',
        city: '',
        state: '',
        zip: ''
      })
    })
    .catch(error => {
      console.error('There was an error reporting the pet!', error)
    })
    
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
  )
}

export default Found

