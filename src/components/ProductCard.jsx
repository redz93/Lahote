import { Link } from 'react-router-dom';
import { money } from '../lib/shopify';

export default function ProductCard({ p }) {
  const v = p.variants[0];
  return (
    <Link to={`/produits/${p.handle}`} className="card">
      <div className="ph">{p.images[0] ? <img src={p.images[0].url} alt={p.images[0].altText || p.title} loading="lazy" /> : <span>Image à ajouter</span>}</div>
      <h3>{p.title}</h3>
      <p>{p.variants.length > 1 ? 'À partir de ' : ''}{money(v.price)}</p>
    </Link>
  );
}
