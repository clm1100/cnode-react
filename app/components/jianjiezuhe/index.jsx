import React ,{Component} from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import store from 'store';
import moment from 'moment';
moment.locale("zh-cn");
import Loading from '../loding';
import {IndexRoute,browserHistory, Router, Route, Link } from 'react-router';

class Jianjiezuhe extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log("文章ID:",this.props.params.id)
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}


class PlList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-1">
                    <img width="30" className="img-circle" src= {this.props.author.avatar_url} alt=""/>
                </div>
                <div className="col-md-1">
                    {this.props.author.loginname}
                </div>
                <div className="col-md-3">
                    {this.props.create_at}
                </div>
                <div className="col-md-3">
                    {this.props.ups.length}
                </div>

                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body" dangerouslySetInnerHTML= {{__html:this.props.content}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: null,
            data: null,
            isLogin: false,
            content: null,
            replay: null
        }
        this.aa ="";
        this.contenthandleChange=this.contenthandleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    contenthandleChange(event){
        this.setState({content: event.target.value});
    }
    handleSubmit(event) {
        var that = this;
        event.preventDefault();
        var obj = {
            accesstoken:this.state.user.token,
            content:this.state.content
        }
        var topic_id = this.props.params.id;
        var url = "https://cnodejs.org/api/v1/topic/"+topic_id+"/replies";
        $.post(url,obj,function(data){
            $.ajax({
                url:'https://cnodejs.org/api/v1/topic/'+topic_id,
                success:(value)=>{
                    that.setState({replay: value.data.replies})
                }
            })
        })

    }




    componentWillMount(){
        console.log(this.props.params.id)
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
    componentDidMount(){
        var that = this;
        this.aa = $.ajax({
            url:'https://cnodejs.org/api/v1/topic/'+this.props.params.id,
            success:function(value){
                that.setState({loading: false, data: value,replay: value.data.replies})
            }
        })
    }
    componentWillUnmount(){
        this.aa.abort();
    }
    render(){
        if (this.state.loading) {
            return <Loading/>;
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
            let  hulist = this.state.replay.map(function(ele, index){
                return <PlList key={index} author = {ele.author} create_at = { moment(ele.create_at).fromNow() } content = {ele.content} ups = {ele.ups} />
            });
            if(this.state.isLogin){
                return (
                    <div id="clmContent" className="container">
                        <div className="row">
                            <div className=" col-md-2">
                                <div className="thumbnail">
                                    <img width="50" src={this.state.data.data.author.avatar_url} alt="..." />
                                    <div className="caption">
                                        <p>{this.state.data.data.author.loginname}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <h3>{this.state.data.data.title}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div dangerouslySetInnerHTML= {{__html:this.state.data.data.content}} />
                        </div>
                        <div className="container">
                            { hulist }
                        </div>
                        <div className="container">
                            <div className="row">
                                <textarea ref="content" className="form-control" rows="12" onChange={this.contenthandleChange} defaultValue={this.state.content}></textarea>
                            </div>
                            <a href="javascript:;" className="btn  btn-success" onClick={this.handleSubmit}>提交</a>
                        </div>
                    </div>
                );
            }else{
                return (

                    <div id="clmContent" className="container">
                        <div className="row">
                            <div className=" col-md-2">
                                <div className="thumbnail">
                                    <img width="50" src={this.state.data.data.author.avatar_url} alt="..." />
                                    <div className="caption">
                                        <p>{this.state.data.data.author.loginname}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <h3>{this.state.data.data.title}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div dangerouslySetInnerHTML= {{__html:this.state.data.data.content}} />
                        </div>
                        <div className="">
                            { hulist }
                        </div>
                    </div>
                );
            }
        }
    }
}

export {Content,Jianjiezuhe}  ;