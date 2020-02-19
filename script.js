




$("#searchBtn").on("click",function(event){
    event.preventDefault();

    var apiKey = "4b4e6e625a6b65f633ce3d723dd07e92";
    var city = $("#searchInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
   // var data = JSON.parse(localStorage.getItem("london"));
    //console.log(data);

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    //localStorage.setItem("paris",JSON.stringify(response));
});

});