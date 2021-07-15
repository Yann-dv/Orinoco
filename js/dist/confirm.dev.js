"use strict";

var totalPrice = [0];
panier.forEach(function (element) {
  var allPrices = element.fullPrice;
  totalPrice.push(allPrices);
});
var commandPrice = totalPrice.reduce(function (a, b) {
  return a + b;
}, 0);
var localOrder = localStorage.getItem("orderN°");
confirmation.insertAdjacentHTML("beforeend", "\n    <h1 class=\"my-3 fw-bold confirm-text-animation\"> F\xE9licitations, votre commande est confirm\xE9e !</h1>\n    <h2 class=\"fs-2 my-3 secondary-underline\">Mon r\xE9capitulatif de commande :</h2>\n    <h4 class=\"my-3\">Commande n\xB0: <strong>".concat(localOrder, "</strong></h4>\n    <span class=\"articleQty card-text fs-4\">Nombre d'articles : ").concat(panier.length, "</span></br>\n    <span class=\"mb-2 articlePrice card-text fs-4\">Prix : ").concat(commandPrice, "\u20AC</span>\n    <p class=\"fs-5\">Une copie de cette confirmation va vous \xEAtre envoy\xE9e par email d'ici quelques minutes.</p>\n    <p class=\"fs-5 mb-3\">Votre commande sera exp\xE9di\xE9e d'ici 48h, merci pour votre achat. A bientot sur Orinoco !</p>\n   \n    \n    ")); //// On exiting confirm page, deleting localStorage elements, except formValues for auto-completion ////

window.onbeforeunload = function () {
  localStorage.removeItem("panier");
  localStorage.removeItem("orderN°");
  window.location.href = "index.html";
};