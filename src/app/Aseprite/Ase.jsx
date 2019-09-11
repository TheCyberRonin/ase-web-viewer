import React, { useRef, useState, useEffect } from 'react';
import AseReader from './AseReader';
import Palette from './Palette';
import './Ase.css';
import { Z_NO_COMPRESSION } from 'zlib';

const Ase = (props) => {
  const [info, setInfo] = useState({});
  const [frame, setFrame] = useState(null);
  const canvas = useRef(null);
  const inMemCanvas = useRef(null);
  const scaleMultiplier = 1.1;
  let trans = {};
  let scale = 1.0;
  let dragStart, dragged;

  const loadAse = async file => {
    const fr = new FileReader();
    fr.onload = async e => {
      const ase = new AseReader(e.target.result, props.name);
      ase.parse();
      const ctx = canvas.current.getContext("2d");
      ctx.canvas.width = 800;
      ctx.canvas.height = 600;
      trans.x = 400;
      trans.y = 300;
      trackTransforms(ctx);
      setInfo(ase);
      setFrame(0);
    };
    fr.readAsArrayBuffer(file);
  };
  // Effect on load
  useEffect(() => {
   loadAse(props.file);
  }, [props.file]);

  const writeCel = (numCel) => {
    const cel = info.frames[frame].cels[numCel];
    console.log(cel);
    if (cel.linkedFrame === undefined) {
      const ctx = canvas.current.getContext('2d');
      const inMemContext = inMemCanvas.current.getContext('2d');
      inMemContext.clearRect(0, 0, inMemCanvas.width, inMemCanvas.height);
      inMemContext.width = info.width;
      inMemContext.height = info.height;
      let imageData = inMemContext.createImageData(cel.w, cel.h);
      for (let i = 0; i < cel.rawCelData.byteLength; i++) {
        imageData.data[i] = cel.rawCelData[i];
      }
      inMemContext.putImageData(imageData, cel.xpos, cel.ypos);
      ctx.drawImage(inMemCanvas.current, 0, 0);
    }

  }

  useEffect(() => {
    if(info.name !== undefined) {
      clearCanvas();
      clearInMemCanvas();
      handleFrameChange();
    }
  }, [frame])

  const handleFrameChange = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.save();
    clearCanvas();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.current.width,canvas.current.height);
    clearInMemCanvas();
    ctx.restore();
    const celLen = info.frames[frame].cels.length;
    for(let i = 0; i < celLen; i ++) {
      writeCel(i);
    }
  }

  const formatBytes = (bytes, decimals) => {
    if (bytes === 0) {
      return "0 Byte";
    }
    const k = 1024;
    const dm = decimals + 1 || 3;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const clearCanvas = () => {
    const ctx = canvas.current.getContext('2d');
    const p1 = ctx.transformedPoint(0,0);
    const p2 = ctx.transformedPoint(canvas.width,canvas.height);
    ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
  }

  const clearInMemCanvas = () => {
    const inMemContext = inMemCanvas.current.getContext('2d');
    inMemContext.clearRect(0, 0, info.width, info.height);
  }

  const handleClick = (numFrame) => {
    setFrame(numFrame);
  }

  const swapDraw = () => {
    const ctx = canvas.current.getContext('2d');

    //clear in mem canvas, swap the current canvas over to it to hold the data
    ctx.imageSmoothingEnabled = false;
    ctx.scale(scale, scale);
    handleFrameChange();
  }
  // trackTransformed, zoom and dragging event handlers used from https://codepen.io/techslides/pen/zowLd?editors=0010 with modifications
  // Adds ctx.getTransform() - returns an SVGMatrix
  // Adds ctx.transformedPoint(x,y) - returns an SVGPoint
  const trackTransforms = (ctx) => {
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };
  
    var restore = ctx.restore;
    ctx.restore = function(){
      xform = savedTransforms.pop();
      return restore.call(ctx);
        };

    var scale = ctx.scale;
    ctx.scale = function(sx,sy){
      xform = xform.scaleNonUniform(sx,sy);
      return scale.call(ctx,sx,sy);
        };
  
    var rotate = ctx.rotate;
    ctx.rotate = function(radians){
        xform = xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
    };
  
    var translate = ctx.translate;
    ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };
  
    var transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };
  
    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };
  
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
  }

  const zoom = (clicks) => {
    const ctx = canvas.current.getContext('2d');
    const pt = ctx.transformedPoint(trans.x, trans.y);
    ctx.translate(pt.x, pt.y);
    const factor = Math.pow(scaleMultiplier, clicks);
    ctx.scale(factor, factor);
    ctx.translate(-pt.x, -pt.y);
    swapDraw();
  }

  const handleScroll = (e) => {
    console.log(scale);
    console.log('DeltaX: ', e.deltaX, ' DeltaY: ', e.deltaY, ' DeltaZ: ', e.deltaZ);
    const delta = e.deltaY ? e.deltaY/40 : 0;
    if (delta) {
      zoom(delta);
    }
  }

  const handleMouseDown = (e) => {
    const ctx = canvas.current.getContext('2d');
    trans.x = e.offsetX || (e.pageX - canvas.current.offsetLeft);
    trans.y = e.offsetY || (e.pageY - canvas.current.offsetTop);
    dragStart = ctx.transformedPoint(trans.x, trans.y);
    dragged = false;
  }

  const handleMouseMove = (e) => {
    const ctx = canvas.current.getContext('2d');
    if (dragStart !== null) {
      trans.x = e.offsetX || (e.pageX - canvas.current.offsetLeft);
      trans.y = e.offsetY || (e.pageY - canvas.current.offsetTop);
      dragged = true;
      const pt = ctx.transformedPoint(trans.x, trans.y);
      ctx.translate(pt.x-dragStart.x, pt.y-dragStart.y);
      swapDraw();
    }
  }

  const handleMouseUp = (e) => {
    dragStart = null;
    if (!dragged) {
      zoom(e.shiftKey ? -1 : 1);
    }
  }

  let palette;
  if (info.name !== undefined) {
    palette = <Palette colors={info.palette.colors} />
  }

  return (
    <div className="ase-preview-container">
      {info.name !== undefined ? <span className='ase-preview-file-info'>{`${info.name} ${formatBytes(info.fileSize, 2)}`}</span>: ''}
      <canvas ref={inMemCanvas} style={{display: 'none'}}/>
      <div className="ase-preview-image">
        <div className="ase-palette-container">
          {palette}
        </div>
        <div className="ase-preview-image-view">
          <canvas className=""
            ref={canvas}
            onWheel={(e) => {handleScroll(e)}}
            onMouseDown={(e) => {handleMouseDown(e)}}
            onMouseMove={(e) => {handleMouseMove(e)}}
            onMouseUp={(e) => {handleMouseUp(e)}}
            />
        </div>
        
      </div>
      <div className="ase-preview-timeline">
        <div className="ase-preview-frames">
          {info.name !== undefined ? info.frames.map((f, ind) => <div key={`frame_${ind}`} className={`ase-preview-frame ${ind === frame ? 'active' : ''}`} onClick={() => handleClick(ind)}>{`${ind+1}`}</div>) : ''}
        </div>
      </div>
    </div>
  );
}

export default Ase;