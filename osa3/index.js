
require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')

morgan.token('body', (req, ) => JSON.stringify(
  'name: '+ req.body.name + ', number: ' + req.body.number))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))


/*
let persons = [
  {
    id: 1,
    name: "testi",
    number: "0303030",
    important: true
  }
]
*/

app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people.</p>` + date)
  })})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/*
const generateRandomId = () => {
  min = 1
  max = 10000
  return Math.floor(Math.random() * (max-min) + min)
}
*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'You need to include a name.'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'You need to include a phone number.'
    })

  }

  /*if(persons.find(person => body.name === person.name)) {
    return response.status(400).json({
      error: `There already is someone named ${body.name} in the phonebook!`
    })
  }
  */

  const person = new Person( {
    name: body.name,
    number: body.number,
    // id: generateRandomId(),
  })


  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => { next(error)
    //return response.status(400).json({
    // error: "The name already exists in the phonebook!"
    })
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

// Unknown Endpoint & Error Handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.message.includes('ObjectId')) {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
