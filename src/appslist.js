import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Apps extends Component{
    constructor(props){
        super(props);
        this.state = {
          isDelete : false,
          selectedApp : "",
          apps : []
        }
    }

    handleClose = () => {this.setState({
        isDelete : false,
        selectedApp : ""
        });
    }
    handleShow = (event) => {
        this.setState({
            isDelete : true ,
            selectedApp : event.target.value
        });
    }
    handleDelete = () => {     
        alert('User  '+ this.state.selectedApp + '  is Deleted');
        this.setState({
            isDelete : false,
            selectedApp : ""
        });
    }
    componentDidMount(){
        fetch("http://localhost:9090/apps")
        .then(res => res.json())
        .then(data=>this.setState({apps:data}));
    }
    render(){
        const appInfo = this.state.apps.map(app => (
            <tr key={app.clientID}>
            <td>{app.clientID}</td>
            <td>{app.applicationName}</td>
            <td>{app.callbackURL}</td>
            <td>{app.tenantName}</td>
            <td><button className='btn btn-danger' name="deleteApp" value={app.clientID} onClick={this.handleShow}>Delete</button></td>
            <Modal show={this.state.isDelete} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete application:-  {this.state.selectedApp} ?</Modal.Body>
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
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>App ID</th>
                                <th>Application Name</th>
                                <th>Callback URL</th>
                                <th>Tenant ID</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appInfo}
                        </tbody>
                    </Table>
                </div>
            );
    return(
        <Card text = "dark" className="text-left" 
            style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="layer-group" />  Apps</h2></Card.Header> 
            <hr/>  
            {table} 
        </Card>

        );
    }
}
export default Apps;
