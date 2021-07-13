"use strict";

var getLocalOrder = localStorage.getItem("orderN°");

var getPanier = function getPanier() {
  return JSON.parse(localStorage.getItem("panier"));
};

var setPanier = function setPanier(panierToStore) {
  localStorage.setItem("panier", JSON.stringify(panierToStore));
};

var panier = getPanier();
checkArticles();
emptyBasketHide();

function checkArticles() {
  if (panier != null && document.getElementById("panierBadge") != undefined) {
    panierBadge.textContent = panier.length;
    panierBadge.style.visibility = "visible";
  }
}

function emptyBasketHide() {
  if (document.getElementById("emptyBasket") != undefined) {
    if (panier != null) {
      emptyBasket.classList.remove("d-flex");
      emptyBasket.style.display = "none";
      createArticles();
    } else if (panier == null || panier == 0) {
      emptyBasket.classList.add("d-flex");
      emptyBasket.style.display = "visible";
    }
  }
}

function createArticles() {
  ///// Création d'un tableau pour recueillir les prix des articles et créer un total /////
  var arrayPrices = [0];
  panier.forEach(function (element) {
    var prices = element.fullPrice;
    arrayPrices.push(prices);
  });
  var finalPrice = arrayPrices.reduce(function (a, b) {
    return a + b;
  }, 0); // Object.values(arrayPrices).reduce((a, b) => a + b, 0);
  /////////////////////////////////////////////////////////////////////////////////////////

  basketContent.insertAdjacentHTML("beforeend", "<h2 class=\"link-anim\">Tous mes articles</h2>");
  summary.insertAdjacentHTML("beforeend", "<h2 class=\"link-anim\">R\xE9sum\xE9 de ma commande</h2>");
  summary.insertAdjacentHTML("beforeend", "<div id=\"cmdSummary\" class=\"main-color my-3 border border-dark rounded shadow px-3\">\n      <h5>Votre commande comprend :</h5>\n      <ul>\n        <li class=\"fs-3\">".concat(panier.length, " articles</li>\n        <li class=\"fs-3\"> Pour un prix total de : <span class=\"secondary-border secondary-color coloring-second\">").concat(finalPrice, "\u20AC</span></li>\n      </ul>\n      <p class=\"fs-4\">Remplissez le formulaire ci-contre pour finaliser votre commande <span class=\"coloring-second\">-> -> -></span></p>\n      </div>\n      "));
  commandForm.insertAdjacentHTML("beforeend", "\n    <div class=\"error d-none\">\n        <p>Il manque encore quelques informations pour pouvoir valider votre commande !</p>\n    </div>\n    <div>\n    <h2 class=\"link-anim mb-3\">Formulaire de commande</h2>\n      <form id=\"cmdForm\" class=\"py-3 px-5 main-color border border-dark rounded shadow\">\n        <div class=\"my-2 position-relative\">\n          <label for=\"firstName\" class=\"form-label fs-4 link-anim\">Pr\xE9nom :</label>\n          <input type=\"text\" pattern=\"^[a-zA-Z\\-]+$\" id=\"firstName\" class=\"form-control is-valide\" placeholder=\"John\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"secondName\" class=\"form-label fs-4 link-anim\">Nom :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z\\-]+$\" id=\"lastName\" class=\"form-control\" placeholder=\"Doe\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"address\" class=\"form-label fs-4 link-anim\">Adresse :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z0-9-\\s]+$\" id=\"address\" class=\"form-control\" placeholder=\"1 rue des Cerisiers\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"ville\" class=\"form-label fs-4 link-anim\">Ville :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z\\s\\-]+$\" id=\"city\" class=\"form-control\" placeholder=\"Paris\" required minlength=\"2\"/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"cp\" class=\"form-label fs-4 link-anim\">Code postal :</label> \n          <input type=\"text\" pattern=\"[0-9]{5}\" id=\"cp\" class=\"form-control\" placeholder=\"75005\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"mail\" class=\"form-label fs-4 link-anim\">E-mail :</label>\n          <input type=\"email\" pattern=\"[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}\" id=\"email\" class=\"form-control\" placeholder=\"jdoe@outlook.fr\" required/>\n        </div>\n        <div>\n          <input type=\"submit\" id=\"envoi\" class=\"btn btn-primary mt-2\" aria-label=\"Valider ma commande\" value=\"Valider ma commande\"/>\n          <input type=\"reset\" id=\"refresh\" class=\"btn btn-danger mt-2\" aria-label=\"Effacer ma saisie\" value=\"Effacer ma saisie\"/>\n        </div>\n    </form>\n    </div>\n  ");

  for (var i = 0; i < panier.length; i++) {
    basketContent.insertAdjacentHTML("beforeend", "\n        <div class=\"selectedArticles my-2 card rounded shadow ".concat(panier[i].productId, "\"> \n            <article class=\"main-color row g-0\">\n              <div class=\"main-color col-6\">\n              <a href=\"produit.html?teddy=").concat(panier[i].productId, "\"><img src=\"").concat(panier[i].imageUrl, "\" class=\"main-color img-fluid p-3\" title=\"Retourner vers la fiche produit\"></a>\n              </div>\n              <div class=\" col-6\">\n                <div class=\"card-body px-2 py-2\">\n                  <h5 class=\"secondary-text card-title\">").concat(panier[i].name, "</h5>\n                  <span class=\"articleQty card-text fs-5\">Quantit\xE9 : ").concat(panier[i].quantity, "</span></br>\n                  <span class=\"articleColor card-text fs-5\">Couleur : ").concat(panier[i].color, "</span></br>\n                  <span class=\"articlePrice card-text fs-5\">Prix : ").concat(panier[i].fullPrice, "\u20AC</span>\n                  <div id=\"changeQtyBtns\">\n                  <button class=\"btn py-0 px-2 btn-outline-dark rounded-pill fw-bold plus\" value=\"").concat(panier[i].cmdId, "\">+</button>\n                  <button class=\"btn py-0 px-2 btn-outline-dark rounded-pill fw-bold moins\" value=\"").concat(panier[i].cmdId, "\">-</button>\n                  </div>\n                </div>\n              </div>\n          </article>  \n          <button class=\"btn btn-outline-warning deleteArticle\" aria-label=\"Supprimer l'article\">Supprimer</button>\n        </div>\n      "));
  }

  basketContent.insertAdjacentHTML("beforeend", "\n    <button class=\"btn btn-outline-danger deletePanier\" aria-label=\"Supprimer l'ensemble du panier\">Vider mon panier</button>\n    ");
} //Fin creatArticle
// Bouton de suppresion d'article //


