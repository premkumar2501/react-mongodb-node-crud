const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const UserModal = require('./User')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.post('/createUser', (req, res) => {
  UserModal.create(req.body)
    .then(result => {
      if (result) return res.json({ message: 'success' })
      return res.json({ message: 'fail' })
    })
    .catch(err => res.json({ message: 'fail' })
    )
})

app.get('/getUser', (req, res) => {
  UserModal.find({}).then(result => res.json(result))
    .catch(err => console.log('error1'))
})

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModal.findById({ _id: id })

    .then(result => res.json(result))
    .catch(err => res.json(err, 'Update erro.'))
})

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body
  UserModal.findByIdAndUpdate({ _id: id }, { name: name, email, email, age: age })
    .then(result => {
      if(result) return res.json({message:'success'})
        return res.json({message:'failure'})}
      )
      .catch(err => {
        return res.json({message:'wrong_data'})
      })
})

app.delete('/deleteUser/:id', (req,res) => {
  const id =  req.params.id
  UserModal.findByIdAndDelete({_id : id})
  .then(result => {
    if(result) return res.json({message:'success'})
  })
  .catch(err => {
    return res.json({message:'failure'})
  })
})

app.listen(7000, () => {
  console.log('Listen successfully.');

})