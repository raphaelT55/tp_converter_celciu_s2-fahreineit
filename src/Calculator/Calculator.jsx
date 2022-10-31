import React, { useState } from 'react';

const scaleNames = {
    c: 'Celsius',
    f: 'fahraneit'
}

  /**
     * 
     * @param {number} fahrenheit 
     * @returns {number}
     */
   function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

/**
 * 
 * @param {number} celsius 
 * @returns {number}
 */
function toFahraneit(celsius) {
    return (celsius * 9 / 5) + 32
}

function BoilingVerdict({ celsius }) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau bout </div>
    }
    else {
        return <div className="alert alert-info">L'eau ne bout pas </div>
    }
}

function tryConvert(temperature, convert){
    const value = parseFloat(temperature)
    if(Number.isNaN(value)){
        return '';
    }
    return Math.round(convert(value)*100 /100).toString()
}

function TemparatureInput(props) {

    // const [temperature, setTemperature] = useState('')

    function handleChange(e) {
        props.onTemperatureChange(e.target.value)
    }

    const name = 'scale' + props.scale
    const scaleName = scaleNames[props.scale]
    const temperature = props.temperature
    return <div className="form-group">
        <label htmlFor={name}>Température en {scaleName}</label>
        <input type="text" id={name} value={temperature} className='form-control' onChange={handleChange} />
    </div>
}

export default function Calculator() {

    const [temperature, setTemperature] = useState('')
    const [scale, setScale] = useState("c")

    function handleChangeCelsius(temperature) {
        setTemperature(temperature);
        setScale('c')
    }
    
    function handleChangeFarahneit(temperature) {
        setTemperature(temperature);
        setScale('f')
    }

    const celsius = scale === "c" ? temperature : tryConvert(temperature, toCelsius)
    const fahrenheit = scale === "f" ? temperature : tryConvert(temperature, toFahraneit)
    console.log(fahrenheit);
    console.log(celsius);
    return (
        <div>
            <TemparatureInput scale="c" temperature={celsius} onTemperatureChange={handleChangeCelsius} />
            <TemparatureInput scale="f" temperature={fahrenheit} onTemperatureChange={handleChangeFarahneit}/>
            <BoilingVerdict celsius={celsius}></BoilingVerdict>
        </div>
    )
}
