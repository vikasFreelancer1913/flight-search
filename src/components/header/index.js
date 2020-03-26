import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menuOpenClass: 'close',
            location: 'flights'
        }

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menuOpenClass: this.state.menuOpenClass === 'close' ? 'open' : 'close' });
    }

    componentDidMount() {
        const path = window.location.pathname.split('/')[1];
        this.setState({
            location: path
        });
    }
 
    render() {
        return (
            <header className="header">
                <button className={"hamburger "+this.state.menuOpenClass} id="js-menu" onClick={e => this.toggleMenu(e)}>
                    <span></span>
                </button>
                <p className="logoWrapper">
                    <img src={require("../../images/flight-logo.png")} alt="logo" />
                </p>
                <div className={"menuWrapper "+this.state.menuOpenClass}>
                    <ul>
                        <li className="flights"><Link to="/" className={"linkTohome " + this.state.location}>Flights</Link></li>
                        <li className="hotels"><Link to="/hotels" className={"linkTohome " + this.state.location}>Hotels</Link></li>
                        <li className="cars"><Link to="/cars" className={"linkTohome " + this.state.location}>Cars</Link></li>
                        <li className="trains"><Link to="/trains" className={"linkTohome " + this.state.location}>Trains</Link></li>
                        <li className="buses"><Link to="/buses" className={"linkTohome " + this.state.location}>Buses</Link></li>
                        
                    </ul>
                    <div className="overLay" onClick={e => this.toggleMenu(e)}></div>
                </div>
            </header>
        );
    }
}

export default Header;
