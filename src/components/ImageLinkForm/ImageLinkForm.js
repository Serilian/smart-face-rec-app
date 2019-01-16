import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, buttonSubmit}) => {
    return (
        <div>
            <p className="f3 center">
                {'This magic app will detect faces in your pictures. Git it a try now!'}
            </p>

            <div className="pa4 br3 shadow-5 form center">
                <div className="center">
                    <input onChange={onInputChange} className="f4 pa2 w-70 center" type="text"/>
                    <button onClick={buttonSubmit} className="w-30 grow link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>

        </div>
    );
};

export default ImageLinkForm;