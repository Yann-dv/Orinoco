 // Variable pour aller chercher les informations à afficher dans le localStorage et parser
const ted= JSON.parse(localStorage.getItem('teddiesList'));

fetch('http://localhost:3000/api/teddies')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    // Stockage en local des listes de produits récupérés via l'API, s'il n'est pas déjà présent
    if(localStorage.getItem("teddiesList") === null) {
    const localTeddies = localStorage.setItem("teddiesList", JSON.stringify(value));
    }
    createTeddy(value); 
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  function createTeddy() {
    const mainContainer = document.getElementById('products')
    mainContainer.insertAdjacentHTML('beforeend', `
      <div class="teddy col-12 col-lg-6">
        <div class="product-image main-color p-3">
            <img src="${ted[1].imageUrl}" alt="Teddy" class="card-img-top main-color" style="height: 70vh">
        </div>
      </div>
      <div class="teddy col-12 col-lg-6 main-color ms-3 d-flex">
        <div class="product-desc p-4 style="height: 70vh">
            <h3 class="fw-bold text-center">${ted[1].name}</h3>
            <p class="my-3">${ted[1].description}</p>
            <h5 class="text-bold font-lg font-bold">Choisissez une couleur pour votre teddy :</h5>
            <div id="product-colors" class="container">
              <div class="row">
                <div class="col btn btn-outline-secondary scale-up color-choice" type="button" style="background-color: ${ted[2].colors}">
                </div>
                <div class="col btn btn-outline-secondary scale-up color-choice" type="button" style="background-color: tan">
                </div>
                <div class="col btn btn-outline-secondary scale-up color-choice" type="button" style="background-color: white">
                </div>
              </div>
            </div>
            <button class="w-full bg-secondary text-white fw-bold rounded p-2 mt-2" type="button">Ajouter au panier pour 
            <span id="productPrice">${ted[1].price/100} €</span>
            </button>
        </div>
      </div>
        `)
    };
