import React, { useState } from 'react';
// Step 1 - Task 1: Import urlConfig
import { urlConfig } from '../../config';
// Step 1 - Task 2: Import useAppContext
import { useAppContext } from '../../context/AuthContext';
// Step 1 - Task 3: Import useNavigate
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Step 1 - Task 4: State for error messages
  const [showerr, setShowerr] = useState('');

  // Step 1 - Task 5: Local vars
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        // Step 1 - Task 6
        method: 'POST',
        // Step 1 - Task 7
        headers: {
          'content-type': 'application/json',
        },
        // Step 1 - Task 8
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      // Step 2 - Task 1: Parse JSON response
      const json = await response.json();
      console.log('json data', json);

      // Step 2 - Task 2: If registration successful, save user data
      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', firstName);
        sessionStorage.setItem('email', json.email);
        // Step 2 - Task 3: Set logged in state
        setIsLoggedIn(true);
        // Step 2 - Task 4: Navigate to MainPage
        navigate('/app');
      }

      // Step 2 - Task 5: Handle registration error
      if (json.error) {
        setShowerr(json.error);
      }
    } catch (e) {
      console.error("Error fetching details: " + e.message);
      setShowerr("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleRegister}>Register</button>

      {/* Step 2 - Task 6: Show error message */}
      <div className="text-danger">{showerr}</div>
    </div>
  );
}

export default RegisterPage;
