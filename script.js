const planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
const distances = [1, 1.85, 2.56, 3.90, 13.33, 24.56, 49.28, 77.05, 101.28];
const mercury_rad = 4;
const delay = 20;
let year = 0;
const year_text = document.querySelector(".year-text");
const radius_list = distances.map((element) => {
    return element * mercury_rad;
})
const planet_node = planets.map((element) =>{
    return document.querySelector(`.${element}`);
})
let planet_x = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let planet_y = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function set_planet(planet_node, x, y)
{
    planet_node.style.left = `${900 + x}px`;
    planet_node.style.top = `${400 - y}px`;
}

let time = 0;
const rel_periods = [1, 2.58, 4.17, 7.83, 49.42, 122.75, 350, 686.67, 1033.33];
let mercury_period = 100;
let periods = rel_periods.map((element) => {
    return element * mercury_period;
})

function angle_rad(period, time)//takes in time period and time and return angle in radians
{
    return (2*Math.PI/period)*time;
}

function update(){
    for(let i = 0; i < 9; i++)
    {
        let angle = angle_rad(periods[i], time);
        planet_x[i] = radius_list[i] * Math.cos(angle);
        planet_y[i] = radius_list[i] * Math.sin(angle);
        year = (time/mercury_period)/rel_periods[2];
    }
}

function paint(){
    for(let i = 0; i < 9; i++)
    {
        set_planet(planet_node[i], planet_x[i], planet_y[i]);
    }
    year_text.textContent = `${year.toFixed(2)}`;
}

function simulate(){
    time += delay;
    update();
    paint();
}

setInterval(simulate, delay);

//Speed Controller
let speed_slider = document.querySelector(".speed-slider");
let slider_value = document.querySelector(".slider-value");
let value = +speed_slider.value;
setInterval(() =>{
    let new_value = +speed_slider.value;
    if(value != new_value)
    {
    value = new_value;
    slider_value.textContent = `${value}`;
    mercury_period = 1000/(value * rel_periods[2]);
    periods = rel_periods.map((element) => {
    return element * mercury_period;
    })
    time = 0;
    }
},100)