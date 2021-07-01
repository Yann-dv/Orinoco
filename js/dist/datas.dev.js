"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////// DATAS ////////////////////////////////////////
// CLASSE produit //
var product =
/*#__PURE__*/
function () {
  function product(_id, name, quantity, color, price) {
    _classCallCheck(this, product);

    this._id = _id;
    this.name = name;
    this.quantity = quantity;
    this.color = color;
    this.price = price;
  }

  _createClass(product, [{
    key: "setColor",
    value: function setColor(color) {
      this.color = color;
    }
  }]);

  return product;
}(); // New instance //


var teddiesFromLocalStorage = [];

var addTeddy = function addTeddy() {
  var _localStorage;

  var tmpTeddy = {
    _id: teddyId,
    quantity: document.getElementById('ffdsf').value
  };
  teddiesFromLocalStorage.push(tmpTeddy);

  (_localStorage = localStorage).set.apply(_localStorage, _toConsumableArray(JSON.stringify(teddiesFromLocalStorage)));
};

var addProduct = new product("_id_1", "Name_1", 3, "red", 350);
console.log(JSON.stringify(addProduct));