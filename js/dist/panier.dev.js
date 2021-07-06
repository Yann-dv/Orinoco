"use strict";

var getPanier = JSON.parse(localStorage.getItem("panier"));
var getTotalPanier = JSON.stringify(getPanier.length); //let idFinder = ;
// console.log(JSON.parse(getPanier[2]).color)

checkArticles();
emptyBasketHide();
deleteArticle();

function checkArticles() {
  if (getPanier != null && document.getElementById("panierBadge") != undefined) {
    panierBadge.textContent = getTotalPanier;
    panierBadge.style.visibility = "visible";
  }
}

function emptyBasketHide() {
  if (document.getElementById("emptyBasket") != undefined) {
    if (getPanier != null) {
      emptyBasket.classList.remove("d-flex");
      emptyBasket.style.display = "none";
      createArticles();
    }
  }
}

function createArticles() {
  ///// Création d'un tableau pour recueillir les prix des articles et créer un total /////
  var arrayPrices = [0];
  getPanier.forEach(function (element) {
    var prices = JSON.parse(element).price;
    arrayPrices.push(prices);
  });
  var finalPrice = Object.values(arrayPrices).reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log(arrayPrices);
  console.log(Object.values(arrayPrices).reduce(function (a, b) {
    return a + b;
  }, 0)); /////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById("panierBadge");
  basketContent.insertAdjacentHTML("beforeend", "<h2 class=\"link-anim\">Tous mes articles</h2>");
  summary.insertAdjacentHTML("beforeend", "<h2 class=\"link-anim\">R\xE9sum\xE9 de ma commande</h2>");
  summary.insertAdjacentHTML("beforeend", "<div id=\"cmdSummary\" class=\"main-color my-3 border border-dark rounded shadow px-3\">\n      <h5>Votre commande comprend :</h5>\n      <ul>\n        <li class=\"fs-3\">".concat(getPanier.length, " articles</li>\n        <li class=\"fs-3\"> Pour un prix total de : <span class=\"secondary-border secondary-color coloring-second\">").concat(JSON.parse(finalPrice), "\u20AC</span></li>\n      </ul>\n      <p class=\"fs-4\">Remplissez le formulaire ci-contre pour finaliser votre commande <span class=\"coloring-second\">-> -> -></span></p>\n      </div>\n      "));
  commandForm.insertAdjacentHTML("beforeend", "\n    <div class=\"error d-none\">\n        <p>Il manque encore quelques informations pour pouvoir valider votre commande !</p>\n    </div>\n    <div id=\"cmdForm\">\n    <h2 class=\"link-anim mb-3\">Formulaire de commande</h2>\n      <form class=\"py-3 px-5 main-color border border-dark rounded shadow\">\n        <div class=\"my-2 position-relative\">\n          <label for=\"firstname\" class=\"form-label fs-4 link-anim\">Nom :</label>\n          <input type=\"text\" pattern=\"^[a-zA-Z\\-]+$\" id=\"firstname\" class=\"form-control is-valide\" placeholder=\"John\" required minlength=\"2\"/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"secondname\" class=\"form-label fs-4 link-anim\">Pr\xE9nom :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z\\-]+$\" id=\"secondname\" class=\"form-control\" placeholder=\"Doe\" required minlength=\"2\"/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"adresse\" class=\"form-label fs-4 link-anim\">Adresse :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z0-9-\\s]+$\" id=\"adresse\" class=\"form-control\" placeholder=\"1 rue des Cerisiers\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"ville\" class=\"form-label fs-4 link-anim\">Ville :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z\\s\\-]+$\" id=\"ville\" class=\"form-control\" placeholder=\"Paris\" required minlength=\"2\"/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"cp\" class=\"form-label fs-4 link-anim\">Code postal :</label> \n          <input type=\"text\" pattern=\"[0-9]{5}\" id=\"cp\" class=\"form-control\" placeholder=\"75005\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"mail\" class=\"form-label fs-4 link-anim\">E-mail :</label>\n          <input type=\"email\" pattern=\"[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}\" id=\"mail\" class=\"form-control\" placeholder=\"jdoe@outlook.fr\" required/>\n        </div>\n        <div>\n          <input type=\"submit\" class=\"btn btn-primary mt-2\" id=\"envoi\" value=\"Valider ma commande\"/> \n          <input type=\"reset\" id=\"refresh\" class=\"btn btn-danger mt-2\" value=\"Effacer ma saisie\"/>\n        </div>\n    </form>\n    </div>\n  ");

  for (var i = 0; i < getTotalPanier; i++) {
    basketContent.insertAdjacentHTML("beforeend", "\n        <div class=\"selectedArticles my-2 card rounded shadow\"> \n            <article class=\"main-color row g-0\">\n              <div class=\"main-color col-6\">\n                <img src=\"".concat(JSON.parse(getPanier[i]).imageUrl, "\" class=\"main-color img-fluid p-3\">\n              </div>\n              <div class=\" col-6\">\n                <div class=\"card-body px-2 py-2\">\n                  <h5 class=\"secondary-text card-title\">").concat(JSON.parse(getPanier[i]).name, "</h5>\n                  <span class=\"articleQty card-text fs-5\">Quantit\xE9 : ").concat(JSON.parse(getPanier[i]).quantity, "</span></br>\n                  <span class=\"articleColor card-text fs-5\">Couleur : ").concat(JSON.parse(getPanier[i]).color, "</span></br>\n                  <span class=\"articlePrice card-text fs-5\">Prix : ").concat(JSON.parse(getPanier[i]).price, "\u20AC</span>\n                </div>\n              </div>\n          </article>  \n          <button class=\"btn btn-outline-warning deleteArticle\" aria-label\"Supprimer l'article\">Supprimer</button>\n        </div>\n      "));
  }
}

var deleting = document.getElementsByClassName('deleteArticle');
addEventListener("click", function (e) {});

function deleteArticle() {//
}