//const e = require("express");
const getLocalOrder = localStorage.getItem("orderN°");

const getPanier = () => {
  return JSON.parse(localStorage.getItem(`panier`));
};
const setPanier = (panierToStore) => {
  localStorage.setItem("panier", JSON.stringify(panierToStore));
};
let panier = getPanier();

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
  const arrayPrices = [0];
  panier.forEach((element) => {
    let prices = element.fullPrice;
    arrayPrices.push(prices);
  });
  let finalPrice = arrayPrices.reduce((a, b) => a + b, 0);
  // Object.values(arrayPrices).reduce((a, b) => a + b, 0);
  /////////////////////////////////////////////////////////////////////////////////////////

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
    <div>
    <h2 class="link-anim mb-3">Formulaire de commande</h2>
      <form id="cmdForm" class="py-3 px-5 main-color border border-dark rounded shadow">
        <div class="my-2 position-relative">
          <label for="firstName" class="form-label fs-4 link-anim">Prénom :</label>
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="firstName" class="form-control is-valide" placeholder="John" required/>
        </div>
        <div class="my-2 position-relative">
          <label for="secondName" class="form-label fs-4 link-anim">Nom :</label> 
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="lastName" class="form-control" placeholder="Doe" required/>
        </div>
        <div class="my-2 position-relative">
          <label for="address" class="form-label fs-4 link-anim">Adresse :</label> 
          <input type="text" pattern="^[a-zA-Z0-9-\\s]+$" id="address" class="form-control" placeholder="1 rue des Cerisiers" required/>
        </div>
        <div class="my-2 position-relative">
          <label for="ville" class="form-label fs-4 link-anim">Ville :</label> 
          <input type="text" pattern="^[a-zA-Z\\s\\-]+$" id="city" class="form-control" placeholder="Paris" required minlength="2"/>
        </div>
        <div class="my-2 position-relative">
          <label for="cp" class="form-label fs-4 link-anim">Code postal :</label> 
          <input type="text" pattern="[0-9]{5}" id="cp" class="form-control" placeholder="75005" required/>
        </div>
        <div class="my-2 position-relative">
          <label for="mail" class="form-label fs-4 link-anim">E-mail :</label>
          <input type="email" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="email" class="form-control" placeholder="jdoe@outlook.fr" required/>
        </div>
        <div>
          <input type="submit" id="envoi" class="btn btn-primary mt-2" aria-label="Valider ma commande" value="Valider ma commande"/>
          <input type="reset" id="refresh" class="btn btn-danger mt-2" aria-label="Effacer ma saisie" value="Effacer ma saisie"/>
        </div>
    </form>
    </div>
  `
  );

  for (let i = 0; i < panier.length; i++) {
    basketContent.insertAdjacentHTML(
      "beforeend",
      `
        <div class="selectedArticles my-2 card rounded shadow ${panier[i].productId}"> 
            <article class="main-color row g-0">
              <div class="main-color col-6">
              <a href="produit.html?teddy=${panier[i].productId}"><img src="${panier[i].imageUrl}" class="main-color img-fluid p-3" title="Retourner vers la fiche produit"></a>
              </div>
              <div class=" col-6">
                <div class="card-body px-2 py-2">
                  <h5 class="secondary-text card-title">${panier[i].name}</h5>
                  <span class="articleQty card-text fs-5">Quantité : ${panier[i].quantity}</span></br>
                  <span class="articleColor card-text fs-5">Couleur : ${panier[i].color}</span></br>
                  <span class="articlePrice card-text fs-5">Prix : ${panier[i].fullPrice}€</span>
                  <div id="changeQtyBtns">
                  <button class="btn py-0 px-2 btn-outline-dark rounded-pill fw-bold plus" value="${panier[i].cmdId}">+</button>
                  <button class="btn py-0 px-2 btn-outline-dark rounded-pill fw-bold moins" value="${panier[i].cmdId}">-</button>
                  </div>
                </div>
              </div>
          </article>  
          <button class="btn btn-outline-warning deleteArticle" aria-label="Supprimer l'article">Supprimer</button>
        </div>
      `
    );
  }
  
  basketContent.insertAdjacentHTML(
    "beforeend",
    `
    <button class="btn btn-outline-danger deletePanier" aria-label="Supprimer l'ensemble du panier">Vider mon panier</button>
    `
  );
} //Fin creatArticle

// Bouton de suppresion d'article //
const deleteItem = document.querySelectorAll(".btn.deleteArticle");
let target = document.querySelectorAll("div.selectedArticles");

for (let i = 0; i < deleteItem.length; i++) {
  deleteItem[i].addEventListener("click", (event) => {
    event.preventDefault();
    let id_delete_target = panier[i].cmdId;
    panier = panier.filter((el) => el.cmdId !== id_delete_target);
    setPanier(panier);
    window.location.reload();
    // Si panier = vide, suppression du localStorage panier
    if (panier == 0 || panier == null) {
      localStorage.removeItem("panier");
    }
  });
}

//// Bouton de suppression du panier ////
const deletePanier = document.querySelectorAll(".btn.deletePanier");
for (let i = 0; i < deletePanier.length; i++) {
  if ((deletePanier[i] != undefined && panier != 0) || panier != null) {
    deletePanier[i].addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("panier");
      window.location.reload();
    });
  }
};

if(panier.length > 0) {
//// Bouton d'ajout ou supprresion d'1 article à la fois
const qtyPlus = document.querySelectorAll(".btn.btn-outline-dark.plus");
const qtyMoins = document.querySelectorAll(".btn.btn-outline-dark.moins");
for (let i = 0; i < panier.length; i++) {
  if (panier != 0 || panier != null) {
    qtyPlus[i].addEventListener("click", (e) => {
      e.preventDefault();
      if (panier[i].cmdId == qtyPlus[i].value) {
        panier[i].quantity = parseInt(panier[i].quantity) + 1;
        panier[i].fullPrice = panier[i].fullPrice + panier[i].unitPrice;
        panier[i].cmdId = panier[i].name+panier[i].productId+panier[i].quantity+panier[i].color+panier[i].fullPrice;
        setPanier(panier);
        window.location.reload();
      }
    });
    qtyMoins[i].addEventListener("click", (e) => {
      e.preventDefault();
      if (panier[i].cmdId == qtyPlus[i].value) {
        if (panier[i].quantity >= 1) {
        panier[i].quantity = parseInt(panier[i].quantity) - 1;
        panier[i].fullPrice = panier[i].fullPrice - panier[i].unitPrice;
        panier[i].cmdId = panier[i].name+panier[i].productId+panier[i].quantity+panier[i].color+panier[i].fullPrice;
        panier = panier.filter((el) => el.quantity !== 0);// Si élément à 0, on le supprime du local storage
        setPanier(panier);
        window.location.reload();
        }
      } 
    });
  }
};
}// fin if panier

  ////////////////////// Ecoute du bouton d'envoi de commande //////////////////////
  //Fonction du onsubmit du formulaire
      
  function sendForm () {
      const formValues = { //Object pour localstorage
      firstName: document.querySelector('#firstName').value,
      lastName: document.querySelector('#lastName').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value, 
      cp: document.querySelector('#cp').value,
      email: document.querySelector('#email').value,
    }
    localStorage.setItem("formValues", JSON.stringify(formValues)); //Envoi des données en local storage
  };
  
   function createOrder() {
     //////////////////Envoi de la commande via POST //////////
      const contact = JSON.parse(localStorage.getItem("formValues"));
      const products = [];
      panier.forEach(element => {
        let elementId = element.productId;
        products.push(elementId);
        debugger;
      });
      const data = {"contact": contact,"products": products}
      const result = fetch("http://localhost:3000/api/teddies/order", { 
              headers: {
              'Content-Type': 'application/json'
              },
              method: 'POST',
              
              body: JSON.stringify(data), // JSON.stringify() transforms JS object to JSON
              mode: 'cors',
              cache: 'default'
          })
          .then(response => response.text())
          .then(function (result) {
            JSON.parse(result);
            
            let order = JSON.parse(result).orderId;
            if (!getLocalOrder) {
            const orderNbr = [];
            orderNbr.push(order);
            localStorage.setItem("orderN°", orderNbr);
            }
            else if (getLocalOrder) {
            localStorage.removeItem("orderN°"); // Delete old orderN° if existing
            const orderNbr = [];
            orderNbr.push(order);
            localStorage.setItem("orderN°", orderNbr);
            }
          })
          .catch(error => console.log('error', error));
      return result
      
    };

    function goConfirm() {
      if (getLocalOrder) {
        window.location.href = ".//confirm.html"; // attente du numéro de commande pour charger la page de confirm
    }
    }
  //////////////////////////////////////////////////////////////////////////////////////

  /*envoi.addEventListener("submit", function() {
    e.preventDefault();
    //window.location.href = "confirm.html";
  });*/
  cmdForm.addEventListener("submit", function(e) {
    e.preventDefault();
    sendForm(); 
    createOrder();
    goConfirm();
  });

function deleteEmptypanier () {
  if (panier == 0 || panier == null) {
    localStorage.removeItem("panier");
    window.location.reload();
  }
}

///////////////Autoremplissage du formulaire si données déjà présente en local///////////
const localFormValues = localStorage.getItem("formValues");
const localFormValuesToObject = JSON.parse(localFormValues);

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
