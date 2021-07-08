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
 
const rNbr =  Math.floor((Math.random() * 999) + 1);
  
var randomCmdNumber = `${y}${m}${d}${h}_${commandPrice}_${rNbr.toString()}`;


confirmation.insertAdjacentHTML(
    "beforeend",
    `<h2 class="fs-2 secondary-border w-50">Mon récapitulatif de commande</h2>
    <h3 class="mt-3">Commande n°: ${randomCmdNumber}</h3>
    <span class="articleQty card-text fs-4">Quantité : ${parsedPanier[0].quantity}</span></br>
    <span class="articlePrice card-text fs-4">Prix : ${commandPrice}€</span>
    
    `);