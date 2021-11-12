import React, { Component } from 'react';
import { Row, Col, Button, FormControl, Form, Container, ListGroup, Modal } from "react-bootstrap";

function UserList(props) {
    const userIconStyle = {
        color: '#000',
        backgroundColor: '#eee',
        borderBottom: '1px solid #000'
    }

    if (props.users.length > 0) {
        var list = props.users.map(function (user) {
            if (props.currentUserId != user.id) {
                return (
                    <ListGroup.Item key={"list_" + user.id} style={userIconStyle} action onClick={() => props.onItemClickHandler(user)}>
                        <UserItem key={"key_" + user.id} user={user} />
                    </ListGroup.Item>
                )
            }
        });
        return (
            <ListGroup>
                {list}
            </ListGroup>
        );
    } else {
        return null;
    }
}

function UserItem(props) {
    if (props.user) {
        return (
            <div className="flex">
                <div>
                    <p className="primary-font">{props.user.name}</p>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

function RenderMessages(props) {

    var key = props.data.currentUserId + "to" + props.data.selectedUser.id;
    var messageSet = props.data.messageSet;

    var messageBoxStyle = {
        paddingTop: '10px'
    }

    var firstStyle = {
        backgroundColor: '#398724',
        color: '#fff',
        float: 'right',
        textAlign: 'right',
        padding: '10px',
        borderRadius: '5px',
    }

    var secondStyle = {
        backgroundColor: '#6B939C',
        float: 'left',
        padding: '10px',
        borderRadius: '5px',
        marginLeft: '10px',
        color: '#fff',
        textAlign: 'left',
    }

    var defaultStyle = {
        textAlign: 'center',
        position: 'absolute',
        bottom: '20px',
        left: '45%'
    }


    if (messageSet.hasOwnProperty(key) && messageSet[key].length > 0) {
        var messageArray = messageSet[key];
        var messages = messageArray.map((message, i) => {
            if (props.data.currentUserId == message.sender) {
                return (
                    <div className="row" key={i} style={{ width: '100%' }}>
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6">
                            <p className="primary-font" style={firstStyle}>{message.text}</p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="row" key={i} style={{ width: '100%' }}>
                        <div className="col-md-6">
                            <p className="primary-font" style={secondStyle}>{message.text}</p>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                )
            }
        })

        return (
            <div className="flex" style={messageBoxStyle}>
                {messages}
            </div>
        );
    } else {
        return <p className="primary-font" style={defaultStyle}>Rather Empty Here</p>;
    }
}

function GetUserTextInterface(props) {
    const inputBoxStyle = {
        width: '100%',
        position: 'absolute',
        height: '8vh',
        bottom: '15px',
        display: 'block',
        borderTop: '1px solid #000',
        backgroundColor: '#eee'
    };

    const userBadgeStyle = {
        width: '100%',
        position: 'absolute',
        color: 'green',
        textAlign: 'center',
        height: '5vh',
        top: '0px',
        display: 'block',
        borderBottom: '1px solid #000'
    };

    const messageStyle = {
        width: '100%',
        position: 'absolute',
        height: '77vh',
        top: '5vh',
        display: 'block',
        scrollX: 'auto',
        overflowY: 'scroll'
    };

    if (props.data.selectedUser) {
        return (
            <>
                <div style={userBadgeStyle}>
                    You are texting with: {props.data.selectedUser.name}
                </div>

                <div style={messageStyle} id="textMessageBox">
                    <RenderMessages
                        data={props.data}
                    />
                </div>

                <div style={inputBoxStyle}>
                    <form onSubmit={props.sendMessage} style={{ marginTop: '20px' }}>
                        <label>
                            <input type="text" value={props.data.messageText} id="messageText" style={{ width: '800px', marginLeft: '30px' }} onChange={props.handleChange} />
                        </label>
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div style={userBadgeStyle}>
                    Please select a user to text with
                </div>
            </>
        )
    }
}

export default class MessangerUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {

        const styleLeft = {
            height: '90vh',
            display: 'block',
            float: 'left',
            borderRight: '1px solid #000',
            overflowY: 'scroll'
        };

        const styleRight = {
            height: '90vh',
            float: 'right',
            display: 'block',
            position: 'relative',
            overflowY: 'scroll'
        };

        return (
            <div>
                <div className="col-md-4" style={styleLeft}>
                    <UserList
                        users={this.props.data.users}
                        currentUserId={this.props.data.currentUserId}
                        onItemClickHandler={this.props.onItemClickHandler}
                    />
                </div>
                <div className="col-md-8" style={styleRight}>
                    <GetUserTextInterface
                        data={this.props.data}
                        handleChange={this.props.handleChange}
                        sendMessage={this.props.sendMessage}
                    />
                </div>
            </div>
        );
    }
}