import React, { useContext } from 'react'
import { doc, updateDoc} from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../context/auth'
// import { updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'

const Navbar = () => {

  const { user }= useContext(AuthContext);
  const navigate= useNavigate();

  const handleSignout = async () => {
    // update user doc = set online property to false then move to login screen
    // update doc
    await updateDoc(doc(db, 'users', user.uid), 
    {isOnline: false, }
    );

    // logout
    await signOut(auth)
    // navigate to login
    navigate("/auth/login");


  }

  return (

    <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top shadow-sn">
  <div className="container">
    <Link className="navbar-brand" to="/">Ads Network</Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

       { user ? (
          <>

        <li className="nav-item">
          <Link className="nav-link" to="/chat">Chat</Link>
        </li>


          <li className="nav-item">
          <Link className="nav-link" to={`/profile/${user.uid}`}>Profile</Link>
        </li>

        

        <li className="nav-item">
          <Link className="nav-link" to={`/sell`}>Sell</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/favorites`}>My Favorites</Link>
        </li>

          <button className='btn btn-danger btn-sm' onClick={handleSignout}>LOG OUT</button>
          </>
       ) : (
          <> 
          <li className="nav-item">
          <Link className="nav-link" to="/auth/register">Register</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/auth/login">Login</Link>
        </li>
        </>


       )}    
        
        
      </ul>
    
    </div>
  </div>
</nav>
  )
}

export default Navbar