import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../components/useProducts';
import { isConfigured } from '../lib/shopify';

export default function Collection() {
  const [sp] = useSearchParams();
  const q = sp.get('q') || '';
  const { products, loading, error } = useProducts(q);
  return (
    <section className="section">
      <h1>{q ? `Résultats pour « ${q} »` : 'Nos créations'}</h1>
      {!isConfigured && <p className="demo">Mode démonstration : Shopify n'est pas configuré (voir .env.example).</p>}
      {loading ? <p>Chargement…</p> : error ? <p role="alert">{error}</p> :
        products.length ? <div className="grid">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p>Aucun produit trouvé.</p>}
    </section>
  );
}
