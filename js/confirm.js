const totalPrice = [0]; 
  panier.forEach(element => {
    let allPrices = element.fullPrice;
    totalPrice.push(allPrices);
  });
  let commandPrice = totalPrice.reduce((a, b) => a + b, 0);

  let localOrder = localStorage.getItem("orderN°");

confirmation.insertAdjacentHTML(
    "beforeend",
    `
    <h1 class="my-3 fw-bold confirm-text-animation"> Félicitations, votre commande est confirmée !</h1>
    <h2 class="fs-2 my-3 secondary-underline">Mon récapitulatif de commande</h2>
    <h3 class="my-3">Commande n°: ${localOrder}</h3>
    <span class="articleQty card-text fs-4">Quantité : ${panier[0].quantity}</span></br>
    <span class="mb-5 articlePrice card-text fs-4">Prix : ${commandPrice}€</span>
    
    `);

//// On exiting confirm page, deleting localStorage elements, except formValues for auto-completion ////
window.onbeforeunload = function () {
localStorage.removeItem("panier");
localStorage.removeItem("orderN°");
}