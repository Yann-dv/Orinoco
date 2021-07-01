////////////////////////////////////// DATAS ////////////////////////////////////////
// CLASSE produit //
class product {
    constructor(_id, name, quantity, color, price) {
        this._id= _id;
        this.name= name;
        this.quantity= quantity;
        this.color= color;
        this.price= price;
    }

    setColor(color) {
        this.color = color;
    }
}
// New instance //


const teddiesFromLocalStorage = [];
const addTeddy = () => {
    const tmpTeddy = {
        _id: teddyId,
        quantity: document.getElementById('ffdsf').value,
    }
    teddiesFromLocalStorage.push(tmpTeddy)
    localStorage.set(... JSON.stringify(teddiesFromLocalStorage))
}


let addProduct = new product("_id_1", "Name_1", 3, "red", 350);
console.log(JSON.stringify(addProduct));