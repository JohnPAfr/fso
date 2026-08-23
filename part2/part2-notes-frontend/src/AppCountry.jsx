import { useEffect, useState } from "react";

import countryService from "./services/country";

import "./index.css";
import CountryList from "./components/CountryList";

const App = () => {
  const [country, setCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((response) => {
      setAllCountries(response);
    });
  }, []);

  const handleCountryChange = (e) => {
    e.preventDefault();
    setCountry(e.target.value.toLowerCase());
    setCountries((currentValue) => {
      console.log("curr", currentValue);
      return allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(country),
      );
    });
  };

  return (
    <div>
      debug: {country}
      <div>
        find countries
        <input
          value={country}
          onChange={handleCountryChange}
        />
      </div>
      <CountryList countries={countries} />
    </div>
  );
};

export default App;
