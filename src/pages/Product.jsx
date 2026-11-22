import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as S from '../lib/shopify';
import { demoProducts } from '../lib/demoData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../components/useProducts';

export default function Product() {
  const { handle } = useParams();
  const [p, setP] = useState(undefined);
  const [sel, setSel] = useState({});
  const [qty, setQty] = useState(1);
  const [f, setF] = useState({ prenom: '', message: '', photo: false });
  const { add, busy, error } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    const load = S.isConfigured ? S.getProduct(handle) : Promise.resolve(demoProducts.find((x) => x.handle === handle) || null);
    load.then((x) => { setP(x); if (x) setSel(Object.fromEntries(x.options.map((o) => [o.name, o.values[0]]))); });
  }, [handle]);

  const variant = useMemo(() => p?.variants.find((v) => v.selectedOptions.every((o) => sel[o.name] === o.value)), [p, sel]);
  if (p === undefined) return <p className="section">Chargement…</p>;
  if (p === null) return <p className="section">Produit introuvable. <Link to="/creations">Retour</Link></p>;

  const submit = (e) => {
    e.preventDefault();
    // Champs de personnalisation → propriétés de ligne (attributes) du panier Shopify
    const attributes = [
      { key: 'Prénom', value: f.prenom }, { key: 'Message', value: f.message },
      { key: 'Modèle', value: variant.title },
      { key: 'Photo', value: f.photo ? 'À envoyer après la commande' : '' },
    ].filter((a) => a.value);
    add(variant.id, qty, attributes);
  };
  const canBuy = S.isConfigured && !p.demo && variant?.availableForSale;

  return (
    <section className="section product">
      <div className="gallery">{p.images.length ? p.images.map((i) => <img key={i.url} src={i.url} alt={i.altText || p.title} />) : <div className="ph big"><span>Images à ajouter dans Shopify</span></div>}</div>
      <form onSubmit={submit}>
        <h1>{p.title}</h1>
        <p className="price">{variant ? S.money(variant.price) : 'Indisponible'}</p>
        {p.options.filter((o) => o.values.length > 1).map((o) => (
          <label key={o.name}>{o.name}
            <select value={sel[o.name]} onChange={(e) => setSel({ ...sel, [o.name]: e.target.value })}>{o.values.map((v) => <option key={v}>{v}</option>)}</select>
          </label>))}
        <label>Prénom<input required maxLength={40} value={f.prenom} onChange={(e) => setF({ ...f, prenom: e.target.value })} /></label>
        <label>Message<textarea maxLength={150} rows={3} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
        <label className="check"><input type="checkbox" required checked={f.photo} onChange={(e) => setF({ ...f, photo: e.target.checked })} />
          J'enverrai ma photo après la commande (le téléversement direct n'est pas encore activé)</label>
        <label>Quantité<input type="number" min="1" max="20" value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} /></label>
        <button className="btn" disabled={!canBuy || busy}>{busy ? 'Ajout…' : 'Ajouter au panier'}</button>
        {!canBuy && <p className="demo">{p.demo || !S.isConfigured ? 'Mode démonstration : achat désactivé.' : 'Variante indisponible.'}</p>}
        {error && <p role="alert">{error}</p>}
        <p className="info">{import.meta.env.VITE_DELIVERY_INFO || '[Informations de livraison à compléter]'}</p>
        <p>{p.description}</p>
      </form>
      <div className="related"><h2>Vous aimerez aussi</h2>
        <div className="grid">{products.filter((x) => x.handle !== handle).slice(0, 3).map((x) => <ProductCard key={x.id} p={x} />)}</div></div>
    </section>
  );
}
