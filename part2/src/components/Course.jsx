const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part
          key={part.id}
          part={part}
        />
      ))}
    </div>
  );
};

const Total = ({ total }) => <b>total of exercises: {total}</b>;

const Course = ({ course }) => {
  const total = course.parts.reduce(
    (acc, current) => current.exercises + acc,
    0,
  );
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
