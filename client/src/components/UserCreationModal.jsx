import React, { Component } from 'react';
import { Row, Col,Button,FormControl, Form, Container, ListGroup, Modal } from "react-bootstrap";

export default class UserCreationModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            typedName: ''
        }
    }

    // console.log(props.data);
    render(){        
    return( 
        
        <>
            <Modal
              show={true}
              onHide={props.handleClose}
            >
              <Modal.Header closeButton>
                  <Modal.Title>Add User (Time: {<Timer />})</Modal.Title>
              </Modal.Header>
              
                  <Modal.Body>
                  <div>
                      <form>
                          <Form.Row>
                              <Col>
                                  <Form.Group controlId="itemName">
                                      <Form.Label>User Name</Form.Label>
                                      <Form.Control 
                                          bsPrefix="small-control form-control"
                                          size="sm"
                                          type="text" 
                                          value={props.data.typedName}
                                          onChange={props.handleChange}
                                      />
                                  </Form.Group>
                              </Col>                            
                          </Form.Row>
                      </form>
                  </div>
              </Modal.Body>
              
              <Modal.Footer>
                  <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                  <Button variant="primary" onClick={props.addUser}>Save</Button>
              </Modal.Footer>
          </Modal>
        </>

      )
    }
  }