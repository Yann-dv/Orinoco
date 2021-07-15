"use strict";

window.onload = deleteTrashes;
fetch("http://localhost:3000/api/teddies").then(function (res) {
  if (res.ok) {
    return res.json();
  }
}).then(function (value) {
  // Stockage en local des listes de produits récupérés via l'API
  JSON.stringify(value);
  addArticles(value);
})["catch"](function (err) {// Une erreur est survenue
});

var addArticles = function addArticles(teddies) {
  var mainContainer = document.getElementById("teddyList");

  for (var i = 0; i < teddies.length; i++) {
    var iteddy = teddies[i];
    /*Créations des cartes des différents Teddy's en utilisant l'index des produits stockées en local, 
    ceci permet de rajouter facilement des produits sans rajouter de code*/

    mainContainer.insertAdjacentHTML("beforeend", "\n      <div class=\"teddy col-12 col-lg-4\">\n        <div class=\"main-color scale-up card mb-4 mt-3 mt-lg-3 mb-lg-4 mx-lg-0 mx-md-5 shadow\">\n        <div class=\"card-body main-color position-relative\">\n        <img src=\"".concat(iteddy.imageUrl, "\" alt=\"Teddy ").concat(iteddy.name, "\" class=\"card-img-top main-color\" style=\"height: 15rem\">\n        <h3 class=\"card-title fw-bold\">").concat(iteddy.name, "</h3>\n        <p class=\"card-text\">").concat(iteddy.description, "</p>\n        <a id=\"").concat(iteddy._id, "\" class=\"btn btn-secondary bg-gradient rounded-pill stretched-link\" href=\"produit.html?teddy=").concat(iteddy._id, "\" role=\"button\">\n        Voir ce produit\n        </a>\n        <h4 class=\"card-subtitle btn rounded-pill fw-bolder fs-5 text-dark bg-light bg-gradient position-absolute end-0 mx-2\">").concat(iteddy.price / 100, " \u20AC</h4></div></div>\n        "));
  }
}; // Barre de recherche dynamique, fonctionnant par filtre, évolutive en fonction des produits proposés //


document.querySelector("#searchInput").addEventListener("keyup", function (e) {
  var recherche = this.value.toLowerCase();
  var documents = document.querySelectorAll(".teddy"); // Evolutif si l'on souhaite rajouter par la suite des listes de produits //

  Array.prototype.forEach.call(documents, function (document) {
    if (document.innerHTML.toLowerCase().indexOf(recherche) > -1) {
      document.style.display = "flex"; // Display flex afin de conserver la mise ne page //
    } else {
      document.style.display = "none"; // Display none, rendu centré sur les produits recherchés //
    }
  });
});

function deleteTrashes() {
  var localOrder = localStorage.getItem("orderN°");

  if (localOrder) {
    localStorage.removeItem("orderN°");
  }
}