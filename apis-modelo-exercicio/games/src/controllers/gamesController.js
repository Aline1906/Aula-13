const games = require("../models/games.json")
const fs = require("fs")

const createGame = (req, res) => {
    const { id, title, launchYear, liked, consoles, stages } = req.body
    games.push({ id, title, launchYear, liked, consoles, stages })
    fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) { 
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const gameFound = games.find(game => game.id == id)     
            res.status(200).send(gameFound)
        }
    })
}

const deleteGame = (req, res) => {
    try {
        const gameId = req.params.id
        const gameFound = games.find(game => game.id == gameId) 
        const gameIndex = games.indexOf(gameFound) 

        if (gameIndex >= 0) { 
            games.splice(gameIndex, 1) 
            fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Game deletado com sucesso do arquivo!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Game não encontrado para ser deletado" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o game" })
    }
}

const updateGame = (req, res) => {
    try {
        const gameId = req.params.id
        const gameToUpdate = req.body 

        const gameFound = games.find(game => game.id == gameId) 
        const gameIndex = games.indexOf(gameFound) 

        if (gameIndex >= 0) { 
            games.splice(gameIndex, 1, gameToUpdate) 

            fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const gameUpdated = games.find(game => game.id == gameId) 
                    res.status(200).send(gameUpdated) 
                }
            })
        } else {
            res.status(404).send({ message: "Game não encontrado para ser atualizado" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateLiked = (req, res) => {
    try {
        const gameId = req.params.id
        const liked = req.body.liked
        const gameFound = games.find(game => game.id == gameId)
        const gameIndex = games.indexOf(gameFound) 

        if (gameIndex >= 0) { 
            gameFound.liked = liked 
            games.splice(gameIndex, 1, gameFound)

            fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const gamepdated = games.find(game => game.id == gameId) 
                    res.status(200).send(gamepdated) 
                }
            })
        } else {
            res.status(404).send({ message: "Game não encontrado para registrar o like." })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllGames = (req, res) => {
    const console = req.query.console 
    const beforeLaunchYear = req.query.beforeLaunchYear 
    let allgames = games
    if (console) { 
        allgames = games.filter(game => game.consoles.includes(console)) 
    }
    if (beforeLaunchYear) {
        const gameAfterLaunchYear = games.filter(game => game.launchYear > beforeLaunchYear)
        if (console) { // o filtro de animal foi informado?
            allgames = gameAfterLaunchYear.filter(game => allgames.includes(game)) 
        } else {
            allgames = gameAfterLaunchYear
        }
    }
    res.status(200).send(allgames) 
}

const getGame = (req, res) => {
    const gameId = req.params.id
    const gameFound = games.find(game => game.id == gameId)
    if (gameFound) {
        res.status(200).send(gameFound)
    } else {
        res.status(404).send({ message: "Game não encontrado" })
    }
}

module.exports = {
    createGame,
    deleteGame,
    updateLiked,
    updateGame,
    getAllGames,
    getGame,
}