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

function movieThis() {
    if (searchTerm === undefined) {
        let searchTerm = "True+Romance"
        request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {
            console.log('error:', error);
            var movie = JSON.parse(body)
            console.log(chalk.white.bgBlue("Title: ") + chalk.red.bold(movie.Title))
            console.log(chalk.white.bgBlue("Year: ") + chalk.red.bold(movie.Year))
            console.log(chalk.white.bgBlue("IMDB: ") + chalk.red.bold(movie.Ratings[0].Value))
            console.log(chalk.white.bgBlue("Rotten Tomatoes: ") + chalk.red.bold(movie.Ratings[1].Value))
            console.log(chalk.white.bgBlue("Country: ") + chalk.red.bold(movie.Country))
            console.log(chalk.white.bgBlue("Language: ") + chalk.red.bold(movie.Language))
            console.log(chalk.white.bgBlue("Plot: ") + chalk.red.bold(movie.Plot))
            console.log(chalk.white.bgBlue("Stars: ") + chalk.red.bold(movie.Actors))
            console.log("\n--------------------------------")
        })
    } else {
        request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {
            console.log('error:', error);
            var movie = JSON.parse(body)
            console.log(chalk.white.bgBlue("Title: ") + chalk.red.bold(movie.Title))
            console.log(chalk.white.bgBlue("Year: ") + chalk.red.bold(movie.Year))
            console.log(chalk.white.bgBlue("IMDB: ") + chalk.red.bold(movie.Ratings[0].Value))
            console.log(chalk.white.bgBlue("Rotten Tomatoes: ") + chalk.red.bold(movie.Ratings[1].Value))
            console.log(chalk.white.bgBlue("Country: ") + chalk.red.bold(movie.Country))
            console.log(chalk.white.bgBlue("Language: ") + chalk.red.bold(movie.Language))
            console.log(chalk.white.bgBlue("Plot: ") + chalk.red.bold(movie.Plot))
            console.log(chalk.white.bgBlue("Stars: ") + chalk.red.bold(movie.Actors))
            console.log("\n--------------------------------")
        })
    }
}

function band() {
    if (searchTerm === undefined) {
        let searchTerm = "Justice"
        request("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp", function (error, response, body) {
            console.log('error:', error);
            var bandaid = JSON.parse(body)

            for (i = 0; i < bandaid.length; i++) {
                let date = bandaid[i].datetime
                let dateForm = moment(date).format("MM/DD/YYYY")
                console.log(chalk.white.bgRed("Name: ") + chalk.blue.bold(bandaid[i].venue.name))
                console.log(chalk.white.bgRed("Location: ") + chalk.blue.bold(bandaid[i].venue.city + "," + bandaid[i].venue.region + "," + bandaid[i].venue.country))
                console.log(chalk.white.bgRed("Date: ") + chalk.blue.bold(dateForm))
                console.log("\n--------------------------------")
            }
        })
    } else {
        request("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp", function (error, response, body) {
            console.log('error:', error);
            var bandaid = JSON.parse(body)

            for (i = 0; i < bandaid.length; i++) {
                let date = bandaid[i].datetime
                let dateForm = moment(date).format("MM/DD/YYYY")
                console.log(chalk.white.bgRed("Name: ") + chalk.blue.bold(bandaid[i].venue.name))
                console.log(chalk.white.bgRed("Location: ") + chalk.blue.bold(bandaid[i].venue.city + "," + bandaid[i].venue.region + "," + bandaid[i].venue.country))
                console.log(chalk.white.bgRed("Date: ") + chalk.blue.bold(dateForm))
                console.log("\n--------------------------------")
            }
        })
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