import React ,{Component} from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Loading from '../loding';
import PageList from '../pageList';
import {IndexRoute,browserHistory, Router, Route, Link } from 'react-router';



class Jianjie extends Component{
    constructor(props){
        super(props)
        this.state = {
            index:1,
            loading: true,
            error: null,
            data: null
        }
        this.aa = "";

    this.nextPage = this.nextPage.bind(this);
    }
    nextPage(){
        var index = this.state.index+=1;
        this.aa= $.ajax({
            url:'https://cnodejs.org/api/v1/topics?tab=job&page='+this.state.index,
            success:(value)=>{
                this.setState({index: index, data: value});
                browserHistory.push({ pathname: '/jianjie', query: {page: this.state.index}});
            }
        })
    }
    componentDidMount() {

        let index = this.props.location.query.page || 1;
        console.log(index);
        var that = this;
        this.aa = $.ajax({
            url:'https://cnodejs.org/api/v1/topics?tab=job&page='+index,
            success:function(value){
                that.setState({loading: false, data: value})
            }
        })
    }
    componentWillUnmount(){
        console.log("222");
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
            var repos = this.state.data.data;
            var repoList = repos.map(function (repo, index) {
                return (

                    <li className="list-group-item" key={index}> <Link to={"/jianjie/detail/"+repo.id}>{repo.title} </Link></li>
                );
            });
            return (
                <div className="container">
                    <div className="row">
                        <div className="page-footer">
                            <h1 className="text-center">招聘信息</h1>
                        </div>
                        <ul className="list-group">{repoList}</ul>
                    </div>
                    <PageList nextPage = {this.nextPage}/>
                </div>
            );
        }
    }
}



export default Jianjie;
