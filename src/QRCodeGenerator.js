import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import './App.css';

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="qr-generator-container">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text or URL"
      />
      <div className="qr-settings">
        <label>
          Size:
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            min="64"
            max="512"
          />
        </label>
        <label>
          Foreground Color:
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      </div>
      <div ref={qrRef} className="qr-code">
        {inputValue && (
          <QRCode value={inputValue} size={parseInt(size, 10)} fgColor={fgColor} bgColor={bgColor} />
        )}
      </div>
      {inputValue && (
        <div className="button-group">
          <button onClick={handleDownload} className="download-button">
            Download QR Code
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
