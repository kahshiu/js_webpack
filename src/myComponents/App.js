import React from "react";
import { connect } from "react-redux"; 

export const App = (props) => {
  const handleClick = () => {
    props.dispatch({type:"ADD_TODO"})
  }

  return (
    <div>
      <div>{props.warning && props.warning.stat}</div>
      hello's content
      <button onClick={handleClick}> hello </button>
      {props.something && props.something.join(" ")}
    </div>
  )
}

const appStateToProp = (state) => {
  return {
    something: state.todos
    ,warning: state.formUiState
  }
}

const AppConnected = connect(appStateToProp)(App);
export default AppConnected;
