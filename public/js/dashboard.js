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


    $(document).on("click", "button.delete", deleteReview);
    $(document).on("click", "button.edit", editReview);

    let titleInput = $("#title");
    let artistInput = $("#artist");
    let albumInput = $("#album");
    let bodyInput = $("#body");
    let ratingSelect = $("#rating");
    let authorSelect = $("#author");

    //edit review
    
    function editReview() {
        $('form.review').foundation('open');
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


