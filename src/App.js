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
    this.setState({isLoggedin:resp});
  }
  render(){
    var isLoggedin = this.state.isLoggedin;
    var form = (<Login loginState={this.login}/>);
    return (
            (isLoggedin?<Dashboard loginState={this.login}/>:form)
            );
  }
}

export default App;
