$(document).ready(function(){
    $("#search-button").on("click", handleSearch);

    function handleSearch(event) {
        console.log("hello");
        event.preventDefault();
        let searchTerm = $(".search-bar").val();
        
        // Wont submit the post if we are missing  search
        if (!searchTerm.trim()) {
            return;
        }
        else {
            $(".search-bar").attr("placeholder", "you must type in something");
        }
 
        passSearch(searchTerm);
        $(".search-bar").val("");
    }
    
    function passSearch(searchTerm) {
        console.log('hello');
        $.get("/api/search", {
            term: searchTerm
        })        
        .then(function(res) {
            console.log(res);
            console.log("success");
            for (var i = 0; i < res.length; i++) {
            $(".song-results").append(`
            <div class="cell small-4 medium-4 large-4">
            <b style = "color: #1bf2cb">Song: ${res[i].song}</b><br>
            artist: ${res[i].artist}<br>
            album: ${res[i].album}<br>
            </div>`)
            }
            // If there's an error, log the error
          })
    
          .catch(function(err) {
            console.log(err);
          });
    }


});