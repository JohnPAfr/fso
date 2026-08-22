const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length === 1) {
    const country = countries[0];
    const languages = Object.values(country.languages);
    console.log("country", country);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>{country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          style={{ width: "300px", height: "auto" }}
        />
      </div>
    );
  }
  return (
    <div>
      {countries?.map((c) => (
        <div key={c.name.official}>{c.name.common}</div>
      ))}
    </div>
  );
};

export default CountryList;
