import React , { Component }from 'react';

class Heheda extends Component{
    constructor(props){
        super(props);
        this.state = {
            a:1
        }
        this.dayin = this.dayin.bind(this);
    }


    dayin(){
        var a = this.state.a;
        a++;
        this.setState({a});
    }
    render(){
        return (
            <div>
                <h1 onClick = { this.dayin }>
                    <span>
                    {this.state.a}
                    </span>
                </h1>
            </div>
        )
    }
}
 export default Heheda;