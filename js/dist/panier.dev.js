"use strict";

var getPanier = JSON.parse(localStorage.getItem("panier"));
var getArticles = JSON.stringify(getPanier.length); //let idFinder = ;

checkArticles();
emptyBasketHide();

function checkArticles() {
  if (getPanier != null && document.getElementById("panierBadge") != undefined) {
    panierBadge.textContent = getArticles;
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
  commandForm.insertAdjacentHTML("beforeend", "\n    <div class=\"error d-none\">\n        <p>Il manque encore quelques informations pour pouvoir valider votre commande !</p>\n    </div>\n    <div id=\"cmdForm\">\n    <h2 class=\"link-anim\">Formulaire de commande</h2>\n    <form class=\"mt-4 py-3 px-5 main-color\">\n    <div class=\"lh-1\"><label for=\"firstname\" class=\"form-label fs-4\">Nom :</label> <input type=\"text\" id=\"firstname\" class=\"form-control\" placeholder=\"John\" required/><br /><br /></div>\n    <div class=\"lh-1\"><label for=\"secondname\" class=\"form-label fs-4\"\">Pr\xE9nom :</label> <input type=\"text\" id=\"secondname\" class=\"form-control\" placeholder=\"Doe\" required/><br /><br /></div>\n    <div class=\"lh-1\"><label for=\"adresse\" class=\"form-label fs-4\"\">Adresse :</label> <input type=\"text\" id=\"adresse\" class=\"form-control\" placeholder=\"1 rue des Cerisiers\" required/><br/><br /></div>\n    <div class=\"lh-1\"><label for=\"ville\" class=\"form-label fs-4\"\">Ville :</label> <input type=\"text\" id=\"ville\" class=\"form-control\" placeholder=\"Paris\" required/><br/><br /></div>\n    <div class=\"lh-1\"><label for=\"cp\" class=\"form-label fs-4\"\">Code postal :</label> <input type=\"text\" id=\"cp\" class=\"form-control\" placeholder=\"75005\" required/><br/><br /></div>\n    <div class=\"lh-1\"><label for=\"mail\" class=\"form-label fs-4\"\">E-mail :</label> <input type=\"text\" id=\"mail\"\"class=\"form-control\" placeholder=\"jdoe@outlook.fr\" required/><br/><br /></div>\n    <div><input type=\"submit\" id=\"envoi\" value=\"Envoyer\"/> <input type=\"reset\" id=\"rafraichir\" value=\"Rafra\xEEchir\"/></div>\n    </form>\n    </div>\n  ");

  for (var i = 0; i < getArticles; i++) {
    basketContent.insertAdjacentHTML("beforeend", "\n        <div class=\"selectedArticles d-flex\">\n        <article class=\"choosenTeddy\">\n        <div class=\"main-color card my-3 shadow\">\n          <div class=\"card-body main-color position-relative d-flex\">\n          <img src=\"./images/teddy_2.jpg\" class=\"main-color p-3 basket-card\">\n            <a class=\"stretched-link fs-4\" href=\"./produit.html?teddy=5beaa8bf1c9d440000a57d94\">Arnold</a>\n        </article>\n        </div>\n        </div>\n      ");
  }
} //<img src="${idFinder.imageUrl}" alt="Teddy ${idFinder.name}" title="Photo de ${idFinder.name}"
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

/* var $pseudo = $('#pseudo'),
     $mdp = $('#mdp'),
     $confirmation =$('#confirmation'),
     $mail = $('#mail'),
     $envoi = $('#envoi'),
     $reset = $('#rafraichir'),
     $erreur = $('#erreur'),
     $champ = $('.champ');

$champ.keyup(function(){
  if($(this).val().length<5) {
    $(this).css({'border-color':'red', 'color':'red'});
  }
    else{
         $(this).css({
	     borderColor : 'green',
	     color : 'green'
	 });
  }
});

$confirmation.keyup(function(){
    if($(this).val() != $mdp.val()){ // si la confirmation est différente du mot de passe
        $(this).css({ // on rend le champ rouge
	    borderColor : 'red',
	    color : 'red'
        });
    }
    else{
	$(this).css({ // si tout est bon, on le rend vert
	    borderColor : 'green',
	    color : 'green'
	});
    }
});

function verifier(champ){
    if(champ.val() == ""){ // si le champ est vide
    	$erreur.fadeIn();/*css('display', 'block'); / // on affiche le message d'erreur
      champ.css({ // on rend le champ rouge
        borderColor : 'red',
        color : 'red'
    });
  }
}

$envoi.click(function(e){
  e.preventDefault(); // on annule la fonction par défaut du bouton d'envoi

  // puis on lance la fonction de vérification sur tous les champs :
  verifier($pseudo);
  verifier($mdp);
  verifier($confirmation);
  verifier($mail);
});


$reset.click(function(){
  $champ.css({
    borderColor : '#ccc',
    color : '#555'
  });
  $erreur.fadeOut();
});*/