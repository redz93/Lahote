import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../components/useProducts';

const steps = ['Choisissez votre lampe', 'Renseignez prénom, message et modèle', 'Nous préparons votre création'];
const perks = ['Cadeau personnalisé', 'Paiement sécurisé par Shopify', '[Avantage à compléter]'];
export default function Home() {
  const { products } = useProducts();
  return (
    <>
      <section className="hero">
        <img className="hero-img left" src="/hero-couple.jpg" alt="Lampe LED personnalisée avec photo d'un couple" width="450" height="450" />
        <div className="hero-text">
          <p className="noel">Le cadeau personnalisé de Noël</p>
          <h1>Vos souvenirs méritent leur lumière.</h1>
          <p>Lampes LED personnalisées avec votre photo : pour un couple, une famille, un proche.</p>
          <Link className="btn light" to="/creations">Découvrir nos créations</Link>
          <small>Visuels d'illustration</small>
        </div>
        <img className="hero-img right" src="/hero-famille.jpg" alt="Lampe LED personnalisée avec photo de famille" width="450" height="450" />
      </section>
      <section className="section"><h2>Nos créations</h2>
        <div className="grid">{products.slice(0, 3).map((p) => <ProductCard key={p.id} p={p} />)}</div></section>
      <section className="section alt"><h2>Comment ça marche</h2>
        <ol className="steps">{steps.map((s) => <li key={s}>{s}</li>)}</ol></section>
      <section className="section"><h2>Pourquoi LAHOTE</h2>
        <ul className="perks">{perks.map((s) => <li key={s}>{s}</li>)}</ul></section>
      <section className="section alt"><h2>Avis clients</h2>
        <p className="demo">Contenu de démonstration : aucun avis réel n'est affiché. Branchez une application d'avis pour publier de vrais témoignages.</p></section>
    </>
  );
}
