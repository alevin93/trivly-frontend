import React, { Component } from 'react'

class Timer extends Component {

    render () {

        return (
            <p className="main-header-text">{this.props.timer}</p>
        )
    }

}

export default Timer