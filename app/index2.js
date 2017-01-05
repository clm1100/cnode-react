//import React from 'react';
//import { render } from 'react-dom';
//import Profile from './Profile';
//
//const ele = document.createElement('div');
//document.body.appendChild(ele);
//const props = {
//    name: 'viking',
//    age: 20
//};1
//render(<Profile {...props} />, ele);


import React ,{Component} from 'react';
import { render } from 'react-dom';
import {browserHistory, Router, Route, Link } from 'react-router';
import Profile from './components';
import Home from  './components/home';




class App extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>{ this.props.name }</h1>
                {/* 把 <a> 变成 <Link> */}
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>

                {/*
                 接着用 `this.props.children` 替换 `<Child>`
                 router 会帮我们找到这个 children
                 */}
                {this.props.children}
            </div>
        )
    }
}


function About(){
    return (
        <h1>About</h1>
    )
}



const ele = document.createElement('div');
document.body.appendChild(ele);
const props = {
    name:"clm",
    age:30
};
render(
    <Router history = {browserHistory} >
        <route path ="/" component={Home} />
        <route path ="/locations" component={About} />
    </Router>
    , ele)
