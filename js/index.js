import { teddies } from "../datas.js";

window.onload = deleteTrashes;

const imgUrl = "./images/";

const addArticles = (teddies) => {
  const mainContainer = document.getElementById("teddyList");
  for (let i = 0; i < teddies.length; i++) {
    let iteddy = teddies[i];
    /*Créations des cartes des différents Teddy's en utilisant l'index des produits stockées en local, 
    ceci permet de rajouter facilement des produits sans rajouter de code*/
    mainContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="teddy col-12 col-lg-4">
        <div class="main-color scale-up card mb-4 mt-3 mt-lg-3 mb-lg-4 mx-lg-0 mx-md-5 shadow">
        <div class="card-body main-color position-relative">
        <img src="${imgUrl + iteddy.imageUrl}" alt="Teddy ${iteddy.name}" class="card-img-top main-color" style="height: 15rem">
        <h3 class="card-title fw-bold">${iteddy.name}</h3>
        <p class="card-text">${iteddy.description}</p>
        <a id="${iteddy._id}" class="btn btn-secondary bg-gradient rounded-pill stretched-link" href="produit.html?teddy=${iteddy._id}" role="button">
        Voir ce produit
        </a>
        <h4 class="card-subtitle btn rounded-pill fw-bolder fs-5 text-dark bg-light bg-gradient position-absolute end-0 mx-2">${iteddy.price / 100} €</h4></div></div>
        `
    );
  }
};

// Call the addArticles function after defining it
addArticles(teddies);


// Barre de recherche dynamique, fonctionnant par filtre, évolutive en fonction des produits proposés //
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
let localOrder = localStorage.getItem("orderN°");
if(localOrder){
localStorage.removeItem("orderN°");
}
}