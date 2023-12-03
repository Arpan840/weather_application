const fetchData = document.querySelector(".button");
const frontDisplay = document.querySelector(".mainFrontPage");
const report = document.querySelector(".report");
const longitude = document.querySelector(".long");
const latitude = document.querySelector(".lat");
const gmap = document.querySelector(".gmap");
const location = document.querySelector("#location");
const windSpeed = document.querySelector("#windspeed");
const humidity = document.querySelector("#humidity");
const timezone = document.querySelector("#timezone");
const pressure = document.querySelector("#pressure");
const winddirection = document.querySelector("#winddirection");
const uvindex = document.querySelector("#uvindex");
const feelslike = document.querySelector("#feelslike");

fetchData.addEventListener("click", async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (location) => resolve(location),
        (error) => reject(error)
      );
    });

    const locationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    };
    let data = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=d1221b093d134b758ff74525230309&q=${locationData.latitude},${locationData.longitude}&aqi=yes`
    );
    if (!data.ok) {
      throw new Error(`Failed to fetch weather data (HTTP ${data.status})`);
    }
    let wetherReport = await data.json();
    console.log(wetherReport.location.name);
    location.innerHTML = "Location : " + wetherReport.location.name;
    windSpeed.innerHTML =
      "Wind Speed : " + wetherReport.current.wind_kph + "kmph";
    humidity.innerHTML = "Humidity : " + wetherReport.current.humidity;
    timezone.innerHTML = "Time Zone : " + wetherReport.location.tz_id;
    pressure.innerHTML =
      "Pressure : " + wetherReport.current.pressure_in + "atm";
    winddirection.innerHTML =
      "Wind Direction : " + wetherReport.current.wind_dir;
    uvindex.innerHTML = "UV Index : " + wetherReport.current.uv;
    feelslike.innerHTML = "Feels like : " + wetherReport.current.feelslike_c;

    longitude.innerHTML = "Long : " + locationData.longitude;
    latitude.innerHTML = "Lat : " + locationData.latitude;
    gmap.innerHTML = `<iframe
    src="https://maps.google.com/maps?q=${locationData.latitude}, ${locationData.longitude}&z=15&output=embed"
    width="1650"
    height="400"
    frameborder="0"
    style="border: 0"
  ></iframe>`;
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
  frontDisplay.style.display = "none";
  report.style.display = "block";
});
