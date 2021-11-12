import React, { Component } from 'react';
import { Button } from "react-bootstrap";
export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: '',
            mounted: true
        }
        this.setCurrentTime = this.setCurrentTime.bind(this);

    }

    componentDidMount() {
        this.setCurrentTime();
    }

    setCurrentTime() {

        setTimeout(() => {
            var today = new Date(),
                time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            this.setState({
                time: time
            })

        }, 1000);

    }

    componentDidUpdate() {
        this.setCurrentTime();
    }

    // componentWillUnmount() {
    //     //didn't work
    // }


    render() {
        return (
            <span>
                {this.state.time}
            </span>
        );
    }
}