window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");

    const addArticles = index => {
      for(let i = 0; i < index; i++) {
      const item = document.createElement('div')
      item.setAttribute('class', 'teddy col-12 col-lg-4')
      //InsertAdjacentHTML -> cartes des différents Teddy's
      mainContainer.insertAdjacentHTML('afterbegin', '<div class="col-12 col-lg-4"><div class="card mb-4 mt-3 mt-lg-3 mb-lg-4 shadow"><img src="./images/teddy_1.jpg" alt="Teddy" class="card-img-top"><div class="card-body"><h5 class="card-title">Teddy 1</h5><p class="card-text">Premier teddy</p><a class="btn btn-primary stretched-link" href="lessons-1.html" role="button">Lien vers le produit</a></div></div>')
      }
  }

const mainContainer = document.getElementById('teddyList')
   addArticles(5)
  });



 // Barre de recherche dynamique, fonctionnant par filtre, évolutive en fonction des produits proposés //   
 document.querySelector('#searchInput').addEventListener('keyup', function(e) {
   var recherche = this.value.toLowerCase();
   var documents = document.querySelectorAll('#teddyList'); // Evolutif si l'on souhaite rajouter par la suite des listes de produits //
    
   Array.prototype.forEach.call(documents, function(document) {
     if (document.innerHTML.toLowerCase().indexOf(recherche) > -1) {
       document.style.display = 'flex'; // Display flex afin de conserver la mise ne page //
     } else {
       document.style.display = 'none'; // Display none, rendu visuel plus pertinent //
     }
   });
 });