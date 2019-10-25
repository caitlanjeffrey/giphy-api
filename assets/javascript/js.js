
// start of document

// variable to create array for initial buttons
var giphyButtons = ['The-Rock', 'Ru-Paul', 'Dogs'];

// dynamically creating buttons
function renderButtons(){

    // start with empty buttons
    $("#button-location").empty();
    for (var i = 0; i < giphyButtons.length; i++) {
        // create buttons through array for loop
        var btn = $("<button class='btn btn-primary btn-lg giphy-btn' name=" + giphyButtons[i] + ">");
        btn.text(giphyButtons[i]);
        $("#button-location").append(btn);
    }
    // when search "add button"
    $("#button-addon2").on("click", function(event) {
        event.preventDefault();
        var searchInput = $("#search-input").val().trim();
        giphyButtons.push(searchInput);
        renderButtons();
    })
}

$(document).on("click", ".giphy-btn", function(){
    $("#search-input").empty();
    var btnSelected = $(this).data("name");
    console.log(btnSelected);
    // api call with key
    var URL = "http;//api.giphy.com/v1/gifs/search?api_key=jELqt1msMihyKzBuTA7k7ATdE1CIiyxi&q=" + btnSelected + "&limit=10&offset=0&rating=PG-13&lang=en";
    
    //ajax api call
    $.ajax({
        url: URL,
        method: "GET",
    }).then(function(response){
        console.log(URL);
        console.log(response);

        // creating for loop for response data
        for (var j = 0; j < response.data.length; j++) {
            var rating = response.data[i].rating;

            var giphyDiv = $("<div class='giphs-go-here'>");
            var p = $("<p>").text("Rating " + rating);
                p.addClass("giphyRating");
            var animateGiphy = response.data[j].images.fixed_height.url;
            var stillGiphy = response.data[j].image.fixed_height.url;
            var giphImage = $("<img>");
                giphImage.attr("src", "data-still", stillGiphy);
                //giphImage.attr("data-still", stillGiphy);
                giphImage.attr("data-animated", "data-state", "still", animateGiphy);
                //giphImage.attr("data-state", "still");
                giphyDiv.append(p);
                giphyDiv.append(giphImage);
    
            $("#giph-div").append(giphyDiv);
        }
    });
});

$(document).on("click", ".giphyRating", function(){
    var giphState = $(this).attr("data-state");

    if (giphState === "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    }
    else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

// calling initial renderButtons function
renderButtons();