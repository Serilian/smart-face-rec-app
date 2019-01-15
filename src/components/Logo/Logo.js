import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import image from './icons8-brain-512.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{max: 45}} style={{height: 150, width: 150}}>
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '3px'}} src={image} alt="brain-icon"/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;