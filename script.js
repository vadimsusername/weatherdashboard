var cities = [];

$("#searchBtn").on("click",function(event){
    event.preventDefault();

    var apiKey = "4b4e6e625a6b65f633ce3d723dd07e92";
    var city = $("#searchInput").val();

    if(cities.indexOf(city.toLowerCase()))
    cities.push[city];
    $("ul").empty();

    for(var i = 0; i < cities.length; i++){
        var li = $("<li class='list-group-item'>"+city+"</li>");
        $("ul").append(li);
    }
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;

    //var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&APPID=" + apiKey;
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +  "&units=imperial" + "&APPID=" + apiKey;
    //var response = JSON.parse(localStorage.getItem("london"));
    //console.log(response);
    
    
    var date = new Date();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        $("main").empty();

        var cityDate = $("<h4>");
        
        cityDate.text(response.name + " (" + (date.getMonth()+1) + "/"+ date.getDate() + "/" + date.getFullYear() + ")");  
        $("main").append(cityDate );
    
        var temp = $("<p>");
        temp.text("Temperature: " + response.main.temp + " °F" );
        $("main").append(temp);
    
        var humidity = $("<p>");
        humidity.text("Humidity: " + response.main.humidity + "%");
        $("main").append(humidity);
    
        var wind = $("<p>");
        wind.text("Wind Speed: " + response.wind.speed + " MPH");
        $("main").append(wind);
    
        var lon = response.coord.lon;
        var lat = response.coord.lat;

        
        /*var uvQueryUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
        
        
        console.log(uvQueryUrl);
        
        $.ajax({
            url: uvQueryUrl,
            method: "GET"
        }).then(function(uvindex){
            console.log(uvindex);
        })
        */

        //localStorage.setItem("london",JSON.stringify(response));
    });

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $(".five-day").empty();

        var days = [0,7,15,23,31];
        for(var i = 0; i<5 ; i++){
            var div = $("<div>");
            div.attr("class","forecast")
            var day = $("<h5>");
            day.text((date.getMonth()+1) + "/"+ (date.getDate() + i + 1) + "/" + date.getFullYear());  
            div.append(day);
            console.log(day);

            var temp = $("<p>"); 
            temp.text("Temp: " + response.list[days[i]].main.temp + " °F");
            div.append(temp);
            console.log(temp);

            var humidity = $("<p>");
            humidity.text("Humidity: " + response.list[days[i]].main.humidity + "%");
            div.append(humidity);

            $(".five-day").append(div);

        }

    })


});