var deleteItem = document.querySelectorAll(".btn.deleteArticle");
var target = document.querySelectorAll("div.selectedArticles");

var _loop = function _loop(i) {
  deleteItem[i].addEventListener("click", function (event) {
    event.preventDefault();
    var id_delete_target = panier[i].cmdId;
    panier = panier.filter(function (el) {
      return el.cmdId !== id_delete_target;
    });
    setPanier(panier);
    window.location.reload(); // Si panier = vide, suppression du localStorage panier

    if (panier == 0 || panier == null) {
      localStorage.removeItem("panier");
    }
  });
};

for (var i = 0; i < deleteItem.length; i++) {
  _loop(i);
} //// Bouton de suppression du panier ////


var deletePanier = document.querySelectorAll(".btn.deletePanier");

for (var _i = 0; _i < deletePanier.length; _i++) {
  if (deletePanier[_i] != undefined && panier != 0 || panier != null) {
    deletePanier[_i].addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("panier");
      window.location.reload();
    });
  }
}

;

if (panier.length > 0) {
  (function () {
    //// Bouton d'ajout ou supprresion d'1 article à la fois
    var qtyPlus = document.querySelectorAll(".btn.btn-outline-dark.plus");
    var qtyMoins = document.querySelectorAll(".btn.btn-outline-dark.moins");

    var _loop2 = function _loop2(_i2) {
      if (panier != 0 || panier != null) {
        qtyPlus[_i2].addEventListener("click", function (e) {
          e.preventDefault();

          if (panier[_i2].cmdId == qtyPlus[_i2].value) {
            panier[_i2].quantity = parseInt(panier[_i2].quantity) + 1;
            panier[_i2].fullPrice = panier[_i2].fullPrice + panier[_i2].unitPrice;
            panier[_i2].cmdId = panier[_i2].name + panier[_i2].productId + panier[_i2].quantity + panier[_i2].color + panier[_i2].fullPrice;
            setPanier(panier);
            window.location.reload();
          }
        });

        qtyMoins[_i2].addEventListener("click", function (e) {
          e.preventDefault();

          if (panier[_i2].cmdId == qtyPlus[_i2].value) {
            if (panier[_i2].quantity >= 1) {
              panier[_i2].quantity = parseInt(panier[_i2].quantity) - 1;
              panier[_i2].fullPrice = panier[_i2].fullPrice - panier[_i2].unitPrice;
              panier[_i2].cmdId = panier[_i2].name + panier[_i2].productId + panier[_i2].quantity + panier[_i2].color + panier[_i2].fullPrice;
              panier = panier.filter(function (el) {
                return el.quantity !== 0;
              }); // Si élément à 0, on le supprime du local storage

              setPanier(panier);
              window.location.reload();
            }
          }
        });
      }
    };

    for (var _i2 = 0; _i2 < panier.length; _i2++) {
      _loop2(_i2);
    }

    ;
  })();
} // fin if panier
////////////////////// Ecoute du bouton d'envoi de commande //////////////////////
//Fonction du onsubmit du formulaire


