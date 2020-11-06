require("dotenv").config();
const keys = require('./keys.js')
const fs = require('fs')
const Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
let moment = require('moment')
const request = require('request')
const chalk = require('chalk')
let args = process.argv.slice(2)
let choice = args[0]
let searchTerm = args[1]

function spotifyThis() {

    if (searchTerm === undefined) {
        let searchTerm = "technologic"
        spotify.search({
            type: 'track',
            query: searchTerm
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                let song = data.tracks.items
                for (i = 0; i < song.length; i++) {
                    console.log(chalk.white.bgGreen("Artist: ") + chalk.green.bold(song[i].album.artists[0].name))
                    console.log(chalk.white.bgGreen("Song: ") + chalk.green.bold(song[i].name))
                    console.log(chalk.white.bgGreen("Preview: ") + chalk.green.bold(song[i].preview_url))
                    console.log(chalk.white.bgGreen("Album: ") + chalk.green.bold(song[i].album.name))
                    console.log("\n--------------------------------")
                }
            }

        })
    } else {
        spotify.search({
            type: 'track',
            query: searchTerm
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                let song = data.tracks.items
                for (i = 0; i < song.length; i++) {
                    console.log(chalk.white.bgGreen("Artist: ") + chalk.green.bold(song[i].album.artists[0].name))
                    console.log(chalk.white.bgGreen("Song: ") + chalk.green.bold(song[i].name))
                    console.log(chalk.white.bgGreen("Preview: ") + chalk.green.bold(song[i].preview_url))
                    console.log(chalk.white.bgGreen("Album: ") + chalk.green.bold(song[i].album.name))
                    console.log("\n--------------------------------")
                }
            }
        });
    }

}


function doWhat() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }

        let input = data.split(",")
        let choice = input[0]
        let searchTerm = input[1]
        spotify.search({
            type: 'track',
            query: searchTerm
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                let song = data.tracks.items
                for (i = 0; i < song.length; i++) {
                    console.log(chalk.white.bgGreen("Artist: ") + chalk.green.bold(song[i].album.artists[0].name))
                    console.log(chalk.white.bgGreen("Song: ") + chalk.green.bold(song[i].name))
                    console.log(chalk.white.bgGreen("Preview: ") + chalk.green.bold(song[i].preview_url))
                    console.log(chalk.white.bgGreen("Album: ") + chalk.green.bold(song[i].album.name))
                    console.log("\n--------------------------------")
                }
            }

        })



    })
}

function doSomething() {

    if (choice === "spotify-this") {
        spotifyThis()
    } else if (choice === "movie-this") {
        movieThis()
    } else if (choice === "do-what-it-says") {
        doWhat()

    } else if (choice === "concert-this") {
        band()
    }
}
doSomething()