import { useParams } from 'react-router-dom';
import { useState } from 'react';

const faq = [
  ['Comment personnaliser ma lampe ?', 'Renseignez prénom, message et modèle sur la fiche produit.'],
  ['Quels sont les délais de livraison ?', '[À compléter par LAHOTE]'],
  ['Quelle est la politique de retour ?', '[À compléter par LAHOTE]'],
];
export const Faq = () => (
  <section className="section"><h1>Questions fréquentes</h1>
    {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
);

const pages = { 'mentions-legales': 'Mentions légales', cgv: 'Conditions générales de vente', confidentialite: 'Politique de confidentialité', livraison: 'Livraison et retours' };
export const Page = () => {
  const { slug } = useParams();
  return <section className="section"><h1>{pages[slug] || 'Page'}</h1>
    <p className="demo">[Contenu légal à compléter : raison sociale, SIRET, adresse, hébergeur, etc. Aucune information n'est inventée.]</p></section>;
};

export const Contact = () => {
  const [sent, setSent] = useState(false);
  const to = import.meta.env.VITE_CONTACT_EMAIL;
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    // Sans backend : ouvre le client mail. Remplaçable par une app/endpoint de formulaire.
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('Contact LAHOTE – ' + d.get('nom'))}&body=${encodeURIComponent(d.get('message'))}`;
    setSent(true);
  };
  return (
    <section className="section narrow"><h1>Contact</h1>
      {!to && <p className="demo">Adresse de contact non configurée (VITE_CONTACT_EMAIL).</p>}
      <form onSubmit={submit}>
        <label>Nom<input name="nom" required /></label>
        <label>Message<textarea name="message" rows={5} required /></label>
        <button className="btn" disabled={!to}>Envoyer</button>
        {sent && <p>Votre application mail s'ouvre pour envoyer le message.</p>}
      </form></section>
  );
};
