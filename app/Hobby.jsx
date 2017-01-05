//import React, { PropTypes } from 'react';
//import './hobby.css';
//const propTypes = {
//    hobby: PropTypes.string.isRequired
//};
//function Hobby(props) {
//    return <li>{props.hobby}</li>;
//}
//Hobby.propTypes = propTypes;
//export default Hobby;

import React ,{ PropTypes } from 'react';
import './hobby.css';
const propTypes = {
    hobby: PropTypes.string.isRequired
}
function Hobby(props){
    return <li>{ props.hobby }</li>;
}
Hobby.propTypes = propTypes;
export default Hobby;

