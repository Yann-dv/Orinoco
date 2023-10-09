import { teddies } from "../datas.js";
import { getPanier, setPanier, panier } from "./panier.js";

// Recherche de l'objet local correspondant à l'id du teddy passé en URL sur la page index
var tedIdToCreate = new URLSearchParams(document.location.search.substring(1)).get("teddy");

// Find the teddy in the teddies array based on tedIdToCreate
var tedFinder = teddies.find(teddy => teddy._id === tedIdToCreate);
// Créations des boutons de choix de couleurs en fonction du teddy séléctionné

const teddyColorator = (tedFinder) => {
  const colorContainer = document.getElementById("productColors");
  let color = tedFinder.colors;
  
  for (let i = 0; i < tedFinder.colors.length; i++) {
    const colorFilter = (color) => { // Filtres pour le défaut d'affichage CSS des couleurs dark et pale brown
      if (color=== 'Pale brown') {
        return "#8B4513";
      } else if(color === 'Dark brown') {
        return "#800000";
      } else {
        return color; }
      };
    //let brownFilter = colorFilter(tedFinder.colors);
   
    colorContainer.insertAdjacentHTML(
      "beforeend",
      `
      <input type="radio" class="color-option btn-check" value="${color[i]}" name="colorChoice" id="${color[i]}" autocomplete="off">
      <label class="color-btn btn fs-4" for="${color[i]}" style="background-color: ${colorFilter(color[i])}">${color[i]}</label>
      `
    );
  };
};

if (tedFinder) {
  // Call createTeddy and teddyColorator functions with the found teddy
  createTeddy(tedFinder);
  teddyColorator(tedFinder);

  // Add event listener for the "Ajouter au panier" button
  const productPrice = document.getElementById("productPrice");
  productPrice.addEventListener("click", function (e) {
    addToBasket(tedFinder);
  });

  // Add event listener for the quantity select
  const tedQuantity = document.getElementById("tedQuantity");
  tedQuantity.addEventListener("change", function (e) {
    const tedPrice = document.getElementById("productPrice");
    tedPrice.textContent = `Ajouter au panier pour ${((tedFinder.price / 100) * e.target.value).toFixed(2)} €`;
  });
} else {
  // Handle the case where the teddy with the specified ID was not found
  console.error("Teddy not found.");
}
function createTeddy(tedFinder) {
  const mainContainer = document.getElementById("products");
  mainContainer.insertAdjacentHTML(
    "beforeend",
    `
      <div class="teddy col-12 col-lg-6">
        <div class="product-image main-color">
            <img src="${"../images/" + tedFinder.imageUrl}" alt="Teddy" class="img-fluid p-3">
        </div>
      </div>
      <div class="teddy col-12 col-lg-6 main-color px-3">
        <div class="product-desc">
            <h2 class="fw-bold text-center">${tedFinder.name}</h2>
            <p class="fs-5">${tedFinder.description}</p>
            <h3 class="font-lg fw-bold fs-4">Choisissez une couleur pour votre teddy :</h3>
            <div class="container colors-container">
              <div class="m-auto d-flex flex-nowrap justify-content-between" id="productColors">
              </div>
            </div>
            <label class="m-2 fs-5 selectQuantity">Quantité :
            <select id="tedQuantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            </label>
            <button id="productPrice" class="my-3 btn btn-secondary bg-gradientp-2 d-flex flex-nowrap w-full bg-secondary text-white fw-bold fs-4 rounded" type="button">Ajouter au panier pour 
            <span class="ms-2">${tedFinder.price / 100}€</span>
            </button>
        </div>
      </div>
        `
  );
  ////////////////////// Ecoute du bouton d'envoi d'article vers panier' //////////////////////
  productPrice.addEventListener("click", function (e) {
    addToBasket(tedFinder);
  }); // Fin addeventlistener
  //////////////////////////////////////////////////////////////////////////////////////
  
  // Ecoute de la quantité choisie
  tedQuantity.addEventListener("change", function (e) {
    const tedPrice = document.getElementById("productPrice");
    tedPrice.textContent = `Ajouter au panier pour ${
      (tedFinder.price / 100) * e.target.value
    } €`;
  });
} ///////////////////////////////////// Fin de create Teddy /////////////////////////////////////////////



//////////////// Création et envoi des objets products dans le localStorage ///////////////
function addToBasket(tedFinder) {
    // récupère le panier récent
    let panier = getPanier();
    panier = getPanier();
    var qtyValue = document.getElementById("tedQuantity").value;
    var itemPrice = qtyValue * (tedFinder.price / 100);
    var isCheckedColor = document.querySelector('input[name = "colorChoice"]:checked');

  if (isCheckedColor != null) { // Nécessite la coche d'un des btns de couleurs pour appuyer sur l'envoi
    const SEARCHED_TEDDY_NAME = tedFinder.name;
    const SEARCHED_TEDDY_ID = tedIdToCreate;
    const SEARCHED_TEDDY_COLOR = isCheckedColor.value;
    
    //////////// Création des objets teddy //////////////////////////
    const tedParams = {name: tedFinder.name, productId: tedIdToCreate, cmdId: tedFinder.name+tedIdToCreate+qtyValue+isCheckedColor.value+itemPrice,
      quantity: qtyValue, color: isCheckedColor.value, unitPrice: (tedFinder.price/100),
      fullPrice: itemPrice, imageUrl: tedFinder.imageUrl};
    /////////////////////////////////////////////////////////////////
    //let foundIndex = -1;

    if (panier != null) {
       let pasTrouve = true;
       for(let i = 0; i < panier.length; i++) {
        if(panier[i].productId == SEARCHED_TEDDY_ID && panier[i].color == SEARCHED_TEDDY_COLOR) {
          panier[i].quantity = parseInt(panier[i].quantity) + parseInt(qtyValue);
          panier[i].fullPrice = parseInt(panier[i].fullPrice) + parseInt(itemPrice);
          panier[i].cmdId = tedFinder.name+tedIdToCreate+panier[i].quantity+isCheckedColor.value+panier[i].fullPrice;
          setPanier(panier);
          pasTrouve = false;
          break; // break utilisé pour ne pas boucler sur un grand nombre d'élément si on trouve le teddy souhaité dans le panier
        }
      }//fin de boucle for i
         
      if (pasTrouve) {
        panier.push(tedParams);
        setPanier(panier);
      }

     } else if (panier == null) {
      // Si panier inexistant, création puis push
      panier = [];
      panier.push(tedParams);
      setPanier(panier);
      }
  
      //////////////////////////////////////////////////////////////////////////////////////
      window.location.reload();
      // Le reload indique plus clairement à l'utilisateur le transfert de son article dans le panier
  } // fin de checkedcolor
  else if(isCheckedColor == null){
  alert("Veuillez séléctionner une couleur pour votre produit."); // Si pas de couleur checked, message d'alerte et pas d'envoi
  }
} //fin de addToBasket