import React, {Component} from 'react';
import {Card, Button, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Content extends Component{
  render(){
    return(
      <Card text = "dark" className="text-left" 
        style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
        <Card.Header><h2><FontAwesomeIcon icon="user" />  Dashboard</h2></Card.Header> 
        <hr/>   
        <Card.Text>
          <Button variant="success" type='button' size="lg" style={{ margin:'5px'}}>Create App</Button>
        <hr/> 
        </Card.Text>     
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {Array.from({ length: 3 }).map((_, index) => (
                <th key={index}>Table heading</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 3 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 3 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              {Array.from({ length: 3 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          </tbody>
        </Table> 
      </Card>

            );
    }
}
export default Content;
