import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as S from '../lib/shopify';

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);
const KEY = 'lahote_cart_id';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const id = localStorage.getItem(KEY);
    if (S.isConfigured && id) S.getCart(id).then((c) => c ? setCart(c) : localStorage.removeItem(KEY)).catch(() => {});
  }, []);

  const run = useCallback(async (fn) => {
    setBusy(true); setError('');
    try { const c = await fn(); setCart(c); localStorage.setItem(KEY, c.id); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }, []);

  const add = (merchandiseId, quantity, attributes) =>
    run(() => cart ? S.addLines(cart.id, [{ merchandiseId, quantity, attributes }])
                   : S.createCart([{ merchandiseId, quantity, attributes }]));
  const setQty = (lineId, q) => run(() => q < 1 ? S.removeLine(cart.id, lineId) : S.updateLine(cart.id, lineId, q));
  const remove = (lineId) => run(() => S.removeLine(cart.id, lineId));

  return <Ctx.Provider value={{ cart, busy, error, add, setQty, remove }}>{children}</Ctx.Provider>;
}
