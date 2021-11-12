import React, { Component } from 'react';
import { Button } from "react-bootstrap";

function UserListAsOptions(props) {
    var options = props.users.map((user) => {
        return <option key={user.id} value={user.id}>{"Id: " + user.id + ", Name: " + user.name}</option>
    });
    return options;
}

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const style = {
            width: '100%',
            height: '60px',
            borderBottom: '1px solid #000',
            paddingTop: '13px'
        }

        const btnStyle = {
            color: '#000'
        }

        return (
            <div className="row" style={style}>
                <div className="col-md-3">
                    <Button variant="primary" onClick={this.props.handleShow}>Create User</Button>
                </div>

                <div className="col-md-2">
                    <b>Using Service As:</b>
                </div>

                <div className="col-md-4">
                    <div className="form-row">
                        <div className="form-group col-md-8">
                            <select className="form-control" name="currentUserId" id="currentUserId" onChange={this.props.handleSelectChange}>
                                <UserListAsOptions
                                    users={this.props.data.users}
                                />
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}