// DONNÉES DE DÉMONSTRATION – utilisées uniquement si Shopify n'est pas configuré.
// Prix indicatifs du brief. Aucun achat possible en mode démo.
const mk = (handle, title, price, description) => ({
  id: handle, handle, title, description, demo: true, images: [],
  options: [{ name: 'Modèle', values: ['Standard'] }],
  variants: [{ id: handle + '-v', title: 'Standard', availableForSale: true, price: { amount: price, currencyCode: 'EUR' }, selectedOptions: [{ name: 'Modèle', value: 'Standard' }] }],
});
export const demoProducts = [
  mk('lampe-photo-personnalisee', 'Lampe photo personnalisée', '39.90', '[Description provisoire] Une lampe LED qui met en lumière votre photo.'),
  mk('lampe-couple-personnalisee', 'Lampe couple personnalisée', '44.90', '[Description provisoire] Un cadeau lumineux pour célébrer votre histoire à deux.'),
  mk('lampe-famille-personnalisee', 'Lampe famille personnalisée', '44.90', '[Description provisoire] Réunissez toute la famille dans une même lumière.'),
];
