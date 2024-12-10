import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from "file-saver"; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReplayIcon from '@mui/icons-material/Replay';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add'; 
import GetAppIcon from '@mui/icons-material/GetApp'; 
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import IshiharaPlate from '../assets/Ishihara_Plate_3.jpg'

const filters: { [key: string]: string[] } = {
  "Anomalous Trichromacy": [
    "Red-Weak/Protanomaly",
    "Green-Weak/Deuteranomaly",
    "Blue-Weak/Tritanomaly",
  ],
  "Dichromatic View": [
    "Red-Blind/Protanopia",
    "Green-Blind/Deuteranopia",
    "Blue-Blind/Tritanopia",
  ],
  "Monochromatic View": [
    "Monochromacy/Achromatopsia",
    "Blue Cone Monochromacy",
  ],
};

const filterInfo: { [key: string]: string } = {
  "Red-Weak/Protanomaly": "Protanomaly is a type of red-green color blindness where red cones do not detect enough red and are too sensitive to greens, yellows, and oranges.",
  "Green-Weak/Deuteranomaly": "Deuteranomaly is a type of red-green color blindness where green cones do not detect enough green and are too sensitive to yellows, oranges, and reds.",
  "Blue-Weak/Tritanomaly": "Tritanomaly is a type of blue-yellow color blindness where blue cones do not detect enough blue and are too sensitive to greens and yellows.",
  "Red-Blind/Protanopia": "Protanopia is a type of red-green color blindness where red cones are absent, leading to difficulties distinguishing between reds and greens.",
  "Green-Blind/Deuteranopia": "Deuteranopia is a type of red-green color blindness where green cones are absent, leading to difficulties distinguishing between greens and reds.",
  "Blue-Blind/Tritanopia": "Tritanopia is a type of blue-yellow color blindness where blue cones are absent, leading to difficulties distinguishing between blues and yellows.",
  "Monochromacy/Achromatopsia": "Achromatopsia is a condition where no color is perceived, only shades of gray.",
  "Blue Cone Monochromacy": "Blue Cone Monochromacy is a condition where only blue cones function, leading to limited color vision.",
};

const simulationMatrices: { [key: string]: number[][][] } = {
  "Normal": [
    [[1.000000, 0.000000, 0.000000], [0.000000, 1.000000, 0.000000], [0.000000, 0.000000, 1.000000]],
  ],
  "Red-Weak/Protanomaly": [
    [[0.816670, 0.183330, 0.000000], [0.333330, 0.666670, 0.000000], [0.000000, 0.125000, 0.875000]],
  ],
  "Green-Weak/Deuteranomaly": [
    [[0.800000, 0.200000, 0.000000], [0.258330, 0.741670, 0.000000], [0.000000, 0.141670, 0.858330]],
  ],
  "Blue-Weak/Tritanomaly": [
    [[0.966670, 0.033330, 0.000000], [0.000000, 0.733330, 0.266670], [0.000000, 0.183330, 0.816670]],
  ],
  "Red-Blind/Protanopia": [
    [[0.566670, 0.433330, 0.000000], [0.558330, 0.441670, 0.000000], [0.000000, 0.241670, 0.758330]],
  ],
  "Green-Blind/Deuteranopia": [
    [[0.625000, 0.375000, 0.000000], [0.700000, 0.300000, 0.000000], [0.000000, 0.300000, 0.700000]],
    ],
  "Blue-Blind/Tritanopia": [
    [[0.950000, 0.050000, 0.000000], [0.000000, 0.433330, 0.566670], [0.000000, 0.475000, 0.525000]],
  ],
  "Monochromacy/Achromatopsia": [
    [[0.299000, 0.587000, 0.114000], [0.299000, 0.587000, 0.114000], [0.299000, 0.587000, 0.114000]],
  ],
  "Blue Cone Monochromacy": [
    [[0.618000, 0.320000, 0.062000], [0.163000, 0.775000, 0.062000], [0.163000, 0.320000, 0.516000]],
  ],
  // Add other matrices as needed
};

