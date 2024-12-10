import React, { useState } from 'react';
import uploadIcon from '../assets/upload_icon.png';
import closeIcon from '../assets/close_icon.png';

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
    <div style={styles.overlay}>
      <div style={styles.uploadWindow}>
        <div style={styles.header}>
          <img src={closeIcon} alt="Close Icon" style={styles.closeIcon} onClick={onClose} />
        </div>

        <div
          style={{
            ...styles.uploadContent,
            border: isDragging ? '2px solid #4E6AF0' : '0.73px dashed #656F77',
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img src={uploadIcon} alt="Upload Icon" style={styles.uploadIcon} />
        </div>

        <div>
          <p style={styles.uploadText}>Drag or Drop Your Photo Here!</p>
          {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}
        </div>

        <div style={styles.uploadButtonsContainer}>
          <button onClick={() => document.getElementById('fileInput')!.click()} style={styles.chooseFileButton}>
            Choose File
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept={acceptedImageTypes.join(',')} // Restrict file types in the file picker dialog
          />
          <button style={styles.uploadButton}>Upload</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    display: 'flex',
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadWindow: {
    width: '710.06px',
    height: '562.72px',
    background: 'white',
    padding: '27px',
    borderRadius: '26.58px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center',
    position: 'relative' as 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    height: '28px',
    cursor: 'pointer',
  },
  uploadContent: {
    width: '710.06px',
    height: '365.14px',
    borderRadius: '13.29px',
    border: '0.73px dashed #656F77',
    margin: '27px 0',
    background: '#E8EEF3',
    gap: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: '159.75px',
    height: '155.18px',
    marginBottom: '10px',
    textAlign: 'center' as 'center',
  },
  uploadText: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '32.13px',
    color: '#656F77',
    lineHeight: '35px',
    textAlign: 'center' as 'center',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  uploadButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '710.06px',
    gap: '26.58px',
    marginTop: '-3px',
  },
  chooseFileButton: {
    backgroundColor: 'white',
    color: '#191D21',
    border: '1.66px solid #191D21',
    borderRadius: '6.65px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '23.26px',
    lineHeight: '26.58px',
    textAlign: 'center' as 'center',
    width: '340.53px',
  },
  uploadButton: {
    backgroundColor: '#4E6AF0',
    color: 'white',
    border: 'none',
    borderRadius: '6.65px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '23.26px',
    lineHeight: '26.58px',
    textAlign: 'center' as 'center',
    width: '340.53px',
  },
};

export default UploadWindow;