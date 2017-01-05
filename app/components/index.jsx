import React ,{ Component }from 'react';
import Nav from './nav';
import Foot from './foot';
import store from 'store';
//var store = require('store');

class zuhe extends Component{
    constructor(props){
        super(props);
        this.state ={
            isLogin:false,
            user:null
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentWillMount(){
        if(store.get('user')){
            console.log("登录");
            this.setState({
                isLogin:true,
                user:store.get('user')
            })
        }else{
            console.log("没登录")
        }
    }

    login(){
        console.log("登录");
        this.setState({
            isLogin:true,
            user:store.get('user')
        })
    }

    logout(){
        console.log("退出");
        store.clear();
        this.setState({
            isLogin:false,
            user:null
        })

    }


    render(){
        return (
            <div>
                <Nav isLogin = {this.state.isLogin} />
                {this.props.children && React.cloneElement(this.props.children, {
                    isLogin:this.state.isLogin,
                    login: this.login,
                    logout:this.logout
                    })}
                <Foot />
            </div>
        )
    }
}
export default zuhe;