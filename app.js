const API_URL = 'https://api.openweathermap.org/data/2.5';
const KEY = 'appid=290c68350d3f11ab529919d070ac2b7d'
const ID = 'id=3688685';


function getPais( getcod ) {

    var cod;
    
    switch( getcod ){
    
    case "FR":
    
    case "fr":
    
    cod = "Francia";
    
    break;
    
    case "CO":
    
    case "co":
    
    cod = "Colombia";
    
    break;
    //muchos más casos
    
    }
    
    return cod;
    
}


function sumadias(){
    var fecha = new Date(Date.parse('2021-09-20 04:00:00'));
    var dias = 2; // Número de días a agregar
    fecha.setDate(fecha.getDate() + dias);
   
    console.info('suma fecha', fecha);
    console.info('suma dias', fecha.getDay());

    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fecha);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(fecha);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fecha);
    console.log(`${ye}-${mo}-${da}`);
}

function getDay(getdia, lang){
    let dias = (lang == 'EN')? ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] : ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var fecha = new Date(Date.parse(getdia));
    var dia = parseInt(fecha.getDay());
    console.log('dia:', dia);
    console.log('day', dias[dia]+'/'+fecha.getDay());
    sumadias();
    return dias[dia];
}



function getInfoCityForecast(id, url, lang, cnt){
    const xhr = new XMLHttpRequest();

   function onRequestHandler(){
        if(this.readyState === 4 && this.status === 200){
            const data = JSON.parse(this.response);
            console.log('data', data);
            console.log('data2', data.list[0].weather[0].icon);
            document.querySelector('.panel-container .col-1 .item .img').innerHTML= `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" />`;
            document.querySelector('.panel-container .col-1 .item .texto .texto-title').innerHTML= getDay(data.list[0].dt_txt, 'EN');
            document.querySelector('.panel-container .col-1 .item .texto .texto-info').innerHTML= data.list[0].weather[0].description;
            document.querySelector('.panel-container .col-1 .item .grados .texto').innerHTML= `${Math.round(data.list[0].main.temp_min)}°/${Math.round(data.list[1].main.temp_max)}°`;

            document.querySelector('.panel-container .col-1 .item2 .img').innerHTML= `<img src="https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png" />`;
            document.querySelector('.panel-container .col-1 .item2 .texto .texto-title').innerHTML= getDay(data.list[1].dt_txt, 'EN');
            document.querySelector('.panel-container .col-1 .item2 .texto .texto-info').innerHTML= data.list[1].weather[0].description;
            document.querySelector('.panel-container .col-1 .item2 .grados .texto').innerHTML= `${Math.round(data.list[1].main.temp_min)}°/${Math.round(data.list[1].main.temp_max)}°`;

            document.querySelector('.panel-container .col-1 .item3 .img').innerHTML= `<img src="https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png" />`;
            document.querySelector('.panel-container .col-1 .item3 .texto .texto-title').innerHTML= getDay(data.list[2].dt_txt, 'EN');
            document.querySelector('.panel-container .col-1 .item3 .texto .texto-info').innerHTML= data.list[2].weather[0].description;
            document.querySelector('.panel-container .col-1 .item3 .grados .texto').innerHTML= `${Math.round(data.list[2].main.temp_min)}°/${Math.round(data.list[2].main.temp_max)}°`;
            
        }
    }
    
    xhr.addEventListener('load', onRequestHandler);
    xhr.open('GET', `${API_URL}/${url}?${KEY}&id=${id}&lang=${lang}&units=metric&cnt=${cnt}`);    
    xhr.send();
}

function getInfoCityBanner(id, url, lang){

    const xhr = new XMLHttpRequest();
    let result = [];

   function onRequestHandler(){
        if(this.readyState === 4 && this.status === 200){
            const data = JSON.parse(this.response);
            document.getElementById('bannerTitle').innerHTML='<img src="img/ubicacion-white.png" width="32px" />'+ data.name;
            document.querySelector('.menuLeft .menu1 > div').innerHTML= `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
            document.querySelector('.menuLeft .menu1 > b').innerHTML= `${data.weather[0].description}`;
            document.querySelector('.menuLeft .menu2 > b').innerHTML= `${Math.round(data.main.temp)} °C`;
            document.title= `${data.name} ${Math.round(data.main.temp)} °C`;
        }
    }
    
    xhr.addEventListener('load', onRequestHandler);
    xhr.open('GET', `${API_URL}/${url}?${KEY}&id=${id}&lang=${lang}&units=metric`);    
    xhr.send();
}

function getInfoItem1(id, url, lang, divRaiz, cod){
    const xhr = new XMLHttpRequest();

   function onRequestHandler(){
        if(this.readyState === 4 && this.status === 200){
            const data = JSON.parse(this.response);
            document.querySelector('.'+divRaiz+' .item-1 .item-1-1-1').innerHTML= `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="64px" />`;
            document.querySelector('.'+divRaiz+' .item-1 .item-1-1-2').innerHTML= `${Math.round(data.main.temp)}°C <small>|</small>`;
            document.querySelector('.'+divRaiz+' .item-1 .item-1-1-3 .texto-title').innerHTML= data.name;
            document.querySelector('.'+divRaiz+' .item-1 .item-1-1-3 .texto-info').innerHTML= getPais(cod);
            document.querySelector('.'+divRaiz+' .item-1 .item-1-2 .item-1-2-1').innerHTML= `humidity ${Math.round(data.main.humidity)}° `;
            document.querySelector('.'+divRaiz+' .item-1 .item-1-2 .item-1-2-2').innerHTML= `west`;
            document.querySelector('.'+divRaiz+' .item-1 .item-1-2 .item-1-2-3').innerHTML= `${Math.round(data.wind.speed)} m/h`;
        }
    }
    
    xhr.addEventListener('load', onRequestHandler);
    xhr.open('GET', `${API_URL}/${url}?${KEY}&id=${id}&lang=${lang}&units=metric`);    
    xhr.send();

}

