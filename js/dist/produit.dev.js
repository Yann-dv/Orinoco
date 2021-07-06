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
  mainContainer.insertAdjacentHTML("beforeend", "\n      <div class=\"teddy col-12 col-lg-6\">\n        <div class=\"product-image main-color\">\n            <img src=\"".concat(tedFinder.imageUrl, "\" alt=\"Teddy\" class=\"img-fluid p-3\">\n        </div>\n      </div>\n      <div class=\"teddy col-12 col-lg-6 main-color px-3\">\n        <div class=\"product-desc\">\n            <h2 class=\"fw-bold text-center\">").concat(tedFinder.name, "</h2>\n            <p class=\"fs-5\">").concat(tedFinder.description, "</p>\n            <h5 class=\"font-lg fw-bold\">Choisissez une couleur pour votre teddy :</h5>\n            <div class=\"container colors-container\">\n              <div class=\"m-auto d-flex flex-nowrap justify-content-between\" id=\"productColors\">\n              </div>\n            </div>\n            <label class=\"m-2 fs-5 selectQuantity\">Quantit\xE9 :\n            <select id=\"tedQuantity\">\n            <option value=\"1\">1</option>\n            <option value=\"2\">2</option>\n            <option value=\"3\">3</option>\n            <option value=\"4\">4</option>\n            <option value=\"5\">5</option>\n            <option value=\"6\">6</option>\n            <option value=\"7\">7</option>\n            <option value=\"8\">8</option>\n            <option value=\"9\">9</option>\n            <option value=\"10\">10</option>\n            </select>\n            </label>\n            <button id=\"productPrice\" class=\"btn btn-secondary bg-gradientp-2 d-flex flex-nowrap w-full bg-secondary text-white fw-bold fs-4 rounded\" type=\"button\">Ajouter au panier pour \n            <span class=\"ms-2\">").concat(tedFinder.price / 100, "\u20AC</span>\n            </button>\n        </div>\n      </div>\n        ")); ////////////////////// Ecoute du bouton d'envoi de commande //////////////////////

  productPrice.addEventListener("click", function (e) {
    // Boucle pour détecter quelle couleur est checked
    var qtyValue = document.getElementById("tedQuantity").value; //var choosenColor = document.getElementsByName("colorChoice");

    var totalPrice = qtyValue * (tedFinder.price / 100);
    var checkedColor = document.querySelector('input[name = "colorChoice"]:checked');
    var coloringArray = []; // Tableau pout stocker la couleur choisie
    //////////////// Création et envoi des objets products dans le localStorage ///////////////

    function addToBasket() {
      if (checkedColor != null) {
        // Nécessite la coche d'un des btns de couleurs pour appuyer sur l'envoi
        coloringArray.push(checkedColor.value);
        console.log(coloringArray); //////////// Objet de création de teddy //////////////////////////

        var tedParams = {
          name: tedFinder.name,
          _id: tedIdToCreate,
          quantity: tedQuantity.value,
          color: coloringArray,
          price: totalPrice,
          imageUrl: tedFinder.imageUrl
        }; //////////////////////////////////////////////////////////////////

        if (getPanier != null) {
          var thisTed = tedIdToCreate;

          for (var i = 0; i < JSON.stringify(getPanier.length); i++) {
            var thisColor = checkedColor.value;

            if ( //console.log(JSON.parse(getPanier[2])._id)
            thisTed == JSON.parse(getPanier[i])._id && thisColor == JSON.parse(getPanier[i]).color) {
              //Si teddy déjà présent, same id + color, alors on l'ajoute
              console.log("Teddy déjà présent, on rajoute qty et price");
              console.log("Found : ".concat(thisTed));
              console.log("Found : ".concat(thisColor));
              break;
            } else {
              // Si teddy non existant, on le crée dans le panier
              //getPanier = [];
              getPanier.push(JSON.stringify(tedParams));
              localStorage.setItem("panier", JSON.stringify(getPanier));
              console.log("Si pas de teddy, on l'ajoute");
              break;
            }
          }
        } else if (getPanier == null) {
          // Si panier inexistant, création puis push
          getPanier = [];
          getPanier.push(JSON.stringify(tedParams));
          localStorage.setItem("panier", JSON.stringify(getPanier));
          console.log("Panier vide, création");
        }
      } //////////////////////////////////////////////////////////////////////////////////////
      //window.location.reload();
      // Le reload indique plus clairement à l'utilisateur le transfert de son article dans le panier
      else {
          alert("Veuillez séléctionner une couleur pour votre produit.");
        }
    } //fin de checkedColor


    addToBasket();
  }); //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  // Ecoute de la quantité choisie

  tedQuantity.addEventListener("change", function (e) {
    var tedPrice = document.getElementById("productPrice");
    tedPrice.textContent = "Ajouter au panier pour ".concat(tedFinder.price / 100 * e.target.value, " \u20AC");
  });
} ///////////////////////////////////// Fin de create Teddy /////////////////////////////////////////////
// Créations des boutons de choix de couleurs en fonction du teddy séléctionné


var teddyColorator = function teddyColorator(tedFinder) {
  var colorContainer = document.getElementById("productColors");

  for (var i = 0; i < tedFinder.colors.length; i++) {
    var color = tedFinder.colors;
    colorContainer.insertAdjacentHTML("beforeend", "\n      <input type=\"radio\" class=\"color-option btn-check\" value=\"".concat(color[i], "\" name=\"colorChoice\" id=\"").concat(color[i], "\" autocomplete=\"off\">\n      <label class=\"color-btn btn fs-4\" for=\"").concat(color[i], "\" style=\"background-color: ").concat(color[i], "\">").concat(color[i], "</label>\n      "));
  }
};