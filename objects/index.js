module.exports = [{
  name: "products",
  fields: {
    name: "TEXT",
    price: "FLOAT",
    description: "TEXT",
    image: "TEXT",
  }
},
{
  name: "users",
  fields: {
    name: "TEXT",
    email: "TEXT",
    password: "TEXT",
  }
},
{
  name: "orders",
  fields: {
    user_id: "INTEGER",
    total: "FLOAT",
    date: "TEXT",
    productId: "INTEGER",
  }
},
]
