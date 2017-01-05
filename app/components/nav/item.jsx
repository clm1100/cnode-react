import React ,{ Component }from 'react';
import { Router, Route, Link } from 'react-router'
import  './css.css'
class Item extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <li>
                <Link activeClassName="active1" onlyActiveOnIndex={true} to={this.props.lianjie}>{ this.props.biaoti }</Link>
            </li>
        )
    }
}

export default Item;