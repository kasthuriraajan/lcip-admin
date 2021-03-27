import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TenantForm from './tenantform';

class Tenants extends Component{
    constructor(props){
        super(props);
        this.state = {
          isCreateTenant : false,
          isDelete : false,
          selectedTenant : "",
          tenants : []
        }
    }

    launchCreateTenant = ()=>{
        this.setState({
            isCreateTenant : true
        });
    }
    setTenantCreated = (resp) => {
        this.setState({
            isCreateTenant : !resp
        }); 
    }
    handleClose = () => {this.setState({
        isDelete : false,
        selectedTenant : ""
        });
    }
    handleShow = (event) => {
        this.setState({
            isDelete : true ,
            selectedTenant : event.target.value
        });
    }
    handleDelete = () => {     
        alert('Tenant '+ this.state.selectedTenant + '  is Deleted');
        this.setState({
            isDelete : false,
            selectedTenant : ""
        });
    }
    componentDidMount(){
        fetch("http://localhost:9090/tenants")
        .then(res => res.json())
        .then(data=>this.setState({tenants:data}));
    }
  render(){
    var isCreateTenant = this.state.isCreateTenant;
    const tenantInfo = this.state.tenants.map(tenant => (
        <tr key={tenant.tenantID}>
        <td>{tenant.tenantID}</td>
        <td>{tenant.tenantName}</td>
        <td><button className='btn btn-danger' name="deleteTenant" value={tenant.tenantID} onClick={this.handleShow}>Delete</button></td>
        <Modal show={this.state.isDelete} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete tenant:-  {this.state.selectedTenant} ?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
                Cancel
            </Button>
            <Button variant="danger" type="button" onClick={this.handleDelete}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    </tr>
    ));
    var table = (        
        <div>     
                <Card.Text>
                    <Button variant="success" type='button' size="lg" style={{ margin:'5px'}} 
                    onClick={this.launchCreateTenant}>Create Tenant </Button>
                    <hr/> 
                </Card.Text>   
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Tenant ID</th>
                            <th>Tenant Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenantInfo}
                    </tbody>
                </Table>
        </div> );
return(
    <Card text = "dark" className="text-left" 
        style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
        <Card.Header><h2><FontAwesomeIcon icon="university" />  Tenants</h2></Card.Header> 
        <hr/>  
        {isCreateTenant?<TenantForm setCreatedTenant = {this.setTenantCreated}/>:table} 
    </Card>

    );
}
}
export default Tenants;
