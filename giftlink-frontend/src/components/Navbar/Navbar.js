import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Assuming you have an AuthContext for managing auth state

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is already logged in (check sessionStorage)
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(sessionUser).name); // Assuming user has a 'name' property
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');  // Clear session data
    setIsLoggedIn(false);  // Update context to reflect logout state
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">MyApp</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="welcome-message">Welcome, {username}!</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="register-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
