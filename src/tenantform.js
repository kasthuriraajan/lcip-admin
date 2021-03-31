import React, {Component} from 'react';
import {Card, Button, Row, InputGroup, Col, Form,} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TenantForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            tenantName:"",
            email:"",
            username : "",
            password : ""
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        const tenantInfo ={
            tenantId : this.state.tenantName,
            adminUserName : this.state.username,
            adminEmail : this.state.email,
            adminPassword : this.state.password
        }
        const userInfo ={
            tenantId : "lcip-super",
            userEmail: this.state.email,
            userName : this.state.username,
            password : this.state.password
        }

        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/tenant/add',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
            body: JSON.stringify(tenantInfo)
        })
        .then(res => res.json())
        .then(data =>('Status' in data)?this.sendDetails():console.log(data));
        
        this.register(userInfo);
        this.setState({
            tenantName:"",
            email:"",
            username : "",
            password : ""
        });
        event.preventDefault();
    }

    sendDetails =()=>{
        alert("Tenant is created successfully. Mail generated to the tenant admin");
        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/tenant',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        }
        })
        .then(res => res.json())
        .then(data =>console.log(data));
    }

    register = (userInfo)=>{
        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/user',{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("token"),
            'content-type':'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data =>this.props.setAddedTenantData(data));
    this.props.setCreatedTenant(true);
    }

    cancel = ()=>{
        this.setState({
            tenantName:"",
            email:"",
            username : "",
            password : ""
        });
        this.props.setCreatedTenant(true);
    }

  render(){
    return(
        <Row className="justify-content-md-center">
            <Col lg="6" md="6" sm="6">
            <Card text = "dark" className="text-left" 
            style={{ marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="layer-group" />  Create App</h2></Card.Header> 
            <hr/> 
            <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Tenant Name </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="tenantName" value={this.state.tenantName} placeholder="Tenant Name" 
                        onChange ={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" name="email" value={this.state.email} placeholder="Email" 
                        onChange ={this.handleChange}/>
                    </InputGroup>  
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Username &nbsp; &nbsp;</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="username" value={this.state.username} placeholder="Username" 
                        onChange ={this.handleChange}/>
                    </InputGroup> 
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Password &nbsp; &nbsp;</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" 
                        onChange ={this.handleChange}/>
                    </InputGroup>
                    <Row className="justify-content-md-center">
                        <Button variant="secondary" type='button' onClick={this.cancel} size="lg" style={{ margin:'5px'}}>Cancel</Button>
                        <Button variant="success" type='submit' value="Submit" size="lg" >Create Tenant</Button>     
                    </Row>                 
                </Form>                 
            </Card>
            </Col>
        </Row>
        

        );
    }
}
export default TenantForm;
