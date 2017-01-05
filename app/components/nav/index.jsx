import React ,{ Component }from 'react';
import '../../css/main.css';
import '../../css/main.less';
import Item from './item';
import axios from 'axios';
import store from 'store';
import $ from 'jquery';
import { Link } from 'react-router'
import {ButtonToolbar,Button,Fade,Well,Navbar,NavItem,Nav,Image} from "react-bootstrap";


class ButtonsInstance extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open:true,
            isLogin:false,
            user:null
        };
    }
    componentWillMount(){
        if(this.props.isLogin){
            this.setState({
                isLogin:this.props.isLogin,
                user:store.get('user')
            })
        }else{

        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({isLogin:nextProps.isLogin});
    }

    render() {
        var list = [
            {  biaoti:"招聘" ,index:1,lianjie:"/jianjie"},
            {  biaoti:"问答" ,index:2,lianjie:"/yewu"},
            {  biaoti:"分享" ,index:3,lianjie:"/lianxi"},
            {  biaoti:"精华" ,index:4,lianjie:"/about"},
            {  biaoti:"发布" ,index:5,lianjie:"/test"}
        ];
        var list2 = list.map(function(ele,index){
             return (<Item lianjie={ele.lianjie}  key={index} biaoti= {ele.biaoti}  />)
        });

        var loginButton;
        if (this.state.isLogin) {
            loginButton = (
                <Nav pullRight>
                    <li>
                        <Link  to="/login"><Image circle height="18" src={this.state.user.avatar_url} alt=""/></Link>
                    </li>
                </Nav>
            );
        } else {
            loginButton = (
                <Nav pullRight>
                    <Item lianjie="/login"   biaoti= "登录" />
                </Nav>
            );
        }

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">CNODE</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {list2}
                    </Nav>
                    <Nav pullRight>
                        {loginButton}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}









export default ButtonsInstance;
