import React from 'react';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import tabs from '../../data-configs/tabs.json';

class Buses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pathName: ''
        }
    }

    componentDidMount() {
        const path = window.location.pathname.split('/')[1]
        this.setState({ pathName: path });
    }

    render() {
        return (
            <section className="textAlignCenter paddingTop50">
                <Header />
                <Navigation menu={tabs} active={this.state.pathName} />
                <h1>Buses Details</h1>
            </section>
        );
    }
}

export default Buses;
