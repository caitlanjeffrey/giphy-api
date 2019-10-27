
// start of document

// variable to create array for initial buttons
var giphyButtons = ['The-Rock', 'Ru-Paul', 'SNL', 'Futurama', 'The-Office'];

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
                class='card-img-top giph' alt='giph' 
                data-state='still'>`;

                $("#giphs-go-here").append(giphImageElement);
            
            var giphTitleRating = "<div class='card-body'>" + "<p class='card-text'>Title: " + giphs[j].title + "</p>" + "<br>" + "<p class='card-text'>Rating: " + giphs[j].rating + "</p>";
                $("#giphs-go-here").append(giphTitleRating);

            var animateGiph = 
                `<div class="card">
                <img src=${giphs[j].images.fixed_height.url}
                class='card-img-top giph' alt='giph' 
                data-state='still'>`;

                // this isn't working as desired. I know it's replacing the full #giphs-go-here div with the "animated giph"
                $("img").on("click", function() {
                    $("#giphs-go-here").replaceWith(animateGiph);
                });
            
                //-----This commented out area below is what i was working on for a single giph to animate-----//
                // $("img").on("click", function(){
                //     var index = $(this).attr('img', 'id');
                //     console.log(index);
                //     var animated = index.attr("data-animate");
                //     $(".card").replaceWith(animated);
                // });
        }
    })
    $("#giphs-go-here").empty();
})

// calling initial renderButtons function
renderButtons();