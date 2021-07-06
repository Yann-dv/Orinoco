const localStoragePanier = localStorage.getItem(`panier`);

// Recherche de l'objet local correspondant à l'id du teddy passée en URL sur page index
var tedIdToCreate = new URLSearchParams(
  document.location.search.substring(1)
).get("teddy");

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
    // Boucle pour détecter quelle couleur est checked
    var qtyValue = document.getElementById("tedQuantity").value;
    //var choosenColor = document.getElementsByName("colorChoice");
    var totalPrice = qtyValue * (tedFinder.price / 100);
    var isCheckedColor = document.querySelector('input[name = "colorChoice"]:checked');
    var checkedColorValue = document.querySelector('input[name = "colorChoice"]:checked').value;
    var checkedColorToString = JSON.stringify(document.querySelector('input[name = "colorChoice"]:checked').value);

    //////////////// Création et envoi des objets products dans le localStorage ///////////////
    function addToBasket() {
      if (isCheckedColor != null) { // Nécessite la coche d'un des btns de couleurs pour appuyer sur l'envoi

        //////////// Création des objets teddy de teddy //////////////////////////
            const tedParams = {name: tedFinder.name, _id: tedIdToCreate,
            quantity: tedQuantity.value, color: JSON.stringify(checkedColorToString), 
            price: totalPrice, imageUrl: tedFinder.imageUrl,};
        //////////////////////////////////////////////////////////////////
        if (getPanier != null) {
          for (var i = 0; i < JSON.stringify(getPanier.length); i++) {
            let searchingColors = JSON.parse(getPanier[i]).color;
            //let searchingId = (JSON.parse(element)._id);
            const arrayPrices = [0]; 
            //getPanier.forEach(element => {
                var thisTed = tedIdToCreate;
                //let searchingColors = (JSON.parse(element).color);
                //let col = getPanier.indexOf(JSON.stringify(document.querySelector('input[name = "colorChoice"]:checked')));
              //});
              if (checkedColorValue = JSON.parse(searchingColors)
                //console.log(JSON.parse(getPanier[2])._id)
                //thisTed == (JSON.stringify(getPanier[i])._id) &&
                //thisColor == (JSON.stringify(getPanier[i]).color)
                //thisTed == localStorage.getItem(`panier`)[i])._id;
                //thisTed == allBasketIds
                
              ) {
                //Si teddy déjà présent, same id + color, alors on l'ajoute
                console.log(checkedColorValue, searchingColors);
                console.log("Teddy déjà présent, on doit rajouter qty et price");
                break;
              } else {
              // Si teddy non existant, on le crée dans le panier
              //getPanier = [];
              getPanier.push(JSON.stringify(tedParams));
              localStorage.setItem(`panier`, JSON.stringify(getPanier));
              console.log("Si pas de teddy, on l'ajoute");
              break;
              }
            //});
          };
        
        } else if (getPanier == null) {
          // Si panier inexistant, création puis push
          getPanier = [];
          getPanier.push(JSON.stringify(tedParams));
          localStorage.setItem(`panier`, JSON.stringify(getPanier));
          console.log("Panier vide, création");
        }
      
          //////////////////////////////////////////////////////////////////////////////////////
          //window.location.reload();
          // Le reload indique plus clairement à l'utilisateur le transfert de son article dans le panier
      } // fin de checkedcolor
      else {
      alert("Veuillez séléctionner une couleur pour votre produit."); // Si pas de couleur checked, message d'alerte et pas d'envoi
      }
      
    } //fin de addToBasket
    addToBasket();
  }); // Fin addeventlistener
  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
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
  for (let i = 0; i < tedFinder.colors.length; i++) {
    let color = tedFinder.colors;
    colorContainer.insertAdjacentHTML(
      "beforeend",
      `
      <input type="radio" class="color-option btn-check" value="${color[i]}" name="colorChoice" id="${color[i]}" autocomplete="off">
      <label class="color-btn btn fs-4" for="${color[i]}" style="background-color: ${color[i]}">${color[i]}</label>
      `
    );
  }
};
