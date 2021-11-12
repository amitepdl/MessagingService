import React, { Component } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

export default class ViewAs extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ViewAs: "Original For Buyer"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <Container>
        <form>
          <Row>
            <Col>
              <Form.Group controlId="ViewAs" bsSize="large">
                <Form.Label>Use Current Tab As: </Form.Label>

                <Form.Control
                  as="select" 
                  bsPrefix="small-control form-control"
                  size="sm"
                  value={this.state.ViewAs}
                  onChange={this.handleChange}
                >
                  <option value="Original For Buyer">Buyer</option>
                  <option value="Duplicate For Transporter">Transporter</option>
                  <option value="Triplicate For Supplier">Supplier</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}