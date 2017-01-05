


import React ,{Component} from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Loading from '../loding';


class yewu extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            error: null,
            data: null
        }
        this.aa = "";

    }
    componentDidMount() {
        //qingqiu = $.get('https://api.github.com/search/repositories?q=javascript&sort=stars').then(
        //    value => this.setState({loading: false, data: value}),
        //    error => this.setState({loading: false, error: error}));


        var that = this;
        this.aa = $.ajax({
            url:'https://api.github.com/search/repositories?q=javascript&sort=stars',
            data:'',
            success:function(value){
                that.setState({loading: false, data: value})
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
            var repos = this.state.data.items;
            var repoList = repos.map(function (repo, index) {
                return (
                    <li key={index}><a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}</li>
                );
            });
            return (
                <div>
                    <h1>Most Popular JavaScript Projects in Github</h1>
                    <ol>{repoList}</ol>
                </div>
            );
        }
    }
}


export default yewu;
