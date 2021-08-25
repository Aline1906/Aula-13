const pets = require("../models/pets.json")
const fs = require("fs")

const createPet = (req, res) => {
    const { id, nomeFantasia, endereco, telefone, atende } = req.body
    pets.push({ id, nomeFantasia, endereco, telefone, atende })
    fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) { 
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const petFound = pets.find(pet => pet.id == id)       
            res.status(200).send(petFound)
        }
    })
}

const deletePet = (req, res) => {
    try {
        const petId = req.params.id
        const petFound = pets.find(pet => pet.id == petId) 
        const petIndex = pets.indexOf(petFound) 

        if (petIndex >= 0) { 
            pets.splice(petIndex, 1) 
            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    return res.status(500).send({ message: err })
                } else {
                    console.log("Pet deletado com sucesso do arquivo!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Pet não encontrado para ser deletado" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o pet" })
    }
}

const updatePet = (req, res) => {
    try {
        const petId = req.params.id
        const petToUpdate = req.body 

        const petFound = pets.find(pet => pet.id == petId) 
        const petIndex = pets.indexOf(petFound) 

        if (petIndex >= 0) { 
            pets.splice(petIndex, 1, petToUpdate) 

            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const petUpdated = pets.find(pet => pet.id == petId) 
                    res.status(200).send(petUpdated) 
                }
            })
        } else {
            res.status(404).send({ message: "Pet não encontrado para ser atualizado" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateName = (req, res) => {
    try {
        const petId = req.params.id
        const nomeFantasia = req.body.nomeFantasia
        const petFound = pets.find(pet => pet.id == petId) 
        const petIndex = pets.indexOf(petFound) 

        if (petIndex >= 0) { 
            petFound.nomeFantasia = nomeFantasia 
            pets.splice(petIndex, 1, petFound) 

            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    return res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const petpdated = pets.find(pet => pet.id == petId) 
                    return res.status(200).send(petpdated) 
                }
            })
        } else {
            res.status(404).send({ message: "Pet não encontrado para modificar o nome." })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllPets = (req, res) => {
    const animal = req.query.animal 
    const estado = req.query.estado 
    let allPets = pets
    if (animal) { 
        allPets = pets.filter(pet => pet.atende.includes(animal)) 
    }
    if (estado) {
        const petByEstado = pets.filter(pet => pet.endereco.includes(estado)) 
        if (animal) { // o filtro de animal foi informado?
            allPets = petByEstado.filter(pet => allPets.includes(pet)) 
        } else {
            allPets = petByEstado
        }
    }
    res.status(200).send(allPets) 
}

const getPet = (req, res) => {
    const petId = req.params.id
    const petFound = pets.find(pet => pet.id == petId)
    if (petFound) {
        res.status(200).send(petFound)
    } else {
        res.status(404).send({ message: "Pet não encontrado" })
    }
}

module.exports = {
    createPet,
    deletePet,
    updateName,
    updatePet,
    getAllPets,
    getPet,
}