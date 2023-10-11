let panier = JSON.parse(localStorage.getItem("panier"));
let localOrder = localStorage.getItem("orderN°");

// Vérifiez si le panier existe
if (panier) {
  let totalPrice = [0];
  panier.forEach((element) => {
    let allPrices = element.fullPrice;
    totalPrice.push(allPrices);
  });
  let commandPrice = totalPrice.reduce((a, b) => a + b, 0);

  confirmation.insertAdjacentHTML(
    "beforeend",
    `
    <h1 class="my-3 fw-bold confirm-text-animation"> Félicitations, votre commande est confirmée !</h1>
    <h2 class="fs-2 my-3 secondary-underline">Mon récapitulatif de commande :</h2>
    <h3 class="my-3">Commande n°: <strong>${localOrder}</strong></h3>
    <span class="articleQty card-text fs-4">Nombre de produits : ${panier.length}</span></br>
    <span class="mb-2 articlePrice card-text fs-4">Prix : ${commandPrice}€</span>
    <p class="fs-5">Une copie de cette confirmation va vous être envoyée par email d'ici quelques minutes.</p>
    <p class="fs-5 mb-3">Votre commande sera expédiée d'ici 48h, merci pour votre achat. A bientot sur Orinoco !</p>
    `);
} else {
  // Le panier est vide
  confirmation.insertAdjacentHTML(
    "beforeend",
    `
    <h1 class="my-3 fw-bold confirm-text-animation"> Félicitations, votre commande est confirmée !</h1>
    <p class="fs-5 mb-3">Votre commande sera expédiée d'ici 48h, merci pour votre achat. A bientot sur Orinoco !</p>
    `);
}
