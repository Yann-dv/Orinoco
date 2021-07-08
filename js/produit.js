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
  ////////////////////// Ecoute du bouton d'envoi de commande //////////////////////
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
    var qtyValue = document.getElementById("tedQuantity").value;
    var totalPrice = qtyValue * (tedFinder.price / 100);
    var isCheckedColor = document.querySelector('input[name = "colorChoice"]:checked');
    var colorBtnValue = document.querySelector('input[name = "colorChoice"]:checked').value;
    const SEARCHED_TEDDY_ID = tedIdToCreate;
    const SEARCHED_TEDDY_COLOR = colorBtnValue;

    //////////// Création des objets teddy //////////////////////////
    const tedParams = {name: tedFinder.name, _id: tedIdToCreate,
      quantity: qtyValue, color: colorBtnValue, 
      price: totalPrice, imageUrl: tedFinder.imageUrl,};
    /////////////////////////////////////////////////////////////////

  if (isCheckedColor != null) { // Nécessite la coche d'un des btns de couleurs pour appuyer sur l'envoi
    if (panier != null) {
      let foundIndex = -1;
      for(let i = 0; i < panier.length; i++) {
        if((panier[i])._id == SEARCHED_TEDDY_ID && (panier[i]).color == SEARCHED_TEDDY_COLOR) {
        foundIndex = i;
        panier[foundIndex].quantity = panier[foundIndex].quantity + 1;
        setPanier(panier[foundIndex]);
        alert(panier[foundIndex]);
        // add changer price
        console.log("Ici");
        debugger;
        }
        else{
          monPanier = [];
          monPanier.push(tedParams);
          setPanier(monPanier);
          console.log('Teddy ajouté');
          debugger;
        }
      }//fin de boucle for i

    } else if (panier == null) {
      // Si panier inexistant, création puis push
      monPanier = [];
      monPanier.push(tedParams);
      setPanier(monPanier);
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