import React from 'react'
import './home.css'
import HomeImg from '../../assets/images/home.webp'
import ToyImg from '../../assets/images/toy.webp'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="home-container">
      <div className='home-toy-container'> 
        <img src={ToyImg} alt="Toy" className='home-toy-image' />
      </div>
     

      <div className='home-content'>
         <div className='home-text-container'>
          <h1>Welcome to Platos</h1>
          <p>Convert your excel files to text files easily and quickly.</p>
            
          <div className='home-buttons-container'>
            <Link to="/vendor" className='home-button'>Vendor</Link>
            <Link to="/salary" className='home-button'>Salary</Link>
          </div>
        </div>
        <div className='home-image-container'>
          <img src={HomeImg} alt="Home"  className='home-image'/>
          </div>
       
      </div>
    </div>
  )
}

export default Home