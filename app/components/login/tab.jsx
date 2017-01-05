import React ,{Component} from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import './css.less'

class TabsControl extends Component{

    constructor(){
        super();
        this.state={
            currentIndex : 0
        };
    }

    check_tittle_index(index){
        return index===this.state.currentIndex ? "Tab_tittle active" : "Tab_tittle";
    }

    check_item_index(index){
        return index===this.state.currentIndex ? "Tab_item show" : "Tab_item";
    }

    render(){
        let _this=this;
        return(
            <div>
                {/*动态生成Tab导航*/}
                <div className="Tab_tittle_wrap">
                    { React.Children.map( this.props.children , (element,index) => {
                        return(
                            /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                        <div onClick={ () => { this.setState({currentIndex : index}) } } className={ this.check_tittle_index(index) }>{ element.props.name }</div>
                            );
                        }) }
                </div>
                {/*Tab内容区域*/}
                <div className="Tab_item_wrap">
                    {React.Children.map(this.props.children,(element,index)=>{
                        return(
                        <div className={ this.check_item_index(index) }>{ element }</div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

class Item extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <li className="list-group-item">
                <Link>
                    {this.props.Title}
                </Link>
            </li>
        )
    }
}

class TabComponent extends Component{
    componentDidMount(){
        var url = "https://cnodejs.org/api/v1/messages";
        $.get(url,{accesstoken:"df9a0366-22e5-4a3c-8133-4f1b43b75422"},function(value){
            console.log(value);
        })
    }

    render(){
        return(
            <div className="clmcontainer">
                <TabsControl user={this.props.user}>
                    <div name="first">
                        我是第一帧
                    </div>
                    <div name="second">
                        我是第二帧
                    </div>
                </TabsControl>
            </div>
        );
    }
}

export default TabComponent;