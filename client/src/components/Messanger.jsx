import React, { Component } from 'react';
import MessangerUI from './MessangerUI.jsx';
import Header from './Header.jsx';
import Timer from './Timer.jsx';
import { Row, Col, Button, FormControl, Form, Container, ListGroup, Modal } from "react-bootstrap";
import { io } from 'socket.io-client'

function UserCreationModal(props) {
  return (
    <>
      <Modal show={props.data.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User (Time: {<Timer />})</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="typedName">
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
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.addUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default class Messanger extends Component {
  constructor(props) {
    super(props);

    var users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    var messageSet = localStorage.getItem("messageSet") ? JSON.parse(localStorage.getItem("messageSet")) : {};

    if (users.length == 0) {
      var user = { id: 0, name: "Default User", createdAt: (new Date()).getTime() };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }

    this.state = {
      currentUser: users[0],
      currentUserId: 0,
      users: users,
      selectedUser: null,
      show: false,
      typedName: '',
      messageText: '',
      messageSet: messageSet
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.setConnection = this.setConnection.bind(this);
  }

  componentDidMount() {
    this.setConnection();
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleSelectChange(event) {
    var currentUser = this.state.users[event.target.value];
    var selectedUser = this.state.selectedUser;

    if (selectedUser != null && event.target.value == selectedUser.id) {
      this.setState({
        [event.target.id]: event.target.value,
        currentUser: currentUser,
        selectedUser: null
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value,
        currentUser: currentUser
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  onItemClickHandler(user) {
    this.setState({ selectedUser: user });
  }

  addUser() {
    var name = this.state.typedName;

    if (name == "")
      return;

    var users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    var size = users ? users.length : 0;

    var user = {
      id: size,
      name: name,
      createdAt: (new Date()).getTime()
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    this.setState({
      typedName: '',
      users: users,
      show: false
    });
  }

  setConnection() {
    const socket = io('http://localhost:3001/');

    this.setState({
      socket: socket
    })

    socket.on('receive-message', (key1, messageObject) => {

      console.log(key1);
      console.log(messageObject);

      var messageSet = this.state.messageSet;

      if (messageSet.hasOwnProperty(key1)) {
        messageSet[key1].push(messageObject);
      } else {
        var messageArray = [];
        messageArray.push(messageObject);
        messageSet[key1] = messageArray;
      }

      this.setState({
        messageSet: messageSet,
      }, localStorage.setItem("messageSet", JSON.stringify(messageSet)));

      if(this.state.selectedUser != null){
        this.fixScroll();
      }
    })
  }

  fixScroll() {
    var elem = document.getElementById("textMessageBox");
      elem.scrollTop = elem.scrollHeight * 1000;
  }

  sendMessage(event) {
    event.preventDefault();
    var currentUser = this.state.currentUser;
    var selectedUser = this.state.selectedUser;
    var messageText = this.state.messageText;
    messageText = messageText.trim();
    if (currentUser == null || selectedUser == null || messageText == "")
      return;

    var socket = this.state.socket;
    var messageSet = this.state.messageSet;
    var currentUserId = this.state.currentUserId;
    var selectedUserId = selectedUser.id;

    var key = currentUserId + "to" + selectedUserId;
    var key1 = selectedUserId + "to" + currentUserId;

    var messageObject = { text: messageText, sender: currentUserId, timeStamp: (new Date()).getTime() };

    if (messageSet.hasOwnProperty(key)) {
      messageSet[key].push(messageObject);
    } else {
      var messageArray = [];
      messageArray.push(messageObject);
      messageSet[key] = messageArray;
    }

    socket.emit('send-message', key1, messageObject);

    this.setState({
      messageSet: messageSet,
      messageText: ''
    }, localStorage.setItem("messageSet", JSON.stringify(messageSet)));

    this.fixScroll();
  }

  render() {
    return (
      <div>
        <Header
          data={this.state}
          handleShow={this.handleShow}
          handleSelectChange={this.handleSelectChange}
        />

        <UserCreationModal
          data={this.state}
          handleClose={this.handleClose}
          handleChange={this.handleChange}
          handleShow={this.handleShow}
          addUser={this.addUser}
        />

        <MessangerUI
          data={this.state}
          handleClose={this.handleClose}
          handleChange={this.handleChange}
          handleShow={this.handleShow}
          addUser={this.addUser}
          onItemClickHandler={this.onItemClickHandler}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}