/*
const simulationMatrices: { [key: string]: number[][][] } = {
  "Red-Weak/Protanomaly": [
    [[0.856167, 0.182038, -0.038205], [0.029342, 0.955115, 0.015544], [-0.002880, -0.001563, 1.004443]],
    [[0.458064, 0.679578, -0.137642], [0.092785, 0.846313, 0.060902], [-0.007494, -0.016807, 1.024301]],
    [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  ],
  "Green-Weak/Deuteranomaly": [
    [[0.866435, 0.177704, -0.044139], [0.049567, 0.939063, 0.011370], [-0.003453, 0.007233, 0.996220]],
    [[0.547494, 0.607765, -0.155259], [0.181692, 0.781742, 0.036566], [-0.010410, 0.027275, 0.983136]],
    [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  ],
  "Blue-Weak/Tritanomaly": [
    [[0.926670, 0.092514, -0.019184], [0.021191, 0.964503, 0.014306], [0.008437, 0.054813, 0.936750]],
    [[1.017277, 0.027029, -0.044306], [-0.006113, 0.958479, 0.047634], [0.006379, 0.248708, 0.744913]],
    [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
  ],
  // Add other matrices as needed
};
*/

export default function Preview() {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colorblindType, setColorblindType] = useState<keyof typeof filters | "Select">("Select");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isAdjustmentsVisible, setAdjustmentsVisible] = useState(true);
  const [severity, setSeverity] = useState(0); // Default value set to 0
  const [isFilterVisible, setFilterVisible] = useState(true);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string>(IshiharaPlate);
  
  const navigate = useNavigate(); // Initialize the navigate function
  const applyFilter = () => {
    if (colorblindType === "Select" || !selectedFilter || !isFilterVisible) return;
  
    const img = new Image();
    img.src = IshiharaPlate;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const matrix = simulationMatrices[selectedFilter][0];  // Always use the first matrix as severity is handled in a linear fashion

      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
  
        const [newR, newG, newB] = [
          adjustedMatrix[0][0] * r + adjustedMatrix[0][1] * g + adjustedMatrix[0][2] * b,
          adjustedMatrix[1][0] * r + adjustedMatrix[1][1] * g + adjustedMatrix[1][2] * b,
          adjustedMatrix[2][0] * r + adjustedMatrix[2][1] * g + adjustedMatrix[2][2] * b,
        ];
  
        imageData.data[i] = Math.min(Math.max(newR, 0), 255);
        imageData.data[i + 1] = Math.min(Math.max(newG, 0), 255);
        imageData.data[i + 2] = Math.min(Math.max(newB, 0), 255);
      }
  
      ctx.putImageData(imageData, 0, 0);
      const newImageUrl = canvas.toDataURL();
      setFilteredImageUrl(newImageUrl);
      setActualFilteredImageUrl(newImageUrl);
    };
  };
  /*
  const getFilterStyle = () => {
    if (!isFilterVisible || colorblindType === "Select" || !selectedFilter) {
      return {};
    }
    // Apply your filter logic here based on selectedFilter and severity
  };
  */
  const labelStyle = {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "26px",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Left Section: Image */}
      <div
        style={{
          flex: 3,
          marginRight: "20px",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <img
          src={filteredImageUrl}
          alt="Preview"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            objectFit: "cover",
            ...applyFilter(),
          }}
        />
      </div>

      {/* Right Section: Filters and Adjustments */}
      


      
      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        {/* Filter Section */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#F2F2F2",
            borderRadius: "16px",
            marginBottom: "26px",
          }}
        >
          {/* Filter Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontFamily: "Montserrat", fontSize: "12px" }}>
              Filters
            </span>

            <div>
              <button onClick={toggleVisibilityIcon}>
                {isVisibilityOn ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>

            {isFilterVisible ? (
              <VisibilityIcon
                onClick={() => {
                  // Toggle visibility of the filter section
                  setFilterVisible(false); // Hide filter section

                  // Reset the image and filter states
                  setFilteredImageUrl(actualFilteredImageUrl); // Show filtered image
                  setImageVisible(true);
                  setSelectedFilter(prevFilter); // Keep the previous filter
                }}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => {
                  // Toggle visibility of the filter section
                  setFilterVisible(true); // Show filter section

                  // Reset the image to original state when filters are hidden
                  setFilteredImageUrl(originalImageUrl); // Show original image
                  setImageVisible(false);
                  setSelectedFilter(""); // Clear the selected filter
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          {/* Colorblindness Type Dropdown */}
          <label style={labelStyle}>
            Colorblindness Type
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={colorblindType}
              onChange={(e) => {
                setColorblindType(e.target.value as keyof typeof filters | "Select");
                setSelectedFilter(""); // Reset selected filter when type changes
              }}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "16px",
                marginBottom: "16px",
                fontFamily: "Montserrat, sans-serif",
                paddingLeft: "16px",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
            >
              <option value="Select">Select</option>
              <option value="Anomalous Trichromacy">Anomalous Trichromacy</option>
              <option value="Dichromatic View">Dichromatic View</option>
              <option value="Monochromatic View">Monochromatic View</option>
            </select>
            <ExpandMoreIcon style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
          </div>

          {/* Radio Buttons for Filter Options */}
          {filters[colorblindType]?.map((filter: string) => (
            <label
              key={filter}
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <input
                type="radio"
                value={filter}
                checked={selectedFilter === filter}
                onChange={() => {setSelectedFilter(filter); setPrevFilter(filter); setSeverity(100);setPreviousSeverity(100)}}
                style={{ marginRight: "8px" }}
              />
              {filter}
            </label>
          ))}
        </div>

        {/* Adjustment Section */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#F2F2F2",
            borderRadius: "16px",
            marginBottom: "26px",
          }}
        >
          {/* Adjustment Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "12px", fontFamily: "Montserrat, sans-serif" }}>Adjustments</span>
            <button
              onClick={() => setAdjustmentsVisible(!isAdjustmentsVisible)}
              style={{
                width: "20px",
                height: "20px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              {isAdjustmentsVisible ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </button>
          </div>

          {isAdjustmentsVisible && (
            <>
              {/* Severity Slider */}
              <label style={labelStyle}>
                Severity
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={severity}
                  onChange={handleSeverityChange}
                  style={{
                    width: "100%",
                    appearance: "none",
                    height: "8px",
                    borderRadius: "4px",
                  }}
                />
                <span style={{ marginLeft: "10px", fontFamily: "Montserrat, sans-serif" }}>{severity}</span>
              </div>
            </>
          )}
        </div>

        {/* Reset Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              setFilteredImageUrl(originalImageUrl); // Reset the image to original
              setColorblindType("Select"); // Reset the filter selection
              setSelectedFilter(""); // Reset selected filter
              setSeverity(0);
              /*
              setColorblindType("Select");
              setSelectedFilter("");
              setSeverity(0); // Reset severity to 0
              setFilterVisible(true);
              */
            }}
            style={{
              maxWidth: "140px",
              maxHeight: "52px",
              width: "100%",
              height: "100%",
              padding: "16px 20px",
              fontWeight: "600",
              fontSize: "16px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              border: "2px solid #191D21",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <ReplayIcon style={{ marginRight: "8px" }} />
            Reset
          </button>
        </div>

        {/* Additional Container */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#F2F2F2",
            borderRadius: "16px",
            marginTop: "26px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontFamily: "Montserrat", fontSize: "12px" }}>
              About
            </span>
            <InfoIcon
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* About Section Content */}
          {selectedFilter && (
            <>
              <h2 style={{ fontFamily: "Montserrat", fontSize: "24px", fontWeight: "bold" }}>
                {selectedFilter.includes('/') ? selectedFilter.split('/')[1] : selectedFilter}
              </h2>
              <p style={{ fontFamily: "Montserrat", fontSize: "16px" }}>
                {filterInfo[selectedFilter]}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#FFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "8px",
                    }}
                  >
                    <LinkIcon style={{ fontSize: "16px" }} />
                  </div>
                  <span style={{ fontFamily: "Montserrat", fontSize: "16px", marginRight: "8px" }}>
                    National Eye Institute
                  </span>
                </div>
                <a
                  href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness/types-color-vision-deficiency"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Montserrat", fontSize: "16px", color: "#007BFF", textDecoration: "none" }}
                >
                  Read more
                </a>
              </div>
            </>
          )}
        </div>

        {/* New and Export Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <button
          onClick={() => navigate('/')}
            style={{
              maxWidth: "140px",
              maxHeight: "52px",
              width: "100%",
              height: "100%",
              padding: "16px 20px",
              fontWeight: "600",
              fontSize: "16px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              border: "2px solid #191D21",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
              marginRight: "16px", 
            }}
            
          >
            <AddIcon style={{ marginRight: "8px" }} />
            New
          </button>
          <button
            onClick={exportImage}
            style={{
              maxWidth: "140px",
              maxHeight: "52px",
              width: "100%",
              height: "100%",
              padding: "16px 20px",
              fontWeight: "600",
              fontSize: "16px",
              borderRadius: "4px",
              backgroundColor: "#4E6AF0",
              border: "none",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <GetAppIcon style={{ marginRight: "8px" }} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}