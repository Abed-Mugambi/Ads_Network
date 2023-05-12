import React, {useState} from 'react';
// import firebaseConfig from '../../firebaseConfig'
import {auth } from "../../firebaseConfig";
import { sendPasswordResetEmail} from 'firebase/auth';
// import { doc, updateDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';




const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError]= useState('');
  const [success, setSuccess]= useState(false);




   const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email ){
        setError("Email is required");

      return;

    }

    setError("");
    setSuccess(false);
   

    try{
       await sendPasswordResetEmail(auth, email) 
       setSuccess(true);
       setEmail("");

          
    }catch (error) {
      setError(error.message);

    }
   };



  return (
    <form className='shadow rounded p-3 mt-5 form' onSubmit={handleSubmit}>
      <h3 className='text-center mb-3'>Forgot Password</h3>

      {success ? (
        <p className='text-center mt-5'>
            An email has been sent containing password reset instructions
        </p>
      ) : (
        <>
        
        <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
         type='email' 
         className='form-control'
        name='email'
        value={email}
         onChange={(e) => setEmail(e.target.value)} />
      </div>


      {error ? <p className='text-center text-danger'>{error}</p>: null}
      <div className='text-center mb-3'>
        <button className='btn btn-secondary btn-sm'>SEND
        </button>
      </div>
        
        </>
      )}
    
    </form>
  );
};

export default ForgotPassword;