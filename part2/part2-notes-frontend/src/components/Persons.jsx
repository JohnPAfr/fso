const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons?.map((person) => (
        <div key={person.name}>
          {person.name} {person.phone}
        </div>
      ))}{" "}
    </>
  );
};

export default Persons;