function sendForm() {
  var formValues = {
    //Object pour localstorage
    firstName: document.querySelector('#firstName').value,
    lastName: document.querySelector('#lastName').value,
    address: document.querySelector('#address').value,
    city: document.querySelector('#city').value,
    cp: document.querySelector('#cp').value,
    email: document.querySelector('#email').value
  };
  localStorage.setItem("formValues", JSON.stringify(formValues)); //Envoi des données en local storage
}

;

function createOrder() {
  //////////////////Envoi de la commande via POST //////////
  var contact = JSON.parse(localStorage.getItem("formValues"));
  var products = [];
  panier.forEach(function (element) {
    var elementId = element.productId;
    products.push(elementId);
    debugger;
  });
  var data = {
    "contact": contact,
    "products": products
  };
  var result = fetch("http://localhost:3000/api/teddies/order", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
    // JSON.stringify() transforms JS object to JSON
    mode: 'cors',
    cache: 'default'
  }).then(function (response) {
    return response.text();
  }).then(function (result) {
    JSON.parse(result);
    localStorage.setItem("sendRequest", result);
    var order = JSON.parse(result).orderId;

    if (!getLocalOrder) {
      var orderNbr = [];
      orderNbr.push(order);
      localStorage.setItem("orderN°", orderNbr);
    } else if (getLocalOrder) {
      localStorage.removeItem("orderN°"); // Delete old orderN° if existing

      var _orderNbr = [];

      _orderNbr.push(order);

      localStorage.setItem("orderN°", _orderNbr);
    }
  })["catch"](function (error) {
    return console.log('error', error);
  });
  return result;
}

;

function goConfirm() {
  window.location.href = "./confirm.html"; // attente du numéro de commande pour charger la page de confirm
} //////////////////////////////////////////////////////////////////////////////////////

/*envoi.addEventListener("submit", function() {
  e.preventDefault();
  //window.location.href = "confirm.html";
});*/


cmdForm.addEventListener("submit", function (e) {
  e.preventDefault();
  sendForm();
  createOrder();
  setTimeout(function () {
    goConfirm();
  }, 500);
});

function deleteEmptypanier() {
  if (panier == 0 || panier == null) {
    localStorage.removeItem("panier");
    window.location.reload();
  }
} ///////////////Autoremplissage du formulaire si données déjà présente en local///////////


var localFormValues = localStorage.getItem("formValues");
var localFormValuesToObject = JSON.parse(localFormValues);

function autoCompleteForm(input) {
  if (localFormValuesToObject !== null) {
    document.querySelector('#firstName').value = localFormValuesToObject.firstName;
    document.querySelector('#lastName').value = localFormValuesToObject.lastName;
    document.querySelector('#address').value = localFormValuesToObject.address;
    document.querySelector('#city').value = localFormValuesToObject.city;
    document.querySelector('#cp').value = localFormValuesToObject.cp;
    document.querySelector('#email').value = localFormValuesToObject.email;
  }
}

autoCompleteForm();
window.onload = deleteEmptypanier(); // check au chargement de page, si pas de panier => reload page