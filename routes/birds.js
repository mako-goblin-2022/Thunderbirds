const fs = require('fs')
const path = require('path')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  readBirds((birds) => {
    res.render('home', birds)
  })
})

router.get('/:id', (req, res) => {
  readBirds((birds) => {
    console.log(birds)
    const getBirds = birds.birds.find((birds) => birds.id == req.params.id)
    console.log(getBirds)
    res.render('details', getBirds)
  })
})
router.get('/:id/edit', (req, res) => {
  readPuppies((birds) => {
    console.log(birds)
    const getBirds = birds.birds.find((birds) => birds.id == req.params.id)
    console.log(getBirds)
    res.render('edit', getBirds)
  })
})

// router.get('/add', (req, res) => {
//   res.render('.puppiesForm')
// })
//POST /puppies/:id/edit
router.post('/:id/edit', (req, res) => {
  const newPuppies = req.body
  readPuppies((puppies) => {
    const puppyIndex = puppies.puppies.findIndex((puppies) => puppies.id == req.params.id)
    puppies.puppies[puppyIndex] = {...newPuppies, id: req.params.id}
    const data = JSON.stringify(puppies, null, 2)
    fs.writeFile(path.resolve('./data.json'), data, (err) => {
      console.log(err)
      res.redirect('/puppies')
    })
  })
})





function readPuppies(callback) {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    let puppies = JSON.parse(data)
    callback(puppies)
  })
}




module.exports = router