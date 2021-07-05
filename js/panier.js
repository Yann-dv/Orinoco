let getPanier = JSON.parse(localStorage.getItem(`panier`));
let getArticles = JSON.stringify(getPanier.length);
//let idFinder = ;

checkArticles();
emptyBasketHide();
//formControl();

function checkArticles() {
  if (
    getPanier != null &&
    document.getElementById("panierBadge") != undefined
  ) {
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
  basketContent.insertAdjacentHTML(
    "beforeend",
    `<h2 class="link-anim">Tous mes articles</h2>`
  );
  commandForm.insertAdjacentHTML(
    "beforeend",
    `
    <div class="error d-none">
        <p>Il manque encore quelques informations pour pouvoir valider votre commande !</p>
    </div>
    <div id="cmdForm">
    <h2 class="link-anim">Formulaire de commande</h2>
      <form class="mt-4 py-3 px-5 main-color">
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
          <input type="text" pattern="^[a-zA-Z]+$" id="ville" class="form-control" placeholder="Paris" required minlength="2"/>
        </div>
        <div class="my-2 position-relative">
          <label for="cp" class="form-label fs-4 link-anim">Code postal :</label> 
          <input type="text" pattern="[0-9]{5}" id="cp" class="form-control" placeholder="75005" required/>
        </div>
        <div class="my-2 position-relative">
          <label for="mail" class="form-label fs-4 link-anim">E-mail :</label>
          <input type="text" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="mail" class="form-control" placeholder="jdoe@outlook.fr" required/>
        </div>
        <div>
          <input type="submit" class="btn btn-primary" id="envoi" value="Envoyer ma commande"/> 
          <input type="reset" id="refresh" class="btn btn-danger" value="Effacer ma saisie"/>
        </div>
    </form>
    </div>
  `
  );
  for (let i = 0; i < getArticles; i++) {
    basketContent.insertAdjacentHTML(
      "beforeend",
      `
        <div class="selectedArticles d-flex">
          <article class="choosenTeddy">
            <div class="main-color card my-2 shadow">
              <div class="main-color position-relative d-flex">
              <img src="./images/teddy_2.jpg" class="main-color img-fluid p-3 basket-card">
              <div class="article-content d-flex flex-column px-2 py-2">
                <a class="stretched-link fs-4" href="./produit.html?teddy=5beaa8bf1c9d440000a57d94">Arnold</a>
                <span class="articleQty">Quantité :</span>
                <span class="articleColor">Couleur :</span>
              </div>
            </div>
          </article>  
        </div>
      `
    );
  }
}

/*function formControl () {
let pseudo = document.getElementsById('firstname');
let mdp = document.getElementsById('secondname');
let adresse = document.getElementsById('adresse');
let ville = document.getElementsById('ville');
let cp = document.getElementsById('cp');
let mail = document.getElementsById('mail');
let refresh = document.getElementsById('refresh');
let erreur = document.getElementsById('erreur');
let form = document.getElementsById('form-control');

form.keyup(function(){
  if(this.val().length<2) {
  this.css({'border-color':'red', 'color':'red'});
  }
    else{
      this.css({
	     borderColor : 'green',
	     color : 'green'
	 });
  }
});
}*/

//<img src="${idFinder.imageUrl}" alt="Teddy ${idFinder.name}" title="Photo de ${idFinder.name}"
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
