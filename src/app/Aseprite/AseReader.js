import pako from 'pako';
class AseReader {
  constructor(arrayBuffer, name) {
    this._offset = 0;
    this._dv = new DataView(arrayBuffer);
    this.name = name;
    this.frames = [];
    this.layers = [];
    this.tags = [];
    this.fileSize;
    this.numFrames;
    this.width;
    this.height;
    this.colorDepth;
    this.numColors;
    this.pixelRatio;
  }
  readNextByte() {
    const nextByte = this._dv.getUint8(this._offset, true);
    this._offset += 1;
    return nextByte;
  }
  readByte(offset) {
    return this._dv.getUint8(offset, true);
  }
  readNextWord() {
    const word = this._dv.getUint16(this._offset, true);
    this._offset += 2;
    return word;
  }
  readWord(offset) {
    return this._dv.getUint16(offset, true);
  }
  readNextShort() {
    const short = this._dv.getInt16(this._offset, true);
    this._offset += 2;
    return short;
  }
  readShort(offset) {
    return this._dv.getInt16(offset, true);
  }
  readNextDWord() {
    const dWord = this._dv.getUint32(this._offset, true);
    this._offset += 4;
    return dWord;
  }
  readDWord(offset) {
    return this._dv.getUint32(offset, true);
  }
  readNextLong() {
    const long = this._dv.getInt32(this._offset, true);
    this._offset += 4;
    return long;
  }
  readLong(offset) {
    return this._dv.getInt32(offset, true);
  }
  readNextFixed() {
    const fixed = this._dv.getFloat32(this._offset, true);
    this._offset += 4;
    return fixed;
  }
  readFixed(offset) {
    return this._dv.getFloat32(offset, true);
  }
  readNextBytes(numBytes) {
    let strBuff = new ArrayBuffer(numBytes);
    const strdv = new DataView(strBuff);
    for (let i = 0; i < numBytes; i++) {
      strdv.setUint8(i, this.readNextByte());
    }
    return this.Utf8ArrayToStr(new Uint8Array(strBuff));
  }
  readNextRawBytes(numBytes) {
    let buff = new ArrayBuffer(numBytes);
    const strdv = new DataView(buff);
    for (let i = 0; i < numBytes; i++) {
      strdv.setUint8(i, this.readNextByte());
    }
    return new Uint8Array(buff);
  }
  readRawBytes(numBytes, dv, offset) {
    let buff = new ArrayBuffer(numBytes - offset);
    const buffdv = new DataView(buff);
    for (let i = 0; i < numBytes - offset; i++) {
      buffdv.setUint8(i, dv.getUint8(offset + i, true));
    }
    return new Uint8Array(buff);
  }
  readNextString() {
    const numBytes = this.readNextWord();
    return this.readNextBytes(numBytes);
  }
  skipBytes(numBytes) {
    this._offset += numBytes;
  }
  // adopted from:
  //   http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

