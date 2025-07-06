const planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
const distances = [1, 1.85, 2.56, 3.90, 13.33, 24.56, 49.28, 77.05, 101.28];
const mercury_rad = 4;
const delay = 25;
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
const mercury_period = 100;
const periods = rel_periods.map((element) => {
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
    }
}

function paint(){
    for(let i = 0; i < 9; i++)
    {
        set_planet(planet_node[i], planet_x[i], planet_y[i]);
    }
}

function simulate(){
    time += delay;
    update();
    paint();
}

setInterval(simulate, delay);