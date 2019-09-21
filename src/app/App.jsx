import React from 'react';
import Upload from './Upload/Upload';
import View from './GitHub/View';
import './App.css';


const App = (props) => {
  return(
    <div>
      <Upload preview accept='.ase, .aseprite' name='file' text='Upload a file' />
      <View link='https://github.com/TheCyberRonin/ase-web-viewer'/>
    </div>
  )
}

export default App;