import React, { useState, useEffect } from 'react';
import './index.css';

function Navbar({ loggedIn, onLogout, theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div>MyApp</div>
      <div>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        {loggedIn && <button onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ username });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <Navbar
        loggedIn={!!user}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {user ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
