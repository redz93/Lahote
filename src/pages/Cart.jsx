import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money } from '../lib/shopify';

export default function Cart() {
  const { cart, setQty, remove, busy, error } = useCart();
  if (!cart?.lines.length) return <section className="section"><h1>Votre panier</h1><p>Votre panier est vide.</p><Link className="btn" to="/creations">Voir nos créations</Link></section>;
  return (
    <section className="section">
      <h1>Votre panier</h1>
      {cart.lines.map((l) => (
        <article key={l.id} className="line">
          <div><Link to={`/produits/${l.merchandise.product.handle}`}>{l.merchandise.product.title}</Link>
            <small>{l.merchandise.title}</small>
            {l.attributes.map((a) => <small key={a.key}>{a.key} : {a.value}</small>)}</div>
          <div className="qty">
            <button disabled={busy} onClick={() => setQty(l.id, l.quantity - 1)} aria-label="Diminuer">−</button>
            <span>{l.quantity}</span>
            <button disabled={busy} onClick={() => setQty(l.id, l.quantity + 1)} aria-label="Augmenter">+</button>
          </div>
          <strong>{money(l.merchandise.price)}</strong>
          <button className="link" onClick={() => remove(l.id)}>Retirer</button>
        </article>))}
      <p className="total">Sous-total : <strong>{money(cart.cost.subtotalAmount)}</strong></p>
      {error && <p role="alert">{error}</p>}
      <a className="btn" href={cart.checkoutUrl}>Passer la commande</a>
    </section>
  );
}
