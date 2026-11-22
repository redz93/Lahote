// Client Storefront API Shopify. Équivalent headless des objets Liquid : product, collection, cart.
const D = import.meta.env.VITE_SHOPIFY_DOMAIN;
const T = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
export const isConfigured = Boolean(D && T);

async function gql(query, variables = {}) {
  const r = await fetch(`https://${D}/api/2025-01/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': T },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(j.errors[0].message);
  return j.data;
}

const P = `fragment P on Product{id handle title description options{name values}
 images(first:6){nodes{url altText}}
 variants(first:50){nodes{id title availableForSale price{amount currencyCode} selectedOptions{name value}}}}`;
const C = `fragment C on Cart{id checkoutUrl totalQuantity cost{subtotalAmount{amount currencyCode}}
 lines(first:100){nodes{id quantity attributes{key value}
 merchandise{... on ProductVariant{id title price{amount currencyCode} image{url} product{title handle}}}}}}`;

const norm = (p) => ({ ...p, images: p.images.nodes, variants: p.variants.nodes });
const cartNorm = (c) => c && { ...c, lines: c.lines.nodes };

export async function getProducts(query = '') {
  const d = await gql(`query($q:String){products(first:24,query:$q){nodes{...P}}} ${P}`, { q: query });
  return d.products.nodes.map(norm);
}
export async function getProduct(handle) {
  const d = await gql(`query($h:String!){product(handle:$h){...P}} ${P}`, { h: handle });
  return d.product && norm(d.product);
}
export async function getCart(id) {
  return cartNorm((await gql(`query($id:ID!){cart(id:$id){...C}} ${C}`, { id })).cart);
}
// lines: [{ merchandiseId, quantity, attributes:[{key,value}] }] → propriétés de ligne
export async function createCart(lines) {
  const d = await gql(`mutation($l:[CartLineInput!]){cartCreate(input:{lines:$l}){cart{...C}}} ${C}`, { l: lines });
  return cartNorm(d.cartCreate.cart);
}
export async function addLines(cartId, lines) {
  const d = await gql(`mutation($id:ID!,$l:[CartLineInput!]!){cartLinesAdd(cartId:$id,lines:$l){cart{...C}}} ${C}`, { id: cartId, l: lines });
  return cartNorm(d.cartLinesAdd.cart);
}
export async function updateLine(cartId, id, quantity) {
  const d = await gql(`mutation($c:ID!,$l:[CartLineUpdateInput!]!){cartLinesUpdate(cartId:$c,lines:$l){cart{...C}}} ${C}`, { c: cartId, l: [{ id, quantity }] });
  return cartNorm(d.cartLinesUpdate.cart);
}
export async function removeLine(cartId, id) {
  const d = await gql(`mutation($c:ID!,$l:[ID!]!){cartLinesRemove(cartId:$c,lineIds:$l){cart{...C}}} ${C}`, { c: cartId, l: [id] });
  return cartNorm(d.cartLinesRemove.cart);
}
export const money = ({ amount, currencyCode = 'EUR' }) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currencyCode }).format(amount);
