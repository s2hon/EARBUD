require("dotenv").config();
const keys = require("../../keys")
const fs = require('fs')
const Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
let moment = require('moment')
const request = require('request')
const chalk = require('chalk')
let args = process.argv.slice(2)
let choice = args[0]
let searchTerm = args[1]

$(document).ready(function(){


function spotifyThis() {

    if (searchTerm === undefined) {
        let searchTerm = "never gonna give you up"
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



    })
}

function doSomething() {

    if (choice === "spotify-this") {
        spotifyThis()
     } else if (choice === "do-what-it-says") {
        doWhat()
     }
   
}
doSomething();

// function searchMusic() {
    
//     //ajax call
//     var accessToken = SPOTIFY_SECRET;
// $.ajax({
//     url: 'https://api.spotify.com/v1/search/q?='+searchTerm,
//     type: 'GET',
//     headers: {
//         'Authorization' : 'Bearer ' + accessToken
//     },
//     success: function(data) {
//         $(".song-results").append(`
//         <ul class="song-info">
//         <li style= color; "white" class="title">${response.track}</li>
//         <li class="album"></li>
//         <li class="artist"></li>
//     </ul>
//         `)
//         console.log(data);
//     }
// });
    

// $("#search-button").on("click", (event) => {
//     // const searchString = data.target.value.toLowerCase();
//     event.preventDefault();
//     searchMusic();
//     const searchTerm = $(".search-bar").val();
//     if (searchTerm === undefined) {
//         let searchTerm = "never gonna give you up"
//         spotify.search({
//             type: 'track',
//             query: searchTerm,
//             limit: 5
//         }, function (err, data) {
//             if (err) {
//                 return console.log('Error occurred: ' + err);
//             }

//     searchMusic(searchTerm);
// })
//     }
// });
// }
})
