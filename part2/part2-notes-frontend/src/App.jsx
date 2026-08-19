import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search),
  );

  const addPerson = (e) => {
    e.preventDefault();
    if (!newName) {
      alert(`enter a name`);
      return;
    }
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else if (persons.find((person) => person.phone === newPhone)) {
      alert(`${newPhone} is already added to the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone,
      };
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewPhone("");
    }
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    e.preventDefault();
    setNewPhone(e.target.value);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div>
      <div>
        newname: {newName} newPhone: {newPhone}
      </div>
      <h2>Phonebook</h2>
      <Filter
        value={search}
        onChange={handleSearchChange}
      />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
