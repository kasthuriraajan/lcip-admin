import React, {Component} from 'react';
import {Card, Button, Table} from 'react-bootstrap';
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
    afterAdd = (data)=>{
        if('Status' in data){
            alert(data.Status);
            fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/tenant/list",{
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("token")
            }})
        .then(res => res.json())
        .then(data=>this.setState({tenants:data}));
        }
        else{
            console.log(data);
        }
    }
    componentDidMount(){
        fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/tenant/list",{
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("token")
            }})
        .then(res => res.json())
        .then(data=>this.setState({tenants:data}));
    }
  render(){
    var isCreateTenant = this.state.isCreateTenant;
    const tenantInfo = this.state.tenants.map(tenant => (
        <tr key={tenant['Tenant Id']}>
        <td>{tenant['Tenant Id']}</td>
        <td>{tenant['Tenant Admin']}</td>
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
                            <th>Tenant Name</th>
                            <th>Tenant Admin</th>
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
        {isCreateTenant?<TenantForm setAddedTenantData={this.afterAdd} setCreatedTenant = {this.setTenantCreated}/>:table} 
    </Card>

    );
}
}
export default Tenants;
