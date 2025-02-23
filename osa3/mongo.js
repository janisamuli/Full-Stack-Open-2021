const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://puhelinluettelosovellus:${password}@puhelinluettelofso.eaij4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: {type:String, unique: true},
  number: String,
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log("Phonebook:")
         result.forEach(person => {
          console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
      })}


if(process.argv.length > 3){
const person = new Person({
  name: name,
  number: number,
  important: true,
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})


}

