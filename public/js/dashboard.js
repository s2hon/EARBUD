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
/*
for each review by the logged in user,
create a div like the one starting on line 10 displaying the review 
and other such info;
i have to grab from the review db
will the users have their own db with only their reviews? ASK THIS, JULIAN
if so then the code should work i hope and think;
oh, how do i write the for function? ASK THIS, JULIAN
I need to use the reviewRoutes const in my actual code, how? ASK THIS JULIAN
*/
