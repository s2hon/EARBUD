$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $(".user-name").text(data.username);
    });

    $.get("/api/review_data").then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#actualReview").append(`
            <div id="review.${data.id}" class="cell small-4 medium-4 large-4"> 
            <b>Review ${data[i].id}</b><br>
            <u>Song</u>: ${data[i].song} <br>
            <u>Artist</u>: ${data[i].artist} <br>
            <u>Review</u>: ${data[i].body} <br>
            <u>Rating</u>: ${data[i].rating} out of 10 <br>
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


