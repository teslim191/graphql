const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema.js')
const exphbs = require('express-handlebars')
const app = express()
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

// express-graphql middleware
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))


connectDB()


app.engine(
    ".hbs",
    exphbs.engine({
      defaultLayout: "main",
      extname: ".hbs",
    })
  );
app.set("view engine", ".hbs");

app.use('/users', require('./routes/users'))

PORT = process.env.PORT || 3000 

app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} node in ${PORT}`))