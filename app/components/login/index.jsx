/**
 * 登录组件
 */
import React ,{Component} from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import store from 'store';
import TabComponent from './tab';
import Loading from '../loding';
import {IndexRoute,browserHistory, Router, Route, Link } from 'react-router';

class Login1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
            user:null
        };
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
    }
    componentWillMount(){
        console.log("sssq",this.props.isLogin);
        if(this.props.isLogin){
            console.log("登录");
            this.setState({
                isLogin:true,
                user:store.get('user')
            })
        }else{
            console.log("没登录")
        }
    }
    Logout(){
        store.clear();
        this.setState({
            isLogin:false,
            user:null
        })
        this.props.logout()

    }
    Login(token){
        var token = this.refs.token.value;
        $.ajax({
            url:'https://cnodejs.org/api/v1/accesstoken',
            type:'post',
            data:{accesstoken:token},
            success:(value)=>{
                Object.assign(value,{token});
                store.set('user',value);
                this.setState({
                    isLogin:true,
                    user:value
                });
                this.props.login();
            }
        })
    }
    render(){
        console.log(store.get('user'));
        if(this.state.isLogin){
            return (
                <div className="container">
                    <div className="row">
                        <h1>{this.state.user.loginname}已经登录</h1>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <a href="javascript:;" onClick={this.Logout} className="btn btn-success">退出</a>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div id="tab">
                            <TabComponent user={this.state.user}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="container">
                    <div className="row">
                        <form className="form-horizontal" role="form">
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-sm-1 control-label">Token</label>
                                <div className="col-sm-4">
                                    <input ref="token" type="text" className="form-control" id="inputEmail3" placeholder="Token" defaultValue="df9a0366-22e5-4a3c-8133-4f1b43b75422"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <a href="javascript:;" onClick={this.Login} className="btn btn-default">登录</a>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            )
        }
    }
}

export default Login1;