  /* utf.js - UTF-8 <=> UTF-16 convertion
   *
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   */

  Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          );
          break;
      }
    }
    return out;
  }
  readHeader() {
    this.fileSize = this.readNextDWord();
    this.readNextWord();
    this.numFrames = this.readNextWord();
    this.width = this.readNextWord();
    this.height = this.readNextWord();
    this.colorDepth = this.readNextWord();
    this.skipBytes(18);
    this.numColors = this.readNextWord();
    const pixW = this.readNextByte();
    const pixH = this.readNextByte();
    this.pixelRatio = `${pixW}:${pixH}`;
    this.skipBytes(92);
    return this.numFrames;
  }
  readFrame() {
    const bytesInFrame = this.readNextDWord();
    this.skipBytes(2);
    const oldChunk = this.readNextWord();
    const frameDuration = this.readNextWord();
    this.skipBytes(2);
    const newChunk = this.readNextDWord();
    console.log({
      bytesInFrame,
      oldChunk,
      frameDuration,
      newChunk
    });
    let cels = [];
    for(let i = 0; i < newChunk; i ++) {
      let chunkData = this.readChunk();
      switch(chunkData.type) {
        case 0x0004:
        case 0x2006:
        case 0x0011:
        case 0x2016:
        case 0x2017:
        case 0x2020:
        case 0x2022:
          this.skipBytes(chunkData.chunkSize - 6);
          break;
        case 0x2004:
          console.log('Layer');
          this.readLayerChunk();
          break;
        case 0x2005:
          console.log('Cel')
          let celData = this.readCelChunk(chunkData.chunkSize);
          cels.push(celData);
          break;
        case 0x2007:
          this.readColorProfileChunk();
          break;
        case 0x2018:
          this.readFrameTagsChunk();
          break;
        case 0x2019:
          console.log('Palette');
          this.palette = this.readPaletteChunk();
          break;
      }
    }
    this.frames.push({ bytesInFrame,
      frameDuration,
      numChunks: newChunk,
      cels});
  }
  readColorProfileChunk() {
    const type = this.readNextWord();
    const flag = this.readNextWord();
    const fGamma = this.readNextFixed();
    this.skipBytes(8);
    console.log({
      type,
      flag,
      fGamma
    });
    this.colorProfile = {type,
      flag,
      fGamma};
  }
  readPaletteChunk() {
    const paletteSize = this.readNextDWord();
    const firstColor = this.readNextDWord();
    const secondColor = this.readNextDWord();
    this.skipBytes(8);
    let colors = [];
    for (let i = 0; i < paletteSize; i++) {
      let flag = this.readNextWord();
      let red = this.readNextByte();
      let green = this.readNextByte();
      let blue = this.readNextByte();
      let alpha = this.readNextByte();
      let name;
      if (flag === 1) {
        name = this.readNextString();
      }
      colors.push({
        red,
        green,
        blue,
        alpha,
        name: name !== undefined ? name : 'none'
      });
    }
    console.log({
      paletteSize,
      firstColor,
      secondColor,
      colors
    });
    return { paletteSize,
      firstColor,
      lastColor: secondColor,
      colors };
  }
  readLayerChunk() {
    const flags = this.readNextWord();
    const type = this.readNextWord();
    const layerChildLevel = this.readNextWord();
    this.skipBytes(4);
    const blendMode = this.readNextWord();
    const opacity = this.readNextByte();
    this.skipBytes(3);
    const name = this.readNextString();
    this.layers.push({ flags,
      type,
      layerChildLevel,
      blendMode,
      opacity,
      name});
    console.log({
      flags,
      type,
      layerChildLevel,
      blendMode,
      opacity,
      name
    });
  }
  //size of chunk in bytes for the WHOLE thing
  readCelChunk(chunkSize) {
    const layerIndex = this.readNextWord();
    const x = this.readNextShort();
    const y = this.readNextShort();
    const opacity = this.readNextByte();
    const celType = this.readNextWord();
    this.skipBytes(7);
    console.log(this._offset);
    let w,h, buff, rawCel, linkedFrame, pixelD = {};
    if (celType !== 1) {
      w = this.readNextWord();
      h = this.readNextWord();
      buff = this.readNextRawBytes(chunkSize - 26); //take the first 20 bytes off for the data above and chunk info
      if(celType === 2) {
        rawCel = pako.inflate(buff);
      } else if(celType === 0) {
        rawCel = buff;
      }
    } else {
      linkedFrame = this.readNextWord();
    }

    if (w !== undefined) {
      pixelD.w = w;
      pixelD.h = h;
      pixelD.rawCelData = rawCel;
    } else {
      pixelD.linkedFrame = linkedFrame;
    }

    console.log({
      layerIndex,
      x,
      y,
      opacity,
      celType,
      w,
      h
    });
    return { layerIndex,
      xpos: x,
      ypos: y,
      opacity,
      celType,
      ...pixelD }
  }
  readChunk() {
    const cSize = this.readNextDWord();
    const type = this.readNextWord();;
    console.log({
      cSize,
      type
    });
    return {chunkSize: cSize, type: type};
  }
  readFrameTagsChunk() {
    const loops = [
      'Forward',
      'Reverse',
      'Ping-pong'
    ]
    const numTags = this.readNextWord();
    this.skipBytes(8);
    for(let i = 0; i < numTags; i ++) {
      let tag = {};
      tag.from = this.readNextWord();
      tag.to = this.readNextWord();
      const loopsInd = this.readNextByte();
      tag.animDirection = loops[loopsInd];
      this.skipBytes(8);
      tag.color = this.readNextRawBytes(3).toString('hex');
      this.skipBytes(1);
      tag.name = this.readNextString();
      this.tags.push(tag);
    }
  }
  parse() {
    const numFrames = this.readHeader();
    for(let i = 0; i < numFrames; i ++) {
      this.readFrame();
    }
  }
}

export default AseReader;
