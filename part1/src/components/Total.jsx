const Total = ({ total }) => {
    const sum = total.reduce((acc, current) => {
        return acc + current.exercises
    }, 0)
    return ( 
        <p>Number of exercises {sum}</p>
    );
}
 
export default Total;