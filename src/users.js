import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
          isDelete : false,
          selectedUser : "",
          users : []
        }
      }
    
    handleClose = () => {this.setState({
        isDelete : false,
        selectedUser : ""
        });
    }
    handleShow = (event) => {
        this.setState({
            isDelete : true ,
            selectedUser : event.target.value
        });
    }
    handleDelete = () => {     
        alert('User  '+ this.state.selectedUser + '  is Deleted');
        this.setState({
            isDelete : false,
            selectedUser : ""
        });
    }
    componentDidMount(){
        fetch("http://localhost:9090/users")
        .then(res => res.json())
        .then(data=>this.setState({users:data}));
    }

  render(){
      const userInfo = this.state.users.map(user => (
            <tr key={user.userName}>
            <td>{user.userName}</td>
            <td>{user.userEmail}</td>
            <td>{user.tenantId}</td>
            <td><button className='btn btn-danger' name="deleteUser" value={user.userName} onClick={this.handleShow}>Delete</button></td>
            <Modal show={this.state.isDelete} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete user:-  {this.state.selectedUser} ?</Modal.Body>
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
                    <th>Username</th>
                    <th>Email</th>
                    <th>Tenent ID</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {userInfo}
            </tbody>
            </Table> 
          </div>
      );
    return(
        <Card text = "dark" className="text-left" 
            style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="users" />  Users</h2></Card.Header> 
            <hr/>
            {table}
        </Card>
        
        );
    }
}
export default Users;
