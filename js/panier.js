let getPanier = JSON.parse(localStorage.getItem(`panier`));
let getTotalPanier = JSON.stringify(getPanier.length);
//let idFinder = ;
// console.log(JSON.parse(getPanier[2]).color)

checkArticles();
emptyBasketHide();
deleteArticle();

function checkArticles() {
  if (
    getPanier != null &&
    document.getElementById("panierBadge") != undefined
  ) {
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
  basketContent.insertAdjacentHTML(
    "beforeend",
    `<h2 class="link-anim">Tous mes articles</h2>`
  );
  summary.insertAdjacentHTML(
    "beforeend",
    `<h2 class="link-anim">Résumé de ma commande</h2>`
  );
  summary.insertAdjacentHTML(
    "beforeend",
    `<div id="cmdSummary" class="main-color my-3 border border-dark px-3">
      <h5>Votre commande comprend :</h5>
      <ul>
        <li class="fs-3">${getPanier.length} articles</li>
        <li class="fs-3"> Pour un prix total de : ${JSON.parse(getPanier[getTotalPanier.length]).price}€></li>
      </ul>
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
      <form class="py-3 px-5 main-color">
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
          <input type="submit" class="btn btn-primary" id="envoi" value="Envoyer ma commande"/> 
          <input type="reset" id="refresh" class="btn btn-danger" value="Effacer ma saisie"/>
        </div>
    </form>
    </div>
  `
  );
  for (let i = 0; i < getTotalPanier; i++) {
    basketContent.insertAdjacentHTML(
      "beforeend",
      `
        <div class="selectedArticles d-flex">
          <article class="choosenTeddy">
            <div class="main-color card my-2 shadow">
              <div class="main-color position-relative d-flex">
              <img src="${JSON.parse(getPanier[i]).imageUrl}" class="main-color img-fluid p-3 basket-card">
              <div class="article-content d-flex flex-column px-2 py-2">
                <h5 class="secondary-text">${JSON.parse(getPanier[i]).name}</h5>
                <span class="articleQty fs-5">Quantité : ${JSON.parse(getPanier[i]).quantity}</span>
                <span class="articleColor fs-5">Couleur : ${JSON.parse(getPanier[i]).color}</span>
                <span class="articlePrice fs-5">Prix : ${JSON.parse(getPanier[i]).price}€</span>
              </div>
            </div>
            <button id="delete" class="btn btn-outline-warning">Supprimer</button>
          </article>  
        </div>
      `
    );
  }
}


function deleteArticle() {
//
}
