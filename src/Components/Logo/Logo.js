import React from 'react';
import Tilt from 'react-tilt'; 
import face from './face.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt options={{ max : 65 }} style={{ height: 250, width: 150 }} >
                <div className="Tilt-inner"><img style={{paddingTop:'5px', height:'200px',width: '150px'}} src={face} alt="logo"/></div>
            </Tilt>
        </div>
    );
}

export default Logo;