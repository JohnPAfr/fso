import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationState, setNotificationState] = useState("success");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search),
  );

  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (!newName) {
      alert(`enter a name`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newPhone,
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
          setNotificationState("success");
          triggerNotification(
            `${updatedPerson.name} phone number has been updated`,
          );
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          console.log(error);
          setNotificationState("error");
          triggerNotification(`${error}`);
          setPersons(persons.filter((person) => person.id !== error.id));
        });
    } else if (persons.find((person) => person.phone === newPhone)) {
      alert(`${newPhone} is already added to the phonebook`);
    } else {
      personsService.create(newPerson).then((personCreated) => {
        setPersons([...persons, personCreated]);
        setNotificationState("success");
        triggerNotification(
          `${newPerson.name} has been added to the phone book`,
        );
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
    personsService.deleteOne(id).then(() => {
      setPersons((currentPersons) =>
        currentPersons.filter((person) => person.id !== id),
      );
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        state={notificationState}
      />
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
