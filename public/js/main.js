const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event)=>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Please write the cityname before you search`;
        datahide.classList.add('data_hide');
    }else{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&APPID=843e220d0f8b7e329e1022e1086281cb`;
        const response = await fetch(url);
        const data  = await response.json();
        const arrData = [data];
        try {
            datahide.classList.remove('data_hide');
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            const tmp = arrData[0].main.temp - 273;
            temp.innerText = tmp.toFixed(1);
            const tempMood = arrData[0].weather[0].main;
            //console.log(arrData[0]);
            // check weather condition that whether it is clody rainy
            if(tempMood==="Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }else if(tempMood==="Clouds"){
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            }else if(tempMood==="Rain"){
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
            }else{
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            
        }catch{
            if(data.cod==="404"){
                datahide.classList.add('data_hide');
                city_name.innerText = `Please enter the city name properly`;
            }
            else
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);