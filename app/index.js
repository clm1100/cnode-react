import React ,{Component} from 'react';
import { render } from 'react-dom';
import {IndexRoute,browserHistory, Router, Route, Link } from 'react-router';
import axios from 'axios';
import $ from 'jquery';
import store from 'store';
import App from './components';
import Loading from './components/loding';
import Login1 from './components/login';
import yewu from './components/yewu';
//分享组件;
import Jianjie from './components/jianjie';
import Publish from './components/publish';
import Home from './components/home';
import About1 from './components/common/scrolllist';
import {Jianjiezuhe,Content} from './components/jianjiezuhe';
import  'bootstrap/dist/css/bootstrap.css'

import Lianxi from './components/lianxi'
function test(){
    return (
        <div className="page-header">
            <h1>test <small>Subtext for header</small></h1>
        </div>
    )
}


//function Home(){
//    history.pushState("http://www.baidu.com",null,null);
//    return (
//        <div className="page-header">
//            <h1>Home <small>Subtext for header</small></h1>
//        </div>
//    )
//}
function About (){
    return (
        <About1 url='good' />
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
    <route path ="/" component={App} >
        <IndexRoute  component={Home} />
        <route path ="jianjie" component={Jianjiezuhe}>
            <IndexRoute  component={Jianjie} />
            <route path="detail/:id"  component={Content}/>
        </route>
        <route path ="/yewu" component={yewu} />
        <route path ="/lianxi" component={Lianxi} />
        <route path ="/about" component={About} />
        <route path ="/test" component={Publish} />
        <route path ="/login" component={Login1} />
    </route>
</Router>, ele)
