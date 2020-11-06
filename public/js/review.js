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

    $("form.review").on("submit", handleFormSubmit);

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        let newPost = {
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

        submitPost(newPost);
        titleInput.val("");
        artistInput.val("");
        albumInput.val("");
        bodyInput.val("");
        ratingSelect.val("1");
        authorSelect.val("0");
    }

    function submitPost(newPost) {
        $.post("/api/review", {
            song: newPost.song,
            artist: newPost.artist,
            album: newPost.album,
            body: newPost.body,
            rating: newPost.rating,
            author: newPost.author
        }).then(function(data) {
            $("form.review").foundation('close');

        })
        .catch(handleSubmitErr);
    }

    function handleSubmitErr(err) {
        $(".fi-alert").text(err.responseJSON);
        $(".fi-alert").fadeIn(500);
    }
});
