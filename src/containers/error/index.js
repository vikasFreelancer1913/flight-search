import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="errorPage">
            <div className="innerErrorPage">
                <div className="space">
                    <div className="text">
                        <div className="align-middle">
                            <h1>404</h1>
                            <p>It looks like you are lost..</p>
                        </div>
                    </div>
                    <div className="orbit-1"></div>
                    <div className="moon-1 sm"></div>
                    <div className="orbit-2"></div>
                    <div className="moon-2 sm"></div>
                    <div className="orbit-3"></div>
                    <div className="moon-3"></div>
                </div>
            </div>
            <Link to="/" className="linkTohome">Lets go back to Home</Link>
       </div>
    );
}
 
export default Error;