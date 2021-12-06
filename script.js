var button = document.querySelector('button');
var inputValue = document.querySelector('.city');
var nameCity = document.querySelector('.nameCity');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var uvi = document.querySelector('.uvi');
var dayOne = document.querySelector('.day-one');
var dayTwo = document.querySelector('.day-two');
var dayThree = document.querySelector('.day-three');
var dayFour = document.querySelector('.day-four');
var dayFive = document.querySelector('.day-five');
var history = [];

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
                // .then(data => console.log(data))
                .then(data => {
                    var uVI = data['current']['uvi'];
                    var first = new Date(data['daily'][1]['dt'] * 1000);
                    var second = new Date(data['daily'][2]['dt'] * 1000);
                    var third = new Date(data['daily'][3]['dt'] * 1000);
                    var fourth = new Date(data['daily'][4]['dt'] * 1000);
                    var fifth = new Date(data['daily'][5]['dt'] * 1000);

                    uvi.innerHTML = "UV Index: " + uVI;
                    
                    dayOne.innerHTML = (first.getMonth() + 1) + "/" + first.getDate() + "/" + first.getFullYear() + ", Temp: " + Math.round(data['daily'][1]['temp']['day'] - 273) + " Celsius" + ", Wind: " + data['daily'][1]['wind_speed'] + " MPH" + ", Humidity: " + data['daily'][1]['humidity'] + "%";
                    dayTwo.innerHTML = (second.getMonth() + 1) + "/" + second.getDate() + "/" + second.getFullYear() + ", Temp: " + Math.round(data['daily'][2]['temp']['day'] - 273) + " Celsius" + ", Wind: " + data['daily'][2]['wind_speed'] + " MPH" + ", Humidity: " + data['daily'][2]['humidity'] + "%";
                    dayThree.innerHTML = (third.getMonth() + 1) + "/" + third.getDate() + "/" + third.getFullYear()  + ", Temp: " + Math.round(data['daily'][3]['temp']['day'] - 273) + " Celsius" + ", Wind: " + data['daily'][3]['wind_speed'] + " MPH" + ", Humidity: " + data['daily'][3]['humidity'] + "%";
                    dayFour.innerHTML = (fourth.getMonth() + 1) + "/" + fourth.getDate() + "/" + fourth.getFullYear() + ", Temp: " + Math.round(data['daily'][4]['temp']['day'] - 273) + " Celsius" + ", Wind: " + data['daily'][4]['wind_speed'] + " MPH" + ", Humidity: " + data['daily'][4]['humidity'] + "%";
                    dayFive.innerHTML = (fifth.getMonth() + 1) + "/" + fifth.getDate() + "/" + fifth.getFullYear() + ", Temp: " + Math.round(data['daily'][5]['temp']['day'] - 273) + " Celsius" + ", Wind: " + data['daily'][5]['wind_speed'] + " MPH" + ", Humidity: " + data['daily'][5]['humidity'] + "%";
                })

                .catch(err => alert("Invalid Coordinates!"));
        })

        .catch(err => alert("Wrong city name!"));
    
        localStorage.setItem(inputValue.value, inputValue.value);
        
});