import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {Row, Col, Card, Button,Form,InputGroup } from 'react-bootstrap';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            appId : "A001",
            username : "",
            password : ""
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        alert('Username: ' + this.state.username + 'Password: '+this.state.password);
        const loginInfo = {
            tenantId : this.state.appId,
            userName :this.state.username,
            password : this.state.password 
        }
        this.login(loginInfo);
        event.preventDefault();
    }

    login = (userInfo)=>{
        fetch('http://localhost:9090/echo',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data =>console.log(data));
    this.props.loginState(true);
    }
   
    render(){
        return(
            <Row className="justify-content-md-center login-page">
                <Col lg="4" md="4" sm="4">
                <Card text = "dark" className="text-center" 
                style={{ marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
                <Card.Header>
                    <h1> LCIP - Admin </h1>
                    <p>A Light-weight Cloud Identity provider</p>
                </Card.Header> 
                <Card.Title  style={{ marginTop:'15px'}}><h2>Login</h2></Card.Title>
                <hr/>   
                    <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon='user'/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" name="username" value={this.state.username} placeholder="Username" 
                            onChange ={this.handleChange}/>
                        </InputGroup> 
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon='key'/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="password"name="password" value={this.state.password} placeholder="Password"
                            onChange ={this.handleChange} />
                        </InputGroup>
                        <Button variant="secondary" type='button' size="lg" style={{ margin:'5px'}}>Clear</Button>
                        <Button variant="primary" type="submit" value="Submit" size="lg">Login</Button>                      
                    </Form>
                </Card>
                </Col>
            </Row>
        );
    }
}
export default Login;
