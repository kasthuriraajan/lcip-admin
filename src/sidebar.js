import React, {Component} from 'react';
import {Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Sidebar extends Component{

  loadUser=()=>{
    this.props.loadContent("USERS");
  }

  loadApps=()=>{
    this.props.loadContent("APPS");
  }
  loadTenants=()=>{
    this.props.loadContent("TENANTS");
  }

render(){
        return(
          <div>
             <Button variant="secondary" type='button' onClick={this.loadTenants} 
            style={{ alignItems:'center', marginTop:'5px', marginLeft:'5px'}} className="secondaryNav">
              <FontAwesomeIcon icon="university" size="6x"/>
              <h4>Tenants</h4>
            </Button>

            <Button variant="secondary" type='button' onClick={this.loadApps}
            style={{  alignItems:'center', marginTop:'5px', marginLeft:'5px'}} className="secondaryNav">
              <FontAwesomeIcon icon="layer-group" size="6x"/>
              <h4>Apps</h4>
            </Button>
            
            <Button variant="secondary" type='button' onClick={this.loadUser}
            style={{ alignItems:'center', marginTop:'5px', marginLeft:'5px'}} className="secondaryNav">
              <FontAwesomeIcon icon="users" size="6x"/>
              <h4>Users</h4>
            </Button>

           
          </div>
            
        );
    }
}
export default Sidebar;
