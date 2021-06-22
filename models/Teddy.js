const teddies = [
  {
    "colors": ["Tan", "Chocolate", "Black", "White"],
    "_id": "5be9c8541c9d440000665243",
    "name": "Norbert",
    "price": 29,
    "imageUrl": "teddy_1.jpg",
    "description": "Voici Norbert : mignon et doux, il saura être un compagnon du quotidien, prêt à l'emploi et facile à transporter, il vous suivra où que vous alliez."
  },
  {
    "colors": [
      "Pale brown",
      "Dark brown",
      "White"
    ],
    "_id": "5beaa8bf1c9d440000a57d94",
    "name": "Arnold",
    "price": 39,
    "imageUrl": "teddy_2.jpg",
    "description": "Arnold est sans doute l'un de nos oursons les plus mignons et affectueux qui soit. Il saura vous réconforter et vous remonter le moral en toutes circonstances."
  },
  {
    "colors": [
      "Brown"
    ],
    "_id": "5beaaa8f1c9d440000a57d95",
    "name": "Lenny and Carl",
    "price": 59,
    "imageUrl": "teddy_3.jpg",
    "description": "Nos deux inséparables : Lenny et Carl vont toujours ensembles. Impossible de les séparer, c'est donc 2 teddies que vous obtiendrez avec eux, et ce pour le prix d'un !"
  },
  {
    "colors": [
      "Brown",
      "Blue",
      "Pink"
    ],
    "_id": "5beaabe91c9d440000a57d96",
    "name": "Gustav",
    "price": 45,
    "imageUrl": "teddy_4.jpg",
    "description": "Gustav est un ourson au regard tendre et doux. D'une bonne stature (pour un teddy), il n'en reste pas moins légèrement frileux, et il ne sépare que rarement de sa petite laine... Un ourson à garder à l'abri de l'humidité."
  },
  {
    "colors": [
      "Beige",
      "Tan",
      "Chocolate"
    ],
    "_id": "5beaacd41c9d440000a57d97",
    "name": "Garfunkel",
    "price": 55,
    "imageUrl": "teddy_5.jpg",
    "description": "Garfunkel est un teddy timide, réservé et quelque peu lunatique. C'est pourquoi ne soyez pas étonné si vous le surprenez à rester souvent dans son coin, il ne vous boude pas : il est juste ailleurs !"
  }
];

exports.find = () => {
  return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(teddies))));
}

exports.findById = (id) => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(teddies)).find(teddy =>
      teddy._id == id)
    )
  );
}