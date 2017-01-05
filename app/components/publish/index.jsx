/**
 * 发布新标题组件;
 */
import React ,{Component} from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import store from 'store';
import Loading from '../loding';
import {IndexRoute,browserHistory, Router, Route, Link } from 'react-router';

class Publish extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
            titleValue: '',
            contentValue: '',
            user:null
        }
        this.titlehandleChange = this.titlehandleChange.bind(this);
        this.contenthandleChange = this.contenthandleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    titlehandleChange(event) {
        this.setState({titleValue: event.target.value});
    }

    contenthandleChange(event) {
        this.setState({contentValue: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.titleValue+"----"+this.state.contentValue);
        var obj = {
            accesstoken:this.state.user.token,
            title:this.state.titleValue,
            tab:this.refs.tab.value,
            content:this.state.contentValue,
        }
        var url = "https://cnodejs.org/api/v1/topics";
        $.post(url,obj,function(data){
            console.log(data);
            browserHistory.push({ pathname: '/jianjie/detail/'+data.topic_id})
        })

    }

    create(){
        browserHistory.push({ pathname: '/jianjie/detail/58565ca3d71d4638531c88af'})
    }
    render(){
        console.log(this.state.user);
        if(this.state.isLogin){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="input-group">
                                <button onClick ={this.handleSubmit}  className="btn btn-success">创建</button>
                                <button  className="btn secondary">取消</button>
                            </div>
                            <div className="input-group">
                                <select ref="tab" defaultValue="job" name="type">
                                    <option  value="ask">ask</option>
                                    <option  value="share">share</option>
                                    <option value="job">job</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">标题</span>
                                <div>{this.state.titleValue}</div>
                                <input ref="title" type="text" className="form-control" placeholder="Username" defaultValue ={this.state.titleValue} onChange={this.titlehandleChange}/>
                            </div>
                            <div className="edit-area">
                                <textarea ref="content" className="form-control" rows="12" onChange={this.contenthandleChange} defaultValue={this.state.contentValue}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }else{
            return(
                <div>
                    <h1>请先登录</h1>
                </div>
            )
        }
    }

}

export default Publish;