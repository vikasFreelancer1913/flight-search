import React from 'react';

class CountToggle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }

        this.subtract = this.subtract.bind(this);
        this.add = this.add.bind(this);
    }

    subtract(event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            count: this.state.count > 0 ? this.state.count - 1 : 0
        }, () => {
            this.props.changeCounter(this.state.count);
        });
    }

    add(event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            count: this.state.count + 1
        }, () => {
            this.props.changeCounter(this.state.count);
        });
    }

    render() {
        return (
            <div className="countToggleWrap">
                <button onClick={this.subtract} className="minus"></button>
                <span>{this.state.count}</span>
                <button onClick={this.add} className="plus"></button>
            </div>
        );
    }
}

export default CountToggle;
