
function productSearch(){


    $(".button").on("click", function(){
        console.log("clicked")
        $(".productDisplay").empty();

        var productName = $("#product-input").val().trim();
        var apiKey = "api_key=wswjour498ryj8w3bbrwiraw";
        var querryUrl = "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?" + apiKey + "&limit=10&tags=" + productName;

        $.ajax({
            url: querryUrl,
            method: "GET"
        })
        .then(function(response){
            const imagePromise = [];
            for ( var i = 0; i < response.results.length; i++){
                var products = response.results;
                
                console.log(products[i]);
                
                var productCard = $("<div>").addClass("card col s12 m12 blue-grey darken-1 white-text");
                productCard.attr("id", i);
                var productCardBody = $("<div>").addClass("card-body p-3");
                
                var productTitle = $("<span>").addClass("card-title").text(products[i].title);
                var productId = $("<p>").addClass("card-text").text("Listing ID: " + products[i].listing_id);
                var urlDiv = $("<div>").addClass("card-action");
                var productUrl = $("<a>").attr("href", products[i].url).text("GET IT!!").addClass("get-it");
                var productPrice = $("<h4>").addClass("card-text").text("Price: $" + products[i].price);

                urlDiv.append(productUrl);
                productCardBody.append(productTitle, productId, productPrice, urlDiv);
                productCard.append(productCardBody);

                var imageQuerryUrl = "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/:listing_id/images?api_key=wswjour498ryj8w3bbrwiraw&listing_id=" + products[i].listing_id;
                
                imagePromise.push($.ajax({
                    url: imageQuerryUrl,
                    method: "GET"
        
                }))
                $(".productDisplay").append(productCard);
            }
                Promise.all(imagePromise).then(function(imageResponse){
                    for (let i in imageResponse){
                        if (imageResponse[i].results.length){
                            var image = imageResponse[i].results[0].url_570xN;
                            console.log(image);
                    
                            var productImage = $("<div>").addClass("card-image");
                            var imageElement = $("<img>").attr("src", image);
                            productImage.append(imageElement);
                            console.log(productImage)
                            $("#" + i).append(productImage)
                            // productCard.append(productImage);
                          
                        }
                    }
                   
                      


                })
            
            
        
    })
})
} productSearch();
