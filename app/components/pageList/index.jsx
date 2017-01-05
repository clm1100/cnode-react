import React ,{ Component }from 'react';
import {IndexRoute,browserHistory, Router, Route, Link } from 'react-router';
class PageList extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var list = [
            {to:"jianjie?page=1",num:1},
            {to:"jianjie?page=2",num:2},
            {to:"jianjie?page=3",num:3},
            {to:"jianjie?page=4",num:4},
            {to:"jianjie?page=5",num:5}
        ];
        var List2 = list.map((ele,index)=>{
            return <ListItem to={ele.to} num={ele.num} key = {index}/>
        })
        return (
            <nav>
                <ul className="pagination">
                    <li className="previous"><a href="javascript:;">&larr; Older</a></li>
                    {List2}
                    <li onClick={this.props.nextPage} className="next"><a href="javascript:;">Newer &rarr;</a></li>
                </ul>
            </nav>
        )
    }
}

class ListItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <li className="pagination pagination-lg">
                <Link to={this.props.to}>{this.props.num} </Link>
            </li>
        )
    }
}



export default PageList;