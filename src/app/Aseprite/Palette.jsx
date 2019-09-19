import React, { useState, useEffect } from 'react';
import './Palette.css';

const Palette = (props) => {
  const [color, setColor] = useState(0);
  const pickColor = (ind) => {
    setColor(ind);
  };
  useEffect(() => {
    props.selectColor({...props.colors[color], hex: activeToHex()});
  }, [color]);
  const palette = props.colors.map((c, ind) => {
      return (<div key={`color_${ind}`}
        className={`ase-palette-color ${ind === color ? 'active-color' : ''}`}
        style={{background: `rgba(${c.red}, ${c.green}, ${c.blue}, ${c.alpha})`}}
        onClick={() => pickColor(ind)}
        onMouseOver={() => {props.hoverColor({...props.colors[ind], hex: activeToHex(ind)})}}
        onMouseLeave={() => {props.hoverColor({})}}>
      </div>)
    });
  const activeToHex = (ind = color) =>{
    const activeColor = props.colors[ind];
    return `${activeColor.red.toString(16)}${activeColor.green.toString(16)}${activeColor.blue.toString(16)}`;
  }
  return (
    <div className="ase-palette">
      {palette}
    </div>
    )
}

export default Palette;