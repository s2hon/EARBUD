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

    const submit = document.getElementById('review');
    $(submit).on("submit", handleFormSubmit)

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        var newPost = {
            song: titleInput.val().trim(),
            artist: artistInput.val().trim(),
            album: albumInput.val().trim(),
            body: bodyInput.val().trim(),
            rating: ratingSelect.val(),
            author: authorSelect.val()
        };

    // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !artistInput.val().trim() || !albumInput.val().trim() || !bodyInput.val().trim() || !ratingSelect.val() || !authorSelect.val()) {
            return;
        }

    // Constructing a newPost object to hand to the database
        var newPost = {
            song: titleInput.val().trim(),
            artist: artistInput.val().trim(),
            album: albumInput.val().trim(),
            body: bodyInput.val().trim(),
            rating: ratingSelect.val(),
            author: authorSelect.val() === 'anonymous' ? '0' : authorSelect.val()
        };


        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        // if (updating) {
        //     newPost.id = postId;
        //     updatePost(newPost);
        // }
        // else {
        submitPost(newPost);
        // }
    }

    function submitPost(post) {
        console.log('post', post)
        $.post("/api/review", post, function(response) {
            console.log(response)
            // window.location.href = "/review";
        });
    }
});
