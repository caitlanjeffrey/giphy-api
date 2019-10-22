
// Start of Document

// variables to store giphs
var giphyDogs = [];
var giphyRu = [];
var giphyRock = [];

$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

    console.log(response);

      // Step 2: since the image information is inside of the data key,
      // make a variable named results and set it equal to response.data

      // =============== put step 2 in between these dashes ==================
    var results = response.data
      // ========================

    for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>");
            $(p).text(results[i].title);
        var animalImage = $("<img>")
            $(animalImage).attr("src", results[i].images.fixed_height.url);
            $(animalDiv).append(p);
            $(animalDiv).append(animalImage);
            $("#gifs-appear-here").prepend(animalDiv);