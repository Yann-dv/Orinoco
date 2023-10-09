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

if(panier != null && panier.length > 0) {
//// Bouton d'ajout ou supprresion d'1 article à la fois
const qtyPlus = document.querySelectorAll(".btn.btn-outline-dark.plus");
const qtyMoins = document.querySelectorAll(".btn.btn-outline-dark.moins");
for (let i = 0; i < panier.length; i++) {
  if (panier != 0 || panier != null) { // déplacer dans autre fichier JS //
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


if(cmdForm !=null) {
    cmdForm.addEventListener("submit", function(e) {
      e.preventDefault();
      sendForm(); 
      createOrder();
    });
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