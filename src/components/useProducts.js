import { useEffect, useState } from 'react';
import * as S from '../lib/shopify';
import { demoProducts } from '../lib/demoData';

export function useProducts(query = '') {
  const [state, set] = useState({ products: [], loading: true, error: '' });
  useEffect(() => {
    if (!S.isConfigured) { set({ products: demoProducts, loading: false, error: '' }); return; }
    S.getProducts(query).then((products) => set({ products, loading: false, error: '' }))
      .catch((e) => set({ products: [], loading: false, error: e.message }));
  }, [query]);
  return state;
}
