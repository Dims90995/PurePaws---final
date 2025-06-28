import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import './scss/App.css';

export default function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    async function loadPets() {
      try {
        const res = await fetch(`${API}/pets`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setPets(data);
      } catch (err) {
        console.error('Failed to fetch pets:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPets();
  }, [API]);

  if (loading) return <div className="loading">Loading pets…</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home pets={pets} />} />
      </Routes>
    </Router>
  );
}
