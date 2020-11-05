$(document).ready(function() {
    let titleInput = $("#title");
    let artistInput = $("#artist");
    let albumInput = $("#album");
    let bodyInput = $("#body");

    // let reviewForm = $("#review");
    let ratingSelect = $("#rating");
    let authorSelect = $("#author");

    //need to put author selection
    $.get("/api/user_data").then(function(data) {
        $("#author").append("<option value='1'>"+data.username+"</option>");
    });

    $("#review").on("submit", handleFormSubmit);

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        var newPost = {
            song: titleInput.val().trim(),
            artist: artistInput.val().trim(),
            album: albumInput.val().trim(),
            body: bodyInput.val().trim(),
            rating: ratingSelect.val(),
            author: authorSelect.val() === 'anonymous' ? '0' : authorSelect.val()
        };

    // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !artistInput.val().trim() || !albumInput.val().trim() || !bodyInput.val().trim() || !ratingSelect.val() || !authorSelect.val()) {
            return;
        }

        submitPost(newPost.song, newPost.artist, newPost.album, newPost.body, newPost.rating, newPost.author);
        titleInput.val("");
        artistInput.val("");
        albumInput.val("");
        bodyInput.val("");
        ratingSelect.val("1");
        authorSelect.val("0");
    }

function submitPost(song, artist, album, body, rating, author) {
    console.log('hello2');
    $.post("/api/review", {
        song: song,
        artist: artist,
        album: album,
        body: body,
        rating: rating,
        author: author
      })
}
});
