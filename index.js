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

  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keyup", function() {
    var value = document.querySelector(this).val().toLowerCase();
    document.querySelector("#lessonList .col-12").filter(function() {
       document.querySelector(this).toggle(document.querySelector(this).text().toLowerCase().indexOf(value) > -1)
    });
 });
    

   /* $(document).ready(function(){
      $("#searchInput").on("keyup", function() {
         var value = $(this).val().toLowerCase();
         $("#lessonList .col-12").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
         });
      });
   });*/

     /* $(document).ready(function(){
      searchInput.on("keyup", function() {
         var value = document.querySelector(this).val().toLowerCase();
         document.querySelector("#lessonList .col-12").filter(function() {
            document.querySelector(this).toggle(document.querySelector(this).text().toLowerCase().indexOf(value) > -1)
         });
      });
   });*/
