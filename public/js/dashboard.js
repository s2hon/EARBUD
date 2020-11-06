$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $(".user-name").text(data.username);
    });

    $.get("/api/review_data").then(function (data) {
        console.log(data);
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                
                $("#actualReview").append(`
                <div value="${data[i].id}" class="cell small-4 medium-4 large-4"> 
                <b>Review ${data[i].id}</b><br>
                <u>Song</u>: ${data[i].song} <br>
                <u>Artist</u>: ${data[i].artist} <br>
                <u>Review</u>: ${data[i].body} <br>
                <u>Rating</u>: ${data[i].rating} out of 10 <br>
                <button class="edit button" type="button" value="${data[i].id}">edit <i class="far fa-edit"></i></button>
                <button class="delete button button" type="button" value="${data[i].id}">delete <i class="fas fa-trash"></i></button>
                </div>
                        `)
        }}
    });

        //need to put author selection
        $.get("/api/user_data").then(function(data) {
            $("#author").append("<option value='1'>"+data.username+"</option>");
        });
    
        $(document).on("submit", "form.review", handleFormSubmit);
        $(document).on("click", "button.delete", deleteReview);
        $(document).on("click", "button.edit", editReview);
    
    
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
    
    
        let titleInput = $("#title");
        let artistInput = $("#artist");
        let albumInput = $("#album");
        let bodyInput = $("#body");
        let ratingSelect = $("#rating");
        let authorSelect = $("#author");
    
        //edit review
        
        function editReview(event) {
            new Foundation.Reveal($("#element")).open();
            event.stopPropagation();
            let id = $(this).val();
            $.get("/api/review/" + id).
            then(function (data){
            console.log(data);
            titleInput.val(data.song);
            artistInput.val(data.artist);
            albumInput.val(data.album);
            bodyInput.val(data.body);
            ratingSelect.val(data.rating);
            data.author === '0' ? authorSelect.val("0") : authorSelect.val("1")
            })
        }
        //submite edit review
    
        //delete review
        function deleteReview(event) {
            event.stopPropagation();
            let id = $(this).val();
            $.ajax({
                url: "/api/review/"+ id,
                type: 'DELETE',
                success: function(response) {
                    location.reload();
                    console.log(response);
                },
                error: function(response) {
                    console.log(response);
                }
            });
        }


});


