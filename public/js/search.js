
$(document).ready(function(){

// const songList = document.getElementById('songList');
// const searchBar = document.getElementById('search-button');
// let songs = [];

function searchMusic(song) {
    var apiKey = "3a62f7eb84bb3fe25640af56e798b7da"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + song + "&units=imperial&appid=" + apiKey;

    //ajax call

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(citySearch);
        console.log(response);
        $(".song-results").append(`
        <ul class="song-info">
        <li class="title">${response.name}</li>
        <li class="album"></li>
        <li class="artist"></li>
    </ul>
        `)

    })
}

$("#search-button").on("click", (data) => {
    // const searchString = data.target.value.toLowerCase();
    const songName = $(".search-bar").val();
    console.log(songName);



    //pass response to li on search.html

 
    // const filteredSongs = songs.filter((character) => {
    //     return (
    //         song.name.toLowercase().includes(searchString)
    //         ||
    //         song.album.toLowerCase().includes(searchString)
    //     );
    // });
    // console.log("search button clicked")
    // displaySongs(filteredSongs);
    searchMusic(songName);
})
 

// const loadSongs = async () => {
//     try {
//         const res = await fetch('https://developer.spotify.com/documentation/web-api/');
//         let songs = await res.json();
//         displaySongs(songs);
//         console.log(songs);
//     } catch (err) {
//         console.error(err);
//     }
 
// };
 
// const displaySongs = (songs) => {
//     const htmlString = songs
//     .map((song) => {
//         return `
//         <li class='character>
//         <h2>${song.name}</h2>
//         <p>Album: ${song.album}</p>
//         <img src="${album.image}"</img>
//         </li>
//         `;
//         })
//         .join('');
//         songList.innerHTML = htmlString;
// };
 
// loadSongs();
})
