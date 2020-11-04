$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and author select
    const titleInput = $("#title");
    const artistInput = $("#artist");
    const albumInput = $("#album");
    const bodyInput = $("#body");

    var reviewForm = $("#review");
    var authorSelect = $("#author");

    //need to put author selection
    $.get("/api/user_data").then(function(data) {
        $("#author").append("<option value='0'>"+data.username+"</option>");
    });

    $(reviewForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    const url = window.location.search;
    let postId;
    // let authorId;
    // Sets a flag for whether or not we're updating a post to be false initially
    const updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
    }
    // // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    // else if (url.indexOf("?author_id=") !== -1) {
    // authorId = url.split("=")[1];
    // }

    // Getting the authors, and their posts
    // getAuthors();

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !artistInput.val().trim() || !albumInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
            return;
        }
    // Constructing a newPost object to hand to the database
        var newPost = {
            song: titleInput.val().trim(),
            artist: artistInput.val().trim(),
            album: albumInput.val().trim(),
            body: bodyInput.val().trim(),
            rating: rating.toString(),
            AuthorId: authorSelect.val()
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    }

    function submitPost(post) {
        $.post("/api/review", post, function() {
            window.location.href = "/review";
        });
    }

    // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
    function getPostData(id, type) {
    var queryUrl;
    switch (type) {
        case "post":
            queryUrl = "/api/review/" + id;
            break;
        case "author":
            queryUrl = "/api/authors/" + id;
            break;
        default:
            return;
    }

    $.get(queryUrl, function(data) {
        if (data) {
            console.log(data.AuthorId || data.id);
            // If this post exists, prefill our cms forms with its data
            titleInput.val(data.title);
            bodyInput.val(data.body);
            authorId = data.AuthorId || data.id;
            // If we have a post with this id, set a flag for us to know to update the post
            // when we hit submit
            updating = true;
        }
    });
    }

});
