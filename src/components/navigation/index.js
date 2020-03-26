import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        const {menu, active} = this.props;
        return (
            <section className="navigationWrap">
                <ul>
                    {
                        menu.tabs && menu.tabs.length && 
                        menu.tabs.map((item) => {
                            return (
                                <li key={item.id}>
                                    <Link to={item.url} className={active === item.label ? 'active' : ''}>{item.label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        );
    }
}

export default Navigation;
