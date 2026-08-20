import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search),
  );

  const addPerson = (e) => {
    e.preventDefault();
    if (!newName) {
      alert(`enter a name`);
      return;
    }
    const newPerson = {
      name: newName,
      phone: newPhone,
    };
    if (persons.find((person) => person.name === newName)) {
      const confirmed = window.confirm(
        `${newName} already exist in the phonebook, replace old number with the new one ?`,
      );
      if (!confirmed) return;
      const personToUpdate = persons.find((person) => person.name === newName);
      personsService
        .update(personToUpdate.id, newPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person,
            ),
          );
          setNewName("");
          setNewPhone("");
        });
    } else if (persons.find((person) => person.phone === newPhone)) {
      alert(`${newPhone} is already added to the phonebook`);
    } else {
      personsService.create(newPerson).then((personCreated) => {
        setPersons([...persons, personCreated]);
        setNewName("");
        setNewPhone("");
      });
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

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmed = window.confirm(`Delete ${personToDelete.name} ?`);
    if (!confirmed) return;
    personsService.deleteOne(id).then((deletedPerson) => {
      setPersons((currentPersons) =>
        currentPersons.filter((person) => person.id !== deletedPerson.id),
      );
    });
  };

  return (
    <div>
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
      <Persons
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
