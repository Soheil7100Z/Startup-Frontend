import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-h1">Die Zukunft der Technologie beginnt hier.</h1>
          <p>Entdecke hochwertige Elektronik für Arbeit, Gaming und Alltag.</p>
          <NavLink to="./products" className="hero-btn">
            Jetzt einkaufen
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default HomePage;
