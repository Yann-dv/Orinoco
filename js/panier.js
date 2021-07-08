//let gotPanier = JSON.parse(localStorage.getItem(`panier`));
const getPanier = () => {
  return localStorage.getItem(`panier`);
}
const setPanier = (panierToStore) => {
  localStorage.setItem('panier', JSON.stringify(panierToStore));
}
let panier = getPanier();
let parsedPanier = JSON.parse(panier);

checkArticles();
emptyBasketHide();
deleteArticle();

function checkArticles() {
  if (
    panier != null &&
    document.getElementById("panierBadge") != undefined
  ) {
    panierBadge.textContent = parsedPanier.length;
    panierBadge.style.visibility = "visible";
  }
}

function emptyBasketHide() {
  if (document.getElementById("emptyBasket") != undefined) {
    if (panier != null) {
      emptyBasket.classList.remove("d-flex");
      emptyBasket.style.display = "none";
      createArticles();
    }
  }
}

function createArticles() {
  ///// Création d'un tableau pour recueillir les prix des articles et créer un total /////
  const arrayPrices = [0]; 
  parsedPanier.forEach(element => {
    let prices = element.price;
    arrayPrices.push(prices);
  });
  let finalPrice = arrayPrices.reduce((a, b) => a + b, 0);
  // Object.values(arrayPrices).reduce((a, b) => a + b, 0);
/////////////////////////////////////////////////////////////////////////////////////////
  document.getElementById("panierBadge");
  basketContent.insertAdjacentHTML(
    "beforeend",
    `<h2 class="link-anim">Tous mes articles</h2>`
  ); debugger;
  summary.insertAdjacentHTML(
    "beforeend",
    `<h2 class="link-anim">Résumé de ma commande</h2>`
  );
  summary.insertAdjacentHTML(
    "beforeend",
    `<div id="cmdSummary" class="main-color my-3 border border-dark rounded shadow px-3">
      <h5>Votre commande comprend :</h5>
      <ul>
        <li class="fs-3">${panier.length} articles</li>
        <li class="fs-3"> Pour un prix total de : <span class="secondary-border secondary-color coloring-second">${finalPrice}€</span></li>
      </ul>
      <p class="fs-4">Remplissez le formulaire ci-contre pour finaliser votre commande <span class="coloring-second">-> -> -></span></p>
      </div>
      `
  );
  commandForm.insertAdjacentHTML(
    "beforeend",
    `
    <div class="error d-none">
        <p>Il manque encore quelques informations pour pouvoir valider votre commande !</p>
    </div>
    <div id="cmdForm">
    <h2 class="link-anim mb-3">Formulaire de commande</h2>
      <form class="py-3 px-5 main-color border border-dark rounded shadow">
        <div class="my-2 position-relative">
          <label for="firstname" class="form-label fs-4 link-anim">Nom :</label>
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="firstname" class="form-control is-valide" placeholder="John" required minlength="2"/>
        </div>
        <div class="my-2 position-relative">
          <label for="secondname" class="form-label fs-4 link-anim">Prénom :</label> 
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="secondname" class="form-control" placeholder="Doe" required minlength="2"/>
        </div>
        <div class="my-2 position-relative">
          <label for="adresse" class="form-label fs-4 link-anim">Adresse :</label> 
          <input type="text" pattern="^[a-zA-Z0-9-\\s]+$" id="adresse" class="form-control" placeholder="1 rue des Cerisiers" required/>
        </div>
        <div class="my-2 position-relative">
          <label for="ville" class="form-label fs-4 link-anim">Ville :</label> 
          <input type="text" pattern="^[a-zA-Z\\s\\-]+$" id="ville" class="form-control" placeholder="Paris" required minlength="2"/>
        </div>
        <div class="my-2 position-relative">
          <label for="cp" class="form-label fs-4 link-anim">Code postal :</label> 
          <input type="text" pattern="[0-9]{5}" id="cp" class="form-control" placeholder="75005" required/>
        </div>
        <div class="my-2 position-relative">
          <label for="mail" class="form-label fs-4 link-anim">E-mail :</label>
          <input type="email" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="mail" class="form-control" placeholder="jdoe@outlook.fr" required/>
        </div>
        <div>
          <input type="submit" class="btn btn-primary mt-2" id="envoi" value="Valider ma commande"/> 
          <input type="reset" id="refresh" class="btn btn-danger mt-2" value="Effacer ma saisie"/>
        </div>
    </form>
    </div>
  `
  );

  for (let i = 0; i < parsedPanier.length; i++) {
    basketContent.insertAdjacentHTML(
      "beforeend",
      `
        <div class="selectedArticles my-2 card rounded shadow"> 
            <article class="main-color row g-0">
              <div class="main-color col-6">
                <img src="${parsedPanier[i].imageUrl}" class="main-color img-fluid p-3">
              </div>
              <div class=" col-6">
                <div class="card-body px-2 py-2">
                  <h5 class="secondary-text card-title">${parsedPanier[i].name}</h5>
                  <span class="articleQty card-text fs-5">Quantité : ${parsedPanier[i].quantity}</span></br>
                  <span class="articleColor card-text fs-5">Couleur : ${parsedPanier[i].color}</span></br>
                  <span class="articlePrice card-text fs-5">Prix : ${parsedPanier[i].price}€</span>
                </div>
              </div>
          </article>  
          <button class="btn btn-outline-warning deleteArticle" aria-label"Supprimer l'article">Supprimer</button>
        </div>
      `
    );
  }
}

let deleting = document.getElementsByClassName('deleteArticle');
addEventListener("click", function (e) {
});


function deleteArticle() {
//
}
