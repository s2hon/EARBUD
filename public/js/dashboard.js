$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $(".user-name").text(data.username);
    });

    $.get("/api/reviews").then(function (data) {
        for (var i = 0; i < data.id; i++) {
            $("#actualReview").append(`
            <div id="review.${data.id}"> Review Of: ${data.song} <br>
            Artist: ${data.artist} <br>
            Review By: ${data.author} <br>
            Review: ${data.body} <br>
            Rating: ${data.rating} <br>
            <button id="edit-button" class="button">edit <i class="far fa-edit"></i></button>
            <button id="delete-button" class="button">delete <i class="fas fa-trash"></i></button>
            </div>
                    `)
        }
    });



    //edit review
    $("").on("submit", editReview);

    function editReview() {

    };
    //delete review
    $("").on("submit", editReview);

    function editReview() {

    };
});


