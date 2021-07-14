// Recherche de l'objet local correspondant à l'id du teddy passée en URL sur page index
var tedIdToCreate = new URLSearchParams(document.location.search.substring(1)).get("teddy");

/// API Fetch
fetch("http://localhost:3000/api/teddies/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function () {
    /// API Fetch -> id en URL
    fetch("http://localhost:3000/api/teddies/" + tedIdToCreate)
      .then(function (tedFinder) {
        if (tedFinder.ok) {
          return tedFinder.json();
        }
      })
      .then(function (tedFinder) {
        //Recherche dans l'api du teddy correspondant à l'id envoyé en URL
        createTeddy(tedFinder);
        teddyColorator(tedFinder);
      })
      .catch(function (err) {
        // Une erreur est survenue
      });
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

function createTeddy(tedFinder) {
  const mainContainer = document.getElementById("products");
  mainContainer.insertAdjacentHTML(
    "beforeend",
    `
      <div class="teddy col-12 col-lg-6">
        <div class="product-image main-color">
            <img src="${tedFinder.imageUrl}" alt="Teddy" class="img-fluid p-3">
        </div>
      </div>
      <div class="teddy col-12 col-lg-6 main-color px-3">
        <div class="product-desc">
            <h2 class="fw-bold text-center">${tedFinder.name}</h2>
            <p class="fs-5">${tedFinder.description}</p>
            <h5 class="font-lg fw-bold">Choisissez une couleur pour votre teddy :</h5>
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
            <button id="productPrice" class="btn btn-secondary bg-gradientp-2 d-flex flex-nowrap w-full bg-secondary text-white fw-bold fs-4 rounded" type="button">Ajouter au panier pour 
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

//////////////// Création et envoi des objets products dans le localStorage ///////////////
function addToBasket(tedFinder) {
    // récupère le panier récent
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
       for(let i = 0; i < panier.length; i++) {
        if(panier[i].color == SEARCHED_TEDDY_ID+SEARCHED_TEDDY_COLOR) {
        panier[i].quantity = parseInt(panier[i].quantity) + parseInt(qtyValue);
        panier[i].fullPrice = parseInt(panier[i].fullPrice) + parseInt(itemPrice);
        panier[i].cmdId = tedFinder.name+tedIdToCreate+panier[i].quantity+isCheckedColor.value+panier[i].fullPrice;
        setPanier(panier);
        debugger;
        console.log("Ici on doit ajouter qty et price");
        console.log(panier[i].productId, SEARCHED_TEDDY_ID, panier[i].color, SEARCHED_TEDDY_COLOR, panier[i].name, SEARCHED_TEDDY_NAME); 
        break;
        }
        else {
          panier.push(tedParams);
          setPanier(panier);
          console.log("Ici, on rajoute seulement un object article");
          debugger;
          break;
        }
      }//fin de boucle for i
         
/////////////// FOR EACH /////////////////////////
    
      /*panier.forEach(element => {
        if(element._id === SEARCHED_TEDDY_ID && element.color === SEARCHED_TEDDY_COLOR && element.name === SEARCHED_TEDDY_NAME) {
        element.quantity = parseInt(element.quantity) + parseInt(qtyValue);
        element.fullPrice = element.fullPrice + parseInt(itemPrice);
        element.cmdId = tedFinder.name+tedIdToCreate+element.quantity+isCheckedColor.value+element.fullPrice;
        debugger;
        console.log("Ici on doit ajouter qty et price");
        setPanier(panier);
        return;
        }
        else {
          panier.push(tedParams);
          setPanier(panier);
          console.log("Ici, on rajoute seulement un object article");
          return;
        }
      });*/

////////////////////////// SOME ////////
/*panier.some(function(element) {

  const isColor = (element) => element = SEARCHED_TEDDY_COLOR; 
  let elementIndex = panier.findIndex(isColor);
  console.log(elementIndex);
  
  if(element.colorCompare === SEARCHED_TEDDY_ID+SEARCHED_TEDDY_COLOR) {
    element.quantity = parseInt(element.quantity) + parseInt(qtyValue);
    element.fullPrice = element.fullPrice + parseInt(itemPrice);
    element.cmdId = tedFinder.name+tedIdToCreate+element.quantity+isCheckedColor.value+element.fullPrice;
    console.log("Ici on doit ajouter qty et price");
    setPanier(panier);
    debugger;
    return true;
  }
  else {
  panier.push(tedParams);
  setPanier(panier);
  console.log("Ici, on rajoute seulement un object article");
  debugger;
  return true;
  }
})*/

     } else if (panier == null) {
      // Si panier inexistant, création puis push
      panier = [];
      panier.push(tedParams);
      setPanier(panier);
      console.log("Panier vide, création + ajout teddy");
      
      }
  
      //////////////////////////////////////////////////////////////////////////////////////
      window.location.reload();
      // Le reload indique plus clairement à l'utilisateur le transfert de son article dans le panier
  } // fin de checkedcolor
  else if(isCheckedColor == null){
  alert("Veuillez séléctionner une couleur pour votre produit."); // Si pas de couleur checked, message d'alerte et pas d'envoi
  }
} //fin de addToBasket