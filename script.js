$(".button").on("click", function(){
    console.log("clicked")

    var productName = $("#product-input").val().trim();
    
    var querryUrl = "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?api_key=xo2h2wgt4m30eqypx7c7pcfz&limit=10&tags=" + productName;

    $.ajax({
        url: querryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })
  
})
