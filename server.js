const express = require('express')
const hbs = require('express-handlebars')

//const BirdRoutes = require('./routes/bird')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
//server.use('/bird', BirdRoutes)
server.get('/', (req, res) => {
  res.render("home")
  // readBirds((birds) => {
  //   res.render('home', birds)
  // })
})

module.exports = server