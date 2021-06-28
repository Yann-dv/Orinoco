 // Variable pour aller chercher les informations à afficher dans le localStorage et parser
const ted= JSON.parse(localStorage.getItem('teddiesList'));
var selected= 3; // Variable de stockage du teddy séléctionné

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
    teddyColors(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  function createTeddy() {
    const mainContainer = document.getElementById('products')
    mainContainer.insertAdjacentHTML('beforeend', `
      <div class="teddy col-12 col-lg-6">
        <div class="product-image main-color">
            <img src="${ted[selected].imageUrl}" alt="Teddy" class="img-fluid p-3">
        </div>
      </div>
      <div class="teddy col-12 col-lg-6 main-color ms-3 d-flex">
        <div class="product-desc">
            <h2 class="fw-bold text-center pt-2">${ted[selected].name}</h2>
            <p class="my-3 fs-5 p-2">${ted[selected].description}</p>
            <h5 class="text-bold p-2 font-lg font-bold">Choisissez une couleur pour votre teddy :</h5>
            <div class="container colors-container">
                <div class="d-flex m-auto" id="product-colors">
                </div>
            </div>
            <button class="w-full bg-secondary text-white fw-bold rounded p-2 m-2" type="button">Ajouter au panier pour 
            <span id="productPrice">${ted[selected].price/100} €</span>
            </button>
            <label  id="tedQuantity" class="mx-5 selectQuantity">Quantité : <select name="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            </label>
        </div>
      </div>
        `)
       
    };

// Créations des boutons de choix de couleurs en fonction du teddy séléctionné
    const teddyColors = ted => {
    const colorContainer = document.getElementById('product-colors')
    for(let i = 0; i < ted[selected].colors.length; i++) {
    let color = ted[selected];
    colorContainer.insertAdjacentHTML('beforeend', `
        <button class="btn btn-outline-secondary scale-up color-choice" type="button" width:"4rem" style="background-color: ${color.colors[i]}">
        </button>
        `)
        
    }
}

// Méthode d'écoute des évènements crées dynamiquement - under construction
  document.addEventListener('change', function(e){
    const tedPrice = document.getElementById('productPrice');
    tedPrice.textContent = `${(ted[selected].price/100)*e.target.value} €`;
    /*
    if(e.target && e.target.id == 'tedQuantity'){
      tedPrice.textContent = `${(ted[selected].price/100)*e.target.value} €`;
     }*/
     /*console.log(e.target.value);
     console.log(tedPrice.innerHTML);
     console.log(document.getElementById('productPrice'));
     console.log((ted[selected].price/100)*e.target.value);*/
});
