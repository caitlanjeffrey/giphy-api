
// start of document

// variable to create array for initial buttons
var giphyButtons = ['The-Rock', 'Ru-Paul', 'Brooklyn-99', 'SNL', 'Applause', 'Futurama', 'The-Office'];

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
}

// clicking giph buttons to make call to giphy-api
$(document).on("click", ".giphy-btn", function(){

    // when user selects "add button"
    $("#button-addon2").on("click", function(event) {
        event.preventDefault();

        var searchInput = $("#search-input").val().trim();
        giphyButtons.push(searchInput);

        $("#search-input").empty();
        renderButtons();
    })

    var btnSelected = $(this).attr("name");
    console.log(btnSelected);
    
    // api call with key
    var URL = "https://api.giphy.com/v1/gifs/search?api_key=jELqt1msMihyKzBuTA7k7ATdE1CIiyxi&q=" + btnSelected + "&limit=10&offset=0&rating=PG-13&lang=en";
    
    //ajax api call
    $.ajax({
        url: URL,
        method: "GET",
    }).then(function(response){
        console.log(URL);
        console.log(response);

        var giphs = response.data;
        // creating for loop for response data
        for (var j = 0; j < giphs.length; j++) {
            
            // dynamically building bootstrap card - image half
            var giphImageElement = 
                `<div class="card">
                <img src=${giphs[j].images.original_still.url}
                id=${[j]}
                class='card-img-top giph' alt='giph' 
                data-state=${giphs[j].images.fixed_height.url}>`;

                $("#giphs-go-here").append(giphImageElement);
            
            var giphTitleRating = "<div class='card-body'>" + "<p class='card-text'>Title: " + giphs[j].title + "</p>" + "<br>" + "<p class='card-text'>Rating: " + giphs[j].rating + "</p>";
                $("#giphs-go-here").append(giphTitleRating);
            
                //-----This commented out area below is what i was working on for a single giph to animate-----//
                $('img').on("click", function(){
                    var index = $(this).attr('img', 'id');
                    console.log(index);
                    //--I am attempting to get the animation click to work---//
                });
        }
    })
    $("#giphs-go-here").empty();
})

// calling initial renderButtons function
renderButtons();