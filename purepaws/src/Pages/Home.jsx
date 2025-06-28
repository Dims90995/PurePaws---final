// purepaws/src/Pages/Home.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../scss/Home.scss';

function Home({ pets }) {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/" className="logo-text">PetStore</Link>
          </div>
          <div className="nav-links">
            <button>Home</button>
            <button>Shop by Pet</button>
            <button>Stores</button>
            <button>Learning</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content container">
          <h1>Welcome to PetStore</h1>
          <p>Your one-stop shop for all your pet needs—food, toys, grooming, and more.</p>
          <Link to="/stores" className="btn">Browse Stores</Link>
        </div>
      </section>

      {/* Dynamic Pets List */}
      <section className="pets-list">
        <div className="container">
          <h2>Our Pets</h2>
          {pets.length === 0 ? (
            <p>No pets available right now.</p>
          ) : (
            <div className="pets-grid">
              {pets.map(pet => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-image">
                    <img
                      src={pet.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={pet.name}
                    />
                  </div>
                  <div className="pet-details">
                    <h3>{pet.name}</h3>
                    <p className="species">{pet.species}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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

Home.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      name: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      imageUrl: PropTypes.string
    })
  )
};

Home.defaultProps = {
  pets: []
};

export default Home;
