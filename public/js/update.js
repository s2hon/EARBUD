

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
    