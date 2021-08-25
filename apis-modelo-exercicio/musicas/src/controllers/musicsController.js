const musics = require("../models/musics.json")
const fs = require("fs")

const createMusic = (req, res) => {
    const { id, title, duration, launchYear, favorited, artists } = req.body
    musics.push({ id, title, duration, launchYear, favorited, artists })
    fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const musicFound = musics.find(music => music.id == id)      
            res.status(200).send(musicFound)
        }
    })
}

const deleteMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicFound = musics.find(music => music.id == musicId) 
        const musicIndex = musics.indexOf(musicFound) 

        if (musicIndex >= 0) { 
            musics.splice(musicIndex, 1) 
            fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Música deletada com sucesso do arquivo!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Música não encontrada para ser deletada" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a música" })
    }
}

const updateMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicToUpdate = req.body 

        const musicFound = musics.find(music => music.id == musicId) 
        const musicIndex = musics.indexOf(musicFound) 

        if (musicIndex >= 0) { 
            musics.splice(musicIndex, 1, musicToUpdate) 

            fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const musicUpdated = musics.find(music => music.id == musicId) 
                    res.status(200).send(musicUpdated) 
                }
            })
        } else {
            res.status(404).send({ message: "Música não encontrada para ser atualizada" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateFavorited = (req, res) => {
    try {
        const musicId = req.params.id
        const favorited = req.body.favorited
        const musicFound = musics.find(music => music.id == musicId) 
        const musicIndex = musics.indexOf(musicFound) 

        if (musicIndex >= 0) { 
            musicFound.favorited = favorited 
            musics.splice(musicIndex, 1, musicFound) 

            fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const musicpdated = musics.find(music => music.id == musicId) 
                    res.status(200).send(musicpdated) 
                }
            })
        } else {
            res.status(404).send({ message: "Música não encontrada para modificar o nome." })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllMusics = (req, res) => {
    const artist = req.query.artist 
    const afterLaunchYear = req.query.afterLaunchYear 
    let allmusics = musics
    if (artist) { 
        allmusics = musics.filter(music => music.artists.includes(artist)) 
    }
    if (afterLaunchYear) {
        const musicAfterLaunchYear = musics.filter(music => music.launchYear > afterLaunchYear) 
        if (artist) { 
            allmusics = musicAfterLaunchYear.filter(music => allmusics.includes(music)) 
        } else {
            allmusics = musicAfterLaunchYear
        }
    }
    res.status(200).send(allmusics) 
}

const getMusic = (req, res) => {
    const musicId = req.params.id
    const musicFound = musics.find(music => music.id == musicId)
    if (musicFound) {
        res.status(200).send(musicFound)
    } else {
        res.status(404).send({ message: "Música não encontrada" })
    }
}

module.exports = {
    createMusic,
    deleteMusic,
    updateFavorited,
    updateMusic,
    getAllMusics,
    getMusic,
}