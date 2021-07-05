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
  document.getElementById("panierBadge");
  basketContent.insertAdjacentHTML("beforeend", "<h2 class=\"link-anim\">Tous mes articles</h2>");
  summary.insertAdjacentHTML("beforeend", "<h2 class=\"link-anim\">R\xE9sum\xE9 de ma commande</h2>");
  summary.insertAdjacentHTML("beforeend", "<div id=\"cmdForm\">\n      <form class=\"mt-4 py-3 px-5 main-color\">\n      ");
  commandForm.insertAdjacentHTML("beforeend", "\n    <div class=\"error d-none\">\n        <p>Il manque encore quelques informations pour pouvoir valider votre commande !</p>\n    </div>\n    <div id=\"cmdForm\">\n    <h2 class=\"link-anim\">Formulaire de commande</h2>\n      <form class=\"mt-4 py-3 px-5 main-color\">\n        <div class=\"my-2 position-relative\">\n          <label for=\"firstname\" class=\"form-label fs-4 link-anim\">Nom :</label>\n          <input type=\"text\" pattern=\"^[a-zA-Z\\-]+$\" id=\"firstname\" class=\"form-control is-valide\" placeholder=\"John\" required minlength=\"2\"/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"secondname\" class=\"form-label fs-4 link-anim\">Pr\xE9nom :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z\\-]+$\" id=\"secondname\" class=\"form-control\" placeholder=\"Doe\" required minlength=\"2\"/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"adresse\" class=\"form-label fs-4 link-anim\">Adresse :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z0-9-\\s]+$\" id=\"adresse\" class=\"form-control\" placeholder=\"1 rue des Cerisiers\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"ville\" class=\"form-label fs-4 link-anim\">Ville :</label> \n          <input type=\"text\" pattern=\"^[a-zA-Z\\s\\-]+$\" id=\"ville\" class=\"form-control\" placeholder=\"Paris\" required minlength=\"2\"/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"cp\" class=\"form-label fs-4 link-anim\">Code postal :</label> \n          <input type=\"text\" pattern=\"[0-9]{5}\" id=\"cp\" class=\"form-control\" placeholder=\"75005\" required/>\n        </div>\n        <div class=\"my-2 position-relative\">\n          <label for=\"mail\" class=\"form-label fs-4 link-anim\">E-mail :</label>\n          <input type=\"email\" pattern=\"[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}\" id=\"mail\" class=\"form-control\" placeholder=\"jdoe@outlook.fr\" required/>\n        </div>\n        <div>\n          <input type=\"submit\" class=\"btn btn-primary\" id=\"envoi\" value=\"Envoyer ma commande\"/> \n          <input type=\"reset\" id=\"refresh\" class=\"btn btn-danger\" value=\"Effacer ma saisie\"/>\n        </div>\n    </form>\n    </div>\n  ");

  for (var i = 0; i < getTotalPanier; i++) {
    basketContent.insertAdjacentHTML("beforeend", "\n        <div class=\"selectedArticles d-flex\">\n          <article class=\"choosenTeddy\">\n            <div class=\"main-color card my-2 shadow\">\n              <div class=\"main-color position-relative d-flex\">\n              <img src=\"".concat(JSON.parse(getPanier[i]).imageUrl, "\" class=\"main-color img-fluid p-3 basket-card\">\n              <div class=\"article-content d-flex flex-column px-2 py-2\">\n                <h5>").concat(JSON.parse(getPanier[i]).name, "</h5\n                <span class=\"articleQty\">Quantit\xE9 : ").concat(JSON.parse(getPanier[i]).quantity, "</span>\n                <span class=\"articleColor\">Couleur : ").concat(JSON.parse(getPanier[i]).color, "</span>\n                <span class=\"articlePrice\">Prix : ").concat(JSON.parse(getPanier[i]).price, "</span>\n              </div>\n            </div>\n            <button id=\"delete\" class=\"btn btn-outline-warning\">Supprimer</button>\n          </article>  \n        </div>\n      "));
  }
}

function deleteArticle() {//
}