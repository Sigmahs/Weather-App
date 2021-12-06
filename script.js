var button = document.querySelector('button');
var inputValue = document.querySelector('.city');
var nameCity = document.querySelector('.nameCity');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var uvi = document.querySelector('.uvi');

button.addEventListener('click', function(){
     
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=239b1858b66afea52b82e4a09a6c5e3d')
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => {
            var nameValue = data['name'];
            var tempValue = Math.round(data['main']['temp'] - 273);
            var windValue = data['wind']['speed'];
            var humidityValue = data['main']['humidity'];
            var coordinatesValue = [data['coord']['lat'], data['coord']['lon']];

            nameCity.innerHTML = nameValue;
            temp.innerHTML = "Temp: " + tempValue + " Celsius";
            wind.innerHTML = "Wind: " + windValue + " MPH";
            humidity.innerHTML = "Humidity: " + humidityValue + "%";
            coordinates = coordinatesValue;

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+coordinates[0]+'&lon='+coordinates[1]+'&exclude=minutely,hourly,alerts&appid=239b1858b66afea52b82e4a09a6c5e3d')
                .then(response => response.json())
                // .then(data2 => console.log(data2))
                .then(data => {
                    var uVI = data['current']['uvi'];
                    uvi.innerHTML = "UV Index: " + uVI;
                })

                .catch(err => alert("Invalid Coordinates!"));
        })

        .catch(err => alert("Wrong city name!"));


        // fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+coordinates[0]+'&lon='+coordinates[1]+'&exclude=minutely,hourly,alerts&appid=239b1858b66afea52b82e4a09a6c5e3d')
        //     .then(response => response.json())
        //     .then(data => console.log(data))

        //     .catch(err => alert("Invalid Coordinates!"));
    
});