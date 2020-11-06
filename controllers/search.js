<<<<<<< HEAD:public/js/search.js
require("dotenv").config({path: './.env'});
const keys = require("../../keys")
const fs = require('fs')
const Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
let moment = require('moment')
const request = require('request')
const chalk = require('chalk')
=======
require("dotenv").config()
const keys = require("../keys");
const fs = require('fs');
var Spotify = require('spotify-web-api-js');
const spotify = new Spotify(keys.spotify);
const chalk = require('chalk');
>>>>>>> f83839e10a798a9fdaf93b54784bd3a5ba596814:controllers/search.js
let args = process.argv.slice(2)
let choice = args[0]

exports.doSomething = function (searchTerm) {
    return new doSomething(searchTerm);
}

function doSomething(searchTerm) {

    if (choice === "spotify-this") {
        return spotifyThis(searchTerm)
     } else if (choice === "do-what-it-says") {
        return doWhat(searchTerm)
     }
   
}


function spotifyThis(searchTerm){
    if (searchTerm === undefined) {
        searchTerm = "never gonna give you up";
        spotify.search({
            type: 'track',
            query: searchTerm,
            limit: 5
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
            query: searchTerm,
            limit: 5
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


function doWhat(searchTerm) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        else{
        let input = data.split(",")
        let choice = input[0]
        let searchTerm = searchTerm
        spotify.search({
            type: 'track',
            query: searchTerm,
            limit: 5
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

      }

    })
}

