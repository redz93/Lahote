import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Snow from './Snow';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const nav = useNavigate();
  const search = (e) => { e.preventDefault(); nav('/creations?q=' + encodeURIComponent(new FormData(e.target).get('q'))); setOpen(false); };
  return (
    <>
      <Snow />
      <a className="skip" href="#main">Aller au contenu</a>
      <div className="promo">Noël approche : offrez un souvenir qui s'allume ✨</div>
      <header className="header">
        <Link to="/" className="logo">LAHOTE</Link>
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        <nav className={'nav' + (open ? ' open' : '')} onClick={() => setOpen(false)}>
          <NavLink to="/creations">Nos créations</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <form className="search" role="search" onSubmit={search}>
          <input name="q" type="search" placeholder="Rechercher" aria-label="Rechercher" />
        </form>
        <Link to="/panier" className="cartlink">Panier ({cart?.totalQuantity ?? 0})</Link>
      </header>
      <main id="main"><Outlet /></main>
      <footer className="footer">
        <div><strong className="logo">LAHOTE</strong><p>Vos souvenirs méritent leur lumière.</p></div>
        <div>
          <Link to="/pages/mentions-legales">Mentions légales</Link>
          <Link to="/pages/cgv">Conditions générales de vente</Link>
          <Link to="/pages/confidentialite">Politique de confidentialité</Link>
          <Link to="/pages/livraison">Livraison et retours</Link>
        </div>
        <small>© {new Date().getFullYear()} LAHOTE</small>
      </footer>
    </>
  );
}
