import React, { useState } from 'react';
import './Palette.css';

const Palette = (props) => {
  const [color, setColor] = useState(0);
  const pickColor = (ind) => {
    setColor(ind);
  };

  const palette = props.colors.map((c, ind) => {
      return (<div key={`color_${ind}`}
        className={`ase-palette-color ${ind === color ? 'active-color' : ''}`}
        style={{background: `rgba(${c.red}, ${c.green}, ${c.blue}, ${c.alpha})`}}
        onClick={() => pickColor(ind)}>
          <div className="ase-palette-hover">
            <span className="ase-palette-hover-color" style={{background: `rgba(${c.red}, ${c.green}, ${c.blue}, ${c.alpha})`}}></span>
            <span className="ase-palette-hover-red">
              {`r: ${c.red}`}
            </span>
            <span className="ase-palette-hover-green">
              {`g: ${c.green}`}
            </span>
            <span className="ase-palette-hover-blue">
              {`b: ${c.blue}`}
            </span>
            <span className="ase-palette-hover-alpha">
              {`a: ${c.alpha}`}
            </span>
          </div>
      </div>)
    });
  const activeToHex = () =>{
    const activeColor = props.colors[color];
    return `${activeColor.red.toString(16)}${activeColor.green.toString(16)}${activeColor.blue.toString(16)}`;
  }
  return (
    <div className="ase-palette">
      {palette}
      <div className="ase-palette-active">
        <div className="ase-palette-active-preview" style={{background: `#${activeToHex()}`}}></div>
        <div className="ase-palette-active-hex">{`#${activeToHex()}`}</div>
        <div className="ase-palette-active-alpha">{`Alpha: ${props.colors[color].alpha}`}</div>
      </div>
    </div>
    )
}

export default Palette;