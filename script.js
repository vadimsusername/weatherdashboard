

$("#searchBtn").on("click",function(event){
    event.preventDefault();

    var apiKey = "4b4e6e625a6b65f633ce3d723dd07e92";
    var city = $("#searchInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;

    
    
    var response = JSON.parse(localStorage.getItem("london"));
    console.log(response);
    
    
    var cityDate = $("<h4>");
    var date = new Date();
    cityDate.text(response.name + " (" + (date.getMonth()+1) + "/"+ date.getDate() + "/" + date.getFullYear() + ")");  
    $(".5day").append(cityDate );

    var temp = $("<p>");
    temp.text("Temperature: " + response.main.temp + " °F" );
    $(".5day").append(temp);

    var humidity = $("<p>");
    humidity.text("Humidity: " + response.main.humidity + "%");
    $(".5day").append(humidity);

    var wind = $("<p>");
    wind.text("Wind Speed: " + response.wind.speed + " MPH");
    $(".5day").append(wind);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var uvQueryUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
        console.log(uvQueryUrl);
        
        $.ajax({
            url: uvQueryUrl,
            method: "GET"
        }).then(function(uvindex){
            console.log(uvindex);
        })
        
        //localStorage.setItem("london",JSON.stringify(response));
    });

});