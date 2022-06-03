const fs = require('fs')
const path = require('path')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  readBirds((birds) => {
    res.render('home', {bird:birds.Birds})
  })
})

router.get('/:id', (req, res) => {
  readBirds((birds) => {
    const getBirds = birds.Birds.find((birds) => birds.id == req.params.id)
    res.render('details', getBirds)
  })
})
router.get('/:id/edit', (req, res) => {
  readBirds((birds) => {
    const getBirds = birds.Birds.find((birds) => birds.id == req.params.id)
    res.render('edit', getBirds)
  })
})
router.post('/:id/edit', (req, res) => {
  const newBird = req.body
  readBirds((bird) => {
//console.log(req.body)
    const birdIndex = bird.Birds.find((birds) => birds.id == req.params.id)
    //console.log(bird.Birds[birdIndex])


    const props = Object.keys(birdIndex)
    props.forEach((prop) => {
      if (prop != 'id') {
        birdIndex[prop] = req.body[prop]
      }
    })


    // const birdIndex = birds.Birds.find((birds) => birds.id == req.params.id)
    // bird.Birds[birdIndex] = {...newBird, id: req.params.id}
    // console.log(bird.Birds[birdIndex])

    
    const data = JSON.stringify(bird, null, 2)
    fs.writeFile(path.resolve('./data.json'), data, (err) => {
      console.log(err)
      res.redirect('/birds')
    })
  })
})

function readBirds(callback) {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    let bird = JSON.parse(data)
    callback(bird)
  })
}




module.exports = router