import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
          isDelete : false,
          selectedUser : "",
          selectedTenant : "",
          users : []
        }
      }
    
    handleClose = () => {this.setState({
        isDelete : false,
        selectedUser : "",
        selectedTenant : ""
        });
    }
    handleShow = (event) => {
        var info = event.target.value.split(",");
        this.setState({
            isDelete : true ,
            selectedUser : info[0],
            selectedTenant : info[1]
        });
    }
    // handleDelete = () => {     
    //     alert('User  '+ this.state.selectedUser + '  is Deleted');
    //     this.setState({
    //         isDelete : false,
    //         selectedUser : "",
    //         selectedTenant : ""
    //     });
    // }
    handleDelete = () => {
        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/user/'+this.state.selectedUser
        +'?tenantId='+this.state.selectedTenant,{
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("token")
        }
        })
        .then(res => res.json())
        .then(data => this.afterDelete(data));
    }
    afterDelete = (data)=>{
        if('Status' in data){
            alert(data.Status);
            fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/user/list",{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem("token")
                }})
            .then(res => res.json())
            .then(data=>this.setState({users:data}));
        }
        else{
            console.log(data);
        }
        this.setState({
            isDelete : false,
            selectedUser : "",
            selectedTenant : ""
        });
    }
    componentDidMount(){
        fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/user/list",{
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("token")
            }})
        .then(res => res.json())
        .then(data=>this.setState({users:data}));
    }

  render(){
      const userInfo = this.state.users.map(user => (
            <tr key={user['User Name']}>
            <td>{user['User Name']}</td>
            <td>{user['Email']}</td>
            <td>{user['Tenant Name']}</td>
            <td><button className='btn btn-danger' name="deleteUser" value={[user['User Name'],user['Tenant Name']]} onClick={this.handleShow}>Delete</button></td>
            <Modal show={this.state.isDelete} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete user:-  {this.state.selectedUser} from Tenant {this.state.selectedTenant}?</Modal.Body>
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
