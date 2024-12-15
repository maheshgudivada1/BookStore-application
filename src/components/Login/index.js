import React, { useState } from 'react';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const onChange = (event) => {
    const { id, value } = event.target;
    if (id === 'username') setUsername(value);
    if (id === 'password') setPassword(value);
    if (id === 'email') setEmail(value);
  };

  const onSubmitSuccess = () => {
    setShowPopup(true); 
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitLoginForm = (event) => {
    event.preventDefault();

    if (username === 'mahesh' && password === 'mahi') {
      onSubmitSuccess();
    } else {
      onSubmitFailure('Invalid username or password');
    }
  };

  const submitRegistrationForm = (event) => {
    event.preventDefault();

    if (username && password && email) {
      onSubmitSuccess();
    } else {
      onSubmitFailure('Registration failed. Please provide valid data.');
    }
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
    setShowSubmitError(false);
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChange}
        placeholder="Password"
      />
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={onChange}
        placeholder="Username"
      />
    </>
  );

  const renderEmailField = () => (
    <>
      <label className="input-label" htmlFor="email">
        EMAIL
      </label>
      <input
        type="email"
        id="email"
        className="username-input-field"
        value={email}
        onChange={onChange}
        placeholder="Email"
      />
    </>
  );

  return (
    <div className="login-form-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-BQ4NFk9z5xZtWcRf7sfx1vgTLUa4XbP-gg&s"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://futurevisioncomputers.com/wp-content/uploads/2021/12/book-designing-classes-indesign-course-surat.jpg"
        className="login-img"
        alt="website login"
      />
      <form
        className="form-container"
        onSubmit={isLogin ? submitLoginForm : submitRegistrationForm}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-BQ4NFk9z5xZtWcRf7sfx1vgTLUa4XbP-gg&s"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        {!isLogin && <div className="input-container">{renderEmailField()}</div>}
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
        {isLogin ? (
          <>
            <p className="note">Note: Username:mahesh & Password:mahi</p>
            <p className="toggle-form" onClick={toggleForm}>
              Don't have an account? Register here
            </p>
          </>
        ) : (
          <p className="toggle-form" onClick={toggleForm}>
            Already have an account? Login here
          </p>
        )}
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Success! You have logged in or registered successfully.</p>
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
