// Variable pour aller chercher les informations à afficher dans le localStorage et parser
//const ted= JSON.parse(localStorage.getItem('teddiesList'));

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
      <div class="teddy col-12 col-lg-6 main-color ms-3 px-3 d-flex">
        <div class="product-desc d-flex flex-column">
            <h2 class="fw-bold text-center pt-2">${tedFinder.name}</h2>
            <p class="fs-5">${tedFinder.description}</p>
            <h5 class="font-lg fw-bold">Choisissez une couleur pour votre teddy :</h5>
            <div class="container colors-container">
              <div class="d-flex m-auto justify-content-around py-1" id="productColors">
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
            <button id="productPrice" class="w-full bg-secondary text-white fw-bold fs-4 rounded mx-5" type="button">Ajouter au panier pour 
            <span>${tedFinder.price / 100} €</span>
            </button>
        </div>
      </div>
        `
  );
  // Ecoute du bouton d'envoi de commande
  productPrice.addEventListener("click", function (e) {
    var urlParams = new URLSearchParams(window.location.search);
    var qty = document.getElementById("tedQuantity");
    var choosenColor = document.getElementsByName("colorChoice");
    // Boucle pour détecter quelle couleur est checked
    var valeur;
    for (var i = 0; i < choosenColor.length; i++) {
      if (choosenColor[i].checked) {
        valeur = choosenColor[i].value;
        urlParams.set("color", choosenColor[i].id);
      }
    }
    // Envoi des paramètres en URL
    if (urlParams.has("price") && urlParams.has("quantity")) {
      // Récupération des paramètres existants et ajouts des nouveaux
      urlParams.set(
        "price",
        parseInt(urlParams.get("price"), 10) +
          qty.value * (tedFinder.price / 100)
      );
      urlParams.set(
        "quantity",
        parseInt(qty.value, 10) + parseInt(urlParams.get("quantity"), 10)
      );
      window.location.search = urlParams;
    } else {
      urlParams.set("price", qty.value * (tedFinder.price / 100));
      urlParams.set("quantity", qty.value);
      window.location.search = urlParams;
    }

    /*var qtyAdd = urlParams.get("quantity");
          var priceAdd = urlParams.get("price");
          var colorAdd = urlParams.get("color");
          const basketAdd = localStorage.setItem("basket", JSON.stringify(value));*/
  });

  // Fonction de recherche des paramètres passés en URL
  var oParametre = {};
  if (window.location.search.length > 1) {
    for (
      var aItKey,
        nKeyId = 0,
        aCouples = window.location.search.substr(1).split("&");
      nKeyId < aCouples.length;
      nKeyId++
    ) {
      aItKey = aCouples[nKeyId].split("=");
      oParametre[unescape(aItKey[0])] =
        aItKey.length > 1 ? unescape(aItKey[1]) : "";
    }
  }
  // Ecoute du choix de la quantité
  tedQuantity.addEventListener("change", function (e) {
    const tedPrice = document.getElementById("productPrice");
    tedPrice.textContent = `Ajouter au panier pour ${
      (tedFinder.price / 100) * e.target.value
    } €`;
  });
} /////// Fin de create Teddy //////

// Créations des boutons de choix de couleurs en fonction du teddy séléctionné
const teddyColorator = (tedFinder) => {
  const colorContainer = document.getElementById("productColors");
  for (let i = 0; i < tedFinder.colors.length; i++) {
    let color = tedFinder.colors;
    colorContainer.insertAdjacentHTML(
      "beforeend",
      `
      <input type="radio" class="color-option btn-check" name="colorChoice" id="${color[i]}" autocomplete="off" checked>
      <label class="btn scale-up fs-4" for="${color[i]}" style="background-color: ${color[i]}; width:8rem; height:5rem">${color[i]}</label>
        `
    );
  }
};