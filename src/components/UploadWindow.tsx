import React, { useState } from 'react';
import uploadIcon from '../assets/upload_icon.png';
import closeIcon from '../assets/close_icon.png';
import './UploadWindow.css';

interface UploadWindowProps {
  onClose: () => void;
  onFileSelect: (file: File) => void; // Add prop for file selection
}

const UploadWindow: React.FC<UploadWindowProps> = ({ onClose, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

  const validateFile = (file: File): boolean => {
    return acceptedImageTypes.includes(file.type);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file); // Pass the file to parent component
        setErrorMessage('');
      } else {
        setErrorMessage('Please upload a valid image file (JPEG, PNG, GIF).');
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file); // Pass the file to parent component
        setErrorMessage('');
      } else {
        setErrorMessage('Please select a valid image file (JPEG, PNG, GIF).');
      }
    }
  };

  return (
    <div className="overlay">
      <div className="uploadWindow">
        <div className="header">
          <img src={closeIcon} alt="Close Icon" className="closeIcon" onClick={onClose} />
        </div>

        <div
          className={`uploadContent ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img src={uploadIcon} alt="Upload Icon" className="uploadIcon" />
        </div>

        <div>
          <p className="uploadText">Drag or Drop Your Photo Here!</p>
          {errorMessage && <p className="errorText">{errorMessage}</p>}
        </div>

        <div className="uploadButtonsContainer">
          <button onClick={() => document.getElementById('fileInput')!.click()} className="chooseFileButton">
            Choose File
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept={acceptedImageTypes.join(',')} // Restrict file types in the file picker dialog
          />
          {/* <button className="uploadButton">Upload</button> */}
        </div>
      </div>
    </div>
  );
};

export default UploadWindow;