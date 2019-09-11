import React from 'react';
import Upload from './Upload/Upload';
import './App.css';


const App = (props) => {
  return(
    <div>
      <Upload preview accept='.ase, .aseprite' name='file' text='Upload a file' />
    </div>
  )
}

export default App;