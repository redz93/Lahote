# LAHOTE – Storefront React + Shopify (Storefront API)

Stack : Vite + React 18 + React Router. Données et panier = Shopify (headless). Paiement = checkout Shopify (`cart.checkoutUrl`).

## Démarrage
1. `cp .env.example .env`, puis renseigner `VITE_SHOPIFY_DOMAIN` et `VITE_SHOPIFY_STOREFRONT_TOKEN`
   (Shopify admin > Paramètres > Applications > Développer des applications > Storefront API ; droits : lecture des produits, lecture/écriture des paniers).
2. `npm install && npm run dev` ; `npm run build` pour la production (Vercel, Netlify, etc.).
Sans configuration : mode démonstration clairement signalé, **achat désactivé**.

## Équivalences Liquid → React
| Shopify | Ici |
|---|---|
| `product`, `collection` | `src/lib/shopify.js` (`getProduct`, `getProducts`) |
| `cart`, propriétés de ligne | `CartContext.jsx` + `attributes` des `CartLineInput` |
| `routes` | `src/App.jsx` |
| sections / snippets | `src/pages`, `src/components` |

## À compléter / limites connues
- **Photo** : le téléversement direct n'est PAS implémenté (l'API Storefront ne reçoit pas de fichiers). La fiche produit demande une case « photo envoyée après commande ». Pour un vrai upload : app Shopify de personnalisation ou endpoint serveur à brancher dans `Product.jsx`.
- Créer dans Shopify les 3 produits (handles : `lampe-photo-personnalisee`, `lampe-couple-personnalisee`, `lampe-famille-personnalisee`), leurs variantes (option « Modèle ») et images.
- Contact : ouvre le client mail (`VITE_CONTACT_EMAIL`) ; à remplacer par un service de formulaire.
- Pages légales, FAQ (délais, retours), avis : textes provisoires. Aucun avis, certification, délai ou garantie inventé.
- SEO : balises de base seulement ; pour un meilleur référencement, prévoir du rendu serveur (Hydrogen). Les requêtes et composants se réutilisent.
- Projet non compilé dans l'environnement de génération (pas de réseau) : lancer `npm install && npm run build` en premier.
