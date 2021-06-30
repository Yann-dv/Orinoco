 // Variable pour aller chercher les informations à afficher dans le localStorage et parser
const ted= JSON.parse(localStorage.getItem('teddiesList'));

// Recherche de l'objet local correspondant à l'id du teddy passée en URL sur page index
//var selected =  ted.find(which => which._id === (window.location.search.substring(7)));
var selected =  ted.find(which => which._id === new URLSearchParams(document.location.search.substring(1)).get('teddy'));

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
    //teddyReceiveUrl(value);
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
            <img src="${selected.imageUrl}" alt="Teddy" class="img-fluid p-3">
        </div>
      </div>
      <div class="teddy col-12 col-lg-6 main-color ms-3 d-flex">
        <div class="product-desc">
            <h2 class="fw-bold text-center pt-2">${selected.name}</h2>
            <p class="my-3 fs-5 p-2">${selected.description}</p>
            <h5 class="text-bold p-2 font-lg font-bold">Choisissez une couleur pour votre teddy :</h5>
            <div class="container colors-container">
                <div class="d-flex m-auto" id="product-colors">
                </div>
            </div>
            <button id="productPrice" class="w-full bg-secondary text-white fw-bold rounded p-2 m-2" type="button">Ajouter au panier pour 
            <span>${selected.price/100} €</span>
            </button>
            <label class="mx-5 selectQuantity">Quantité : 
            <select id="tedQuantity">
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
        // Ecoute du bouton d'envoi de commande
        productPrice.addEventListener('click', function(e) {
          var urlParams = new URLSearchParams(window.location.search);
          var qty = document.getElementById('tedQuantity');
          urlParams.set("price", (qty.value*(selected.price/100)));
          window.location.search = urlParams;
      });
    };

// Créations des boutons de choix de couleurs en fonction du teddy séléctionné
const teddyColors = ted => {
  const colorContainer = document.getElementById('product-colors')
  for(let i = 0; i < selected.colors.length; i++) {
  let color = selected.colors;
    colorContainer.insertAdjacentHTML('beforeend', `
        <button id="color ${color[i]}" class="btn btn-outline-secondary scale-up color-choice" type="button" width:"4rem" style="background-color: ${color[i]}">
        </button>
        `)
        
    }
}

// Méthode d'écoute des évènements crées dynamiquement
  products.addEventListener('change', function(e){
    const tedPrice = document.getElementById('productPrice');
    tedPrice.textContent = `Ajouter au panier pour ${(selected.price/100)*e.target.value} €`;
});