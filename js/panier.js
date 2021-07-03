checkArticles();
emptyBasketHide();

function checkArticles() {
  let getPanier = JSON.parse(localStorage.getItem(`panier`));
  if(getPanier != null && (document.getElementById('panierBadge')) != undefined) {
  let getArticles = JSON.stringify(getPanier.length);
    panierBadge.textContent = getArticles;
    panierBadge.style.visibility = "visible";
  }
}

function emptyBasketHide() {
  let getPanier = JSON.parse(localStorage.getItem(`panier`));
  if(document.getElementById('emptyBasket') != undefined) {
    if(getPanier != null) {
      emptyBasket.classList.remove('d-flex');
      emptyBasket.style.display = "none";
    }
  }
}



//////////////////////////////////////////////////////////////////////////////////

/*  // check paramètres en URL
  var oParametre = {};
  if (window.location.search.length > 1) {
    for (
      var aItKey,
        nKeyId = 0,
        aCouples = window.location.search.substr(1).split("&");
      nKeyId < aCouples.length;
      nKeyId++
    ) {
      aItKey = aCouples[nKeyId].split("=");
      oParametre[unescape(aItKey[0])] =
        aItKey.length > 1 ? unescape(aItKey[1]) : "";
    }
  } */