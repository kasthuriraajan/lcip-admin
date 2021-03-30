import React, { Component } from 'react';
import Dashboard from './dashboard';
import Login from './login';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedin : false
    }
  }
  login =(resp)=>{
    localStorage.setItem("isLoggedin", resp);
    this.setState({isLoggedin:resp});
  }
  render(){
    var form = (<Login loginState={this.login}/>);
    return (
      ((localStorage.getItem("isLoggedin")==='true')?<Dashboard loginState={this.login}/>:form)
            );
  }
}

export default App;
