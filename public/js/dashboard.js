$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $(".user-name").text(data.username);
    });

    $.get("/api/review_data").then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#actualReview").append(`
            <div id="review.${data.id}"> 
            <u>Review Of</u>: ${data[i].song} <br>
            <u>Artist</u>: ${data[i].artist} <br>
            <u>Review</u>: ${data[i].body} <br>
            <u>Rating</u>: ${data[i].rating} out of 9 <br>
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


