export const Part = (props) => {
    return ( <p>
        {props.name} {props.exercises}
    </p> );
}

const Content = ({ parts }) => {
    console.log('coucou', parts)
    return ( 
       <>
        {parts.map(part => (<Part key={part.name} name={part.name} exercises={part.exercises} />))}
      </>
     );
}
 
export default Content;