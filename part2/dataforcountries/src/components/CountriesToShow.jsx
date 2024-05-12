/* eslint-disable react/prop-types */
import CountryData from "./CountryData"


const CountriesToShow = ({ countries, search, showCountry, setShowCountry }) => {



    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))


    console.log('filteredCountries:', filteredCountries)    
    //lot of countries
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    
    //only oneCountry
    if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return <CountryData show country={country} />
    }
    //no countries
    if (filteredCountries.length === 0) {
        return <p>No countries found</p>
    }

    //showCountry
    return (
        <div>
        {filteredCountries.map(country => (
            <div key={country.name.common}>
            <p> {country.name.common}
                <button onClick={() => setShowCountry(country)}>show</button>
            </p>
            <CountryData show={showCountry===country} country={showCountry} />
            </div>
        ))}
        </div>
    )
    
}

export default CountriesToShow