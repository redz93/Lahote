import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { Faq, Page, Contact } from './pages/Static';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="creations" element={<Collection />} />
        <Route path="produits/:handle" element={<Product />} />
        <Route path="panier" element={<Cart />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pages/:slug" element={<Page />} />
        <Route path="*" element={<section className="section"><h1>Page introuvable</h1></section>} />
      </Route>
    </Routes>
  );
}
