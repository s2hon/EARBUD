const reviewRoutes = require("../../routes/review-routes");

$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $(".user-name").text(data.username);
    });
    $.get("/api/review").then(function (data) {
        for (var i = 0; i < data.id; i++) {
            $("#actualReview").append(`
<div> Review Of: ${data.song} <br>
Artist: ${data.artist} <br>
Review By: ${data.author} <br>
Review: ${data.body} <br>
Rating: ${data.rating} <br>
</div>
            `)
        }
    })
});
