"use strict";

// Recherche de l'objet local correspondant à l'id du teddy passée en URL sur page index
var tedIdToCreate = new URLSearchParams(document.location.search.substring(1)).get("teddy"); /// API Fetch

fetch("http://localhost:3000/api/teddies/").then(function (res) {
  if (res.ok) {
    return res.json();
  }
}).then(function () {
  /// API Fetch -> id en URL
  fetch("http://localhost:3000/api/teddies/" + tedIdToCreate).then(function (tedFinder) {
    if (tedFinder.ok) {
      return tedFinder.json();
    }
  }).then(function (tedFinder) {
    //Recherche dans l'api du teddy correspondant à l'id envoyé en URL
    createTeddy(tedFinder);
    teddyColorator(tedFinder);
  })["catch"](function (err) {// Une erreur est survenue
  });
})["catch"](function (err) {// Une erreur est survenue
});

function createTeddy(tedFinder) {
  var mainContainer = document.getElementById("products");
  mainContainer.insertAdjacentHTML("beforeend", "\n      <div class=\"teddy col-12 col-lg-6\">\n        <div class=\"product-image main-color\">\n            <img src=\"".concat(tedFinder.imageUrl, "\" alt=\"Teddy\" class=\"img-fluid p-3\">\n        </div>\n      </div>\n      <div class=\"teddy col-12 col-lg-6 main-color ms-3 px-3 d-flex\">\n        <div class=\"product-desc d-flex flex-column\">\n            <h2 class=\"fw-bold text-center pt-2\">").concat(tedFinder.name, "</h2>\n            <p class=\"fs-5\">").concat(tedFinder.description, "</p>\n            <h5 class=\"font-lg fw-bold\">Choisissez une couleur pour votre teddy :</h5>\n            <div class=\"container colors-container\">\n              <div class=\"d-flex m-auto justify-content-around py-1\" id=\"productColors\">\n              </div>\n            </div>\n            <label class=\"m-2 fs-5 selectQuantity\">Quantit\xE9 : \n            <select id=\"tedQuantity\">\n            <option value=\"1\">1</option>\n            <option value=\"2\">2</option>\n            <option value=\"3\">3</option>\n            <option value=\"4\">4</option>\n            <option value=\"5\">5</option>\n            <option value=\"6\">6</option>\n            <option value=\"7\">7</option>\n            <option value=\"8\">8</option>\n            <option value=\"9\">9</option>\n            <option value=\"10\">10</option>\n            </select>\n            </label>\n            <button id=\"productPrice\" class=\"w-full bg-secondary text-white fw-bold fs-4 rounded mx-5\" type=\"button\">Ajouter au panier pour \n            <span>").concat(tedFinder.price / 100, " \u20AC</span>\n            </button>\n        </div>\n      </div>\n        ")); ////////////////////// Ecoute du bouton d'envoi de commande //////////////////////

  productPrice.addEventListener("click", function (e) {
    // Boucle pour détecter quelle couleur est checked
    var qtyValue = document.getElementById("tedQuantity").value;
    var choosenColor = document.getElementsByName("colorChoice");
    var totalPrice = qtyValue * (tedFinder.price / 100);

    for (var i = 0; i < choosenColor.length; i++) {
      var coloring;

      if (choosenColor[i].checked) {
        (function () {
          //
          //////////////// Création et envoi des objets products dans le localStorage ///////////////
          var addToBasket = function addToBasket() {
            var tedParams = {
              _id: tedIdToCreate,
              quantity: tedQuantity.value,
              color: coloring,
              price: totalPrice
            };
            var getPanier = JSON.parse(localStorage.getItem("panier"));

            if (getPanier) {
              getPanier.push(JSON.stringify(tedParams));
              localStorage.setItem("panier", JSON.stringify(getPanier));
            } else {
              getPanier = [];
              getPanier.push(JSON.stringify(tedParams));
              localStorage.setItem("panier", JSON.stringify(getPanier));
            }
          }; //////////////////////////////////////////////////////////////////////////////////////


          var coloring = choosenColor[i].id;
          addToBasket();
          window.location.reload(); // Le reload indique plus clairement à l'utilisateur le transfert de son article dans le panier
        })();
      }
    }
  }); //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  // Ecoute de la quantité choisie

  tedQuantity.addEventListener("change", function (e) {
    var tedPrice = document.getElementById("productPrice");
    tedPrice.textContent = "Ajouter au panier pour ".concat(tedFinder.price / 100 * e.target.value, " \u20AC");
  });
}

; ///////////////////////////////////// Fin de create Teddy /////////////////////////////////////////////
// Créations des boutons de choix de couleurs en fonction du teddy séléctionné

var teddyColorator = function teddyColorator(tedFinder) {
  var colorContainer = document.getElementById("productColors");

  for (var i = 0; i < tedFinder.colors.length; i++) {
    var color = tedFinder.colors;
    colorContainer.insertAdjacentHTML("beforeend", "\n      <input type=\"radio\" class=\"color-option btn-check\" name=\"colorChoice\" id=\"".concat(color[i], "\" autocomplete=\"off\" checked>\n      <label class=\"btn scale-up fs-4\" for=\"").concat(color[i], "\" style=\"background-color: ").concat(color[i], "; width:8rem; height:5rem\">").concat(color[i], "</label>\n        "));
  }
};