"use strict";

var localStoragePanier = localStorage.getItem("panier");
/*const getColor = (color) {
  if (color === 'Pale brown') rturn '#fd4fd';
}*/
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
    addToBasket(tedFinder);
  }); // Fin addeventlistener
  //////////////////////////////////////////////////////////////////////////////////////
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
}; //////////////// Création et envoi des objets products dans le localStorage ///////////////


function addToBasket(tedFinder) {
  // récupère le panier récent
  var panier = getPanier();
  var qtyValue = document.getElementById("tedQuantity").value;
  var totalPrice = qtyValue * (tedFinder.price / 100);
  var isCheckedColor = document.querySelector('input[name = "colorChoice"]:checked');
  var colorBtnValue = document.querySelector('input[name = "colorChoice"]:checked').value;
  var SEARCHED_TEDDY_ID = tedIdToCreate;
  var SEARCHED_TEDDY_COLOR = colorBtnValue; //////////// Création des objets teddy //////////////////////////

  var tedParams = {
    name: tedFinder.name,
    _id: tedIdToCreate,
    quantity: parseInt(qtyValue.value, 10),
    color: colorBtnValue,
    price: totalPrice,
    imageUrl: tedFinder.imageUrl
  }; /////////////////////////////////////////////////////////////////

  if (isCheckedColor != null) {
    // Nécessite la coche d'un des btns de couleurs pour appuyer sur l'envoi
    if (panier != null) {
      var foundIndex = -1;

      for (var i = 0; i < panier.length; i++) {
        if (panier[i]._id == SEARCHED_TEDDY_ID && panier[i].color == SEARCHED_TEDDY_COLOR) {
          foundIndex = i;
          panier[foundIndex].quantity = panier[foundIndex].quantity + 1;
          setPanier(); // add changer price

          console.log("Ici");
        } else {
          console.log('là'); // si même id mais pas même couleur et teddy déjà dans le panier
        }
      } //fin de boucle for i

    } else if (panier == null) {
      // Si panier inexistant, création puis push
      panier = [];
      panier.push(tedParams);
      localStorage.setItem("panier", JSON.stringify(panier));
      console.log("Panier vide, création");
      console.log(tedFinder._id);
      console.log(panier[0].color);
    } //////////////////////////////////////////////////////////////////////////////////////
    //window.location.reload();
    // Le reload indique plus clairement à l'utilisateur le transfert de son article dans le panier

  } // fin de checkedcolor
  else if (isCheckedColor == null) {
      alert("Veuillez séléctionner une couleur pour votre produit."); // Si pas de couleur checked, message d'alerte et pas d'envoi
    }
} //fin de addToBasket