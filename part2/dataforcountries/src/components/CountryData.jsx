/* eslint-disable react/prop-types */


const CountryData = ({ show, country }) => {
    if (!show) return null
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name} style={{ width: '100px' }} />
        </div>
        )
    }

export default CountryData