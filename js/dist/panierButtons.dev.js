"use strict";

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

if (panier != null && panier.length > 0) {
  (function () {
    //// Bouton d'ajout ou supprresion d'1 article à la fois
    var qtyPlus = document.querySelectorAll(".btn.btn-outline-dark.plus");
    var qtyMoins = document.querySelectorAll(".btn.btn-outline-dark.moins");

    var _loop2 = function _loop2(_i2) {
      if (panier != 0 || panier != null) {
        // déplacer dans autre fichier JS //
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


if (cmdForm != null) {
  cmdForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendForm();
    createOrder();
  });
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