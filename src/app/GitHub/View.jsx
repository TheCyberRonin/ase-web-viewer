import React from 'react';
import Icon from './Icon';
import './View.css';

const View = React.memo((props) => {
  return (
    <a className='github-btn' href={props.link}><Icon h='50' w='50'/></a>
  )
})

export default View;
