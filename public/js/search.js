
$(document).ready(function(){

const songList = document.getElementById('songList');
// const searchBar = document.getElementById('search-button');
let songs = [];

$("#search-button").on("click", (data) => {
    // const searchString = data.target.value.toLowerCase();
    const response = $(".search-bar").val();
    console.log(response);

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
});
