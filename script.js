var cities = [];
var apiKey = "4b4e6e625a6b65f633ce3d723dd07e92";
//localStorage.clear();
if(localStorage.getItem("cities")){
    cities = JSON.parse(localStorage.getItem("cities"));
    for(var i = 0; i < cities.length; i ++){
        var li = $("<li class='list-group-item'>" + cities[i] + "</li>");
       
        $("ul").append(li);  
    }

}
$("#searchBtn").on("click",function(event){
    event.preventDefault();

    
    var city = $("#searchInput").val();
  
    if(cities.indexOf(city.toLowerCase()) === -1){
        cities.push(city.toLowerCase());
        localStorage.setItem("cities",JSON.stringify(cities));
        var li = $("<li class='list-group-item'>" + city + "</li>");
       
        $("ul").append(li);     
    }
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;

    //var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&APPID=" + apiKey;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +  "&units=imperial" + "&APPID=" + apiKey;
    //var response = JSON.parse(localStorage.getItem("london"));
    //console.log(response);
    
    
    var date = new Date();

    $.ajax({
        url: queryURL,
        method: "GET",
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
    
        document.querySelector("main").style.display = "block";
        var lon = response.coord.lon;
        var lat = response.coord.lat;

        
        var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
        
        
        console.log(uvQueryUrl);
        
        $.ajax({
            url: uvQueryUrl,
            method: "GET"
        }).then(function(uvindex){
            console.log(uvindex);
            var uvi = $("<p>");
            uvi.text("UV Index: " + uvindex.value);
            $("main").append(uvi);
            
        })
        

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
            

            var temp = $("<p>"); 
            temp.text("Temp: " + response.list[days[i]].main.temp + " °F");
            div.append(temp);
            

            var humidity = $("<p>");
            humidity.text("Humidity: " + response.list[days[i]].main.humidity + "%");
            div.append(humidity);

            $(".five-day").append(div);

        }

    })


});

document.querySelector("ul").addEventListener("click",function(event){

    if(event.target.matches("li") ){
        var city = event.target.textContent;
        console.log(city);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;

        //var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&APPID=" + apiKey;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +  "&units=imperial" + "&APPID=" + apiKey;
        //var response = JSON.parse(localStorage.getItem("london"));
        //console.log(response);
        
        
        var date = new Date();

        $.ajax({
            url: queryURL,
            method: "GET",
        
        }).then(function(response){
            

        
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

            document.querySelector("main").style.display = "block";

            var lon = response.coord.lon;
            var lat = response.coord.lat;

            var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
            
            
            console.log(uvQueryUrl);
            
            $.ajax({
                url: uvQueryUrl,
                method: "GET"
            }).then(function(uvindex){
                console.log(uvindex);
                var uvi = $("<p>");
                uvi.text("UV Index: " + uvindex.value);
                $("main").append(uvi);
                
            })
        });

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
           
            $(".five-day").empty();
    
            var days = [0,7,15,23,31];
            for(var i = 0; i<5 ; i++){
                var div = $("<div>");
                div.attr("class","forecast")
                var day = $("<h5>");
                day.text((date.getMonth()+1) + "/"+ (date.getDate() + i + 1) + "/" + date.getFullYear());  
                div.append(day);
              
    
                var temp = $("<p>"); 
                temp.text("Temp: " + response.list[days[i]].main.temp + " °F");
                div.append(temp);
               
                var humidity = $("<p>");
                humidity.text("Humidity: " + response.list[days[i]].main.humidity + "%");
                div.append(humidity);

                $(".five-day").append(div);

            }

        })

    }
})