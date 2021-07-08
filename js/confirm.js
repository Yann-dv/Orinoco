const totalPrice = [0]; 
  parsedPanier.forEach(element => {
    let allPrices = element.price;
    totalPrice.push(allPrices);
  });
  let commandPrice = totalPrice.reduce((a, b) => a + b, 0);

var today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
const h = today.getUTCHours();
function getRandomArbitrary(min, max) {
    return Math.random(9999, 1) * (max - min) + min;
  }

var randomCmdNumber = `${y}${m}${d}${h}${String(getRandomArbitrary)}`;


confirmation.insertAdjacentHTML(
    "beforeend",
    `<h2 class="link-anim">Mon récapitulatif de commande</h2>
    <h3 class="link-anim">Commande n°: ${randomCmdNumber}</h3>
    <span class="articleQty card-text fs-5">Quantité : ${parsedPanier[0].quantity}</span></br>
    <span class="articlePrice card-text fs-5">Prix : ${commandPrice}€</span>
    
    `);