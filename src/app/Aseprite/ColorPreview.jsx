import React from 'react';
import './ColorPreview.css';

const ColorPreview = (props) => {
  return (
    <div className="ase-palette-active">
      <div className="ase-palette-active-preview" style={{background: `#${props.active.hex}`}}></div>
      <div className="ase-palette-active-hex">{`#${props.active.hex}`}</div>
      <div className="ase-palette-active-alpha">{`Alpha: ${props.active.alpha}`}</div>
    </div>
  )
}

export default ColorPreview;
