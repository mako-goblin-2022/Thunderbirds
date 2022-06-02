const express = require('express')
const hbs = require('express-handlebars')

const BirdRoutes = require('./routes/birds')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
const bird = require('./data.json')
// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.use('/bird', BirdRoutes)
server.get('/', (req, res) => {
  // const viewData={
  //   title:"birds home page",
  //   bird:bird.Birds
  // }
  // console.log(viewData)
  // res.render('home',viewData)
  res.redirect('/bird')

})

module.exports = server