import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/Home.scss';

const featuredStores = [
  { id: 1, name: 'Paws & Whiskers', category: 'Grooming', city: 'Tel Aviv', image: 'https://via.placeholder.com/300x200?text=Store+1' },
  { id: 2, name: 'Happy Tails', category: 'Food & Toys', city: 'Haifa', image: 'https://via.placeholder.com/300x200?text=Store+2' },
  { id: 3, name: 'Furry Friends', category: 'Accessories', city: 'Jerusalem', image: 'https://via.placeholder.com/300x200?text=Store+3' },
];

export default function Home() {
  return (
    <>

<header><img src="./assets/logo.png" alt="logo" /></header>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            
          </div>
          <div className="nav-links">
            <button>Home</button>
            <button>Shop by Pet</button>
            <button>Stores</button>
            <button>Learning</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1>Welcome to PetStore</h1>
          <p>Your one-stop shop for all your pet needs—food, toys, grooming, and more.</p>
          <Link to="/stores" className="btn">Browse Stores</Link>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="featured-stores">
        <div className="container">
          <h2>Featured Stores</h2>
          <div className="stores-grid">
            {featuredStores.map(store => (
              <div key={store.id} className="store-card">
                <img src={store.image} alt={store.name} />
                <div className="card-content">
                  <h3>{store.name}</h3>
                  <div className="meta">
                    <span>{store.category}</span>
                    <span>{store.city}</span>
                  </div>
                  <Link to={`/stores/${store.id}`} className="btn">Visit Store</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} PetStore. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
