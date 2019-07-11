$("button").on("click", function () {
    $("#gifs-appear-here").empty();
    var gifs = $(this).attr("data-item");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifs + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURL);

            console.log(response.data);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifsDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var gifImage = $("<img>");
                gifImage.on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");

                gifsDiv.append(p);
                gifsDiv.append(gifImage);

                $("#gifs-appear-here").prepend(gifsDiv);
                //console.log(response.data);
            }
        });
});