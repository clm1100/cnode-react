import React ,{Component}from 'react'
import { Link } from 'react-router'
import ReactIScroll from 'react-iscroll'
import iScroll2 from 'iscroll';
import $ from 'jquery';
import iScroll from "iscroll/build/iscroll-probe"
import './example.less'
const options = {
    mouseWheel: true,
    scrollbars: true,
    freeScroll: true,
    momentum: true,
    click:true
}


class Item extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <li className="list-group-item">
                <Link  to={'/jianjie/detail/'+this.props.Id}>
                    {this.props.Title}
                </Link>
            </li>
        )
    }
}

class Loading extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="clmspinner">
                <div className="clmdouble-clmbounce1"></div>
                <div className="clmdouble-clmbounce2"></div>
            </div>
        )
    }
}


class ExampleApp extends Component{
    constructor(props){
        super(props)
    this.state = {
        canVerticallyScroll:"",
        list:null,
        page:1
    }
        this.onScrollEnd = this.onScrollEnd.bind(this);
    };
    onScrollStart(iScrollInstance) {
        console.log("iScroll starts scrolling")
        console.log(iScrollInstance.y);
    };
    onScrollEnd(iScrollInstance){
        console.log(iScrollInstance.y);
        console.log("iScroll end scrolling")
        if(iScrollInstance.maxScrollY - iScrollInstance.y >= 0){

            var url = "https://cnodejs.org/api/v1/topics?tab=share&page="+this.state.page;
            $.get(url,(value)=>{
                var listOfLi = [];
                value.data.forEach(function(ele,index){
                    listOfLi.push(<Item key={ele.id} Id={ele.id} Title={ele.title} />)
                })
                var page = this.state.page+1;
                var newList = this.state.list.concat(listOfLi);
                this.setState({
                    list:newList,
                    page:page
                });
            });


        }
    };
    onScroll(){
        consol.log("onScroll..............")
    }
    _handleScrollRefresh = (iScrollInstance) => {
        console.log(iScrollInstance.maxScrollY);

    }
    componentDidMount(){
        console.log("componentDidMounted")
        var url = "https://cnodejs.org/api/v1/topics?tab=share&page="+this.state.page;
        $.get(url,(value)=>{
            var listOfLi = [];
            console.log(value.data);
            value.data.forEach(function(ele,index){
                listOfLi.push(<Item key={ele.id} Id={ele.id} Title={ele.title} />)
            })
            var page = this.state.page+1;
            this.setState({
                list:listOfLi,
                page:page
            });
        });

    }
    render() {
        return (
            <div id="clmScroll">
                <ReactIScroll iScroll={iScroll}
                              options={this.props.options}
                              onScrollEnd={this.onScrollEnd}
                              onScroll={this.onScroll}
                              onRefresh={this._handleScrollRefresh}
                              onScrollStart={this.onScrollStart}>
                    <ul>
                        {this.state.list}
                        <h1>
                            <Loading />
                        </h1>
                    </ul>
                </ReactIScroll>
            </div>
        )
    }
}

class Home extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <ExampleApp options={options}/>
            </div>
        )
    }
}

export default Home;