import React, { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReplayIcon from '@mui/icons-material/Replay';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add'; 

// Predefined filters and corresponding descriptions for different colorblindness conditions
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

// Information for each filter, describing the type of colorblindness
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

// Simulation matrices for each type of colorblindness condition
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
};

// Main component for handling the preview of colorblindness simulations
export default function Preview() {
  // State variables to control colorblindness filter settings and image state
  const [colorblindType, setColorblindType] = useState<keyof typeof filters | "Select">("Select");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isAdjustmentsVisible, setAdjustmentsVisible] = useState(true);
  const [severity, setSeverity] = useState(100); 
  const [previousSeverity, setPreviousSeverity] = useState(100); 
  const [isFilterVisible, setFilterVisible] = useState(true); 
  const [actualFilteredImageUrl, setActualFilteredImageUrl] = useState<string>("");
  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [isImageVisible, setImageVisible] = useState(false);
  const [prevFilter, setPrevFilter] = useState("");
  const [isVisibilityOn, setVisibilityOn] = useState(true);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string>("");
  const [compressedImageUrl, setCompressedImageUrl] = useState<string>("");


  // Function to handle a new image upload
  const handleNewImageClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = handleFileUpload;
    fileInput.click(); 
  };

  // Function to handle the file input event when an image is uploaded
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const uploadedImage = reader.result.toString();
          setOriginalImageUrl(uploadedImage);
          setFilteredImageUrl(uploadedImage);
          setActualFilteredImageUrl(uploadedImage);
          setColorblindType("Select"); 
          setSelectedFilter("");
          setSeverity(100); 
        }
      };
      reader.readAsDataURL(file); 
    }
  };

  // Function to apply the selected colorblindness filter on the image
  const applyFilter = () => {
    if (colorblindType === "Select" || !selectedFilter || !isFilterVisible) return;
  
    const img = new Image();
    img.src = originalImageUrl; 
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width; 
      canvas.height = img.height; 
      ctx.drawImage(img, 0, 0); 
  
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const matrix = simulationMatrices[selectedFilter]
        ? simulationMatrices[selectedFilter][0]
        : simulationMatrices["Normal"][0]; 

      // Adjust the matrix based on the severity of the colorblindness
      const normalMatrix = simulationMatrices["Normal"][0];
      const adjustedMatrix = matrix.map((row, i) =>
        row.map((value, j) => normalMatrix[i][j] + (value - normalMatrix[i][j]) * (severity / 100))
      );
  
      // Process each pixel in the image data using the adjusted matrix
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i]; 
        const g = imageData.data[i + 1]; 
        const b = imageData.data[i + 2]; 
        
        // Apply the adjusted matrix to each color channel (RGB)
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
      const newCompressedImageUrl = canvas.toDataURL("image/jpeg", 0.1);
      setCompressedImageUrl(newCompressedImageUrl); 
      setFilteredImageUrl(newCompressedImageUrl); 
      setActualFilteredImageUrl(newCompressedImageUrl);
    };
  };
  const resetImage = () => {
    setFilteredImageUrl(originalImageUrl); 
    setActualFilteredImageUrl(originalImageUrl); 
    setColorblindType("Select");
    setSelectedFilter("");
    setSeverity(100);
    setPreviousSeverity(100);
    setVisibilityOn(true);
  };

  // Function to toggle the visibility of the image and reset the severity value
  const toggleVisibilityIcon = () => {
    // Check if the severity is set to 0 (indicating no filter applied)
    if (severity === 0) {
      // If severity is 0, restore the previous severity and set visibility to true
      setSeverity(previousSeverity);
      setVisibilityOn(true);
    } else {
      // If severity is not 0, save the current severity to restore later,
      // set severity to 0 (to hide the effect), and set visibility to false
      setPreviousSeverity(severity);
      setSeverity(0);
      setVisibilityOn(false);
    }
  };

  // Function to handle the change in severity level from the input slider
  const handleSeverityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to a number and set it as the new severity level
    const newSeverity = Number(e.target.value);
    setSeverity(newSeverity);
  };

  // Function to reset the visibility icon and restore the previous severity value
  const resetVisibilityIcon = () => {
    // Set visibility back to true and restore the previous severity level
    setVisibilityOn(true);
    setSeverity(previousSeverity);
  };

  // Function to handle the change in the selected filter from the dropdown menu
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the selected filter value
    const newFilter = e.target.value;
    
    // Set the selected filter and save the previous filter for potential future use
    setSelectedFilter(newFilter);
    setPrevFilter(newFilter);

    // Set visibility to true and reset severity to 100 when a new filter is selected
    setVisibilityOn(true);
    setSeverity(100); // Reset severity to maximum when changing filters
  };

  // Function to toggle the visibility of the filter options
  const toggleFilterVisibility = () => {
    // Toggle the visibility state of the filter options
    setFilterVisible((prev) => !prev);
  };

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
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        fontFamily: "Montserrat, sans-serif",
        overflow: "hidden", 
      }}
    >

      {/* Preview Image */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        padding: "20px", 
        width: "60%",  
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {actualFilteredImageUrl || filteredImageUrl ? (
          <img
            src={isImageVisible ? actualFilteredImageUrl : filteredImageUrl}
            style={{
              width: "100%",
              height: "738px",
              borderRadius: "16px",
              objectFit: "cover",
              marginRight: "-1px",
              marginTop: "-15px",
              ...applyFilter(),
            }}
          />
        ) : (
          <div
            style={{
              width: "60%", 
              height: "60%", 
              backgroundColor: "#FFFFFF", 
              borderRadius: "16px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          ></div>
        )}
      </div>

      {/* Filters and Adjustments */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div
          style={{
        width: "91%", 
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
              <button
          onClick={toggleVisibilityIcon}
          style={{
            background: "none",
            border: "none",
            padding: "8px",
            cursor: "pointer",
          }}
              >
          {isVisibilityOn ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
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
                setSelectedFilter(""); 
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

          {/* Filter Options */}
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
            width: "91%", 
            padding: "20px",
            backgroundColor: "#F2F2F2",
            borderRadius: "16px",
            marginBottom: "26px",
            alignSelf: "flex-end", 
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
            onClick={resetImage}
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

        {/* About Container */}
        <div
          style={{
            width: "91%", 
            padding: "20px",
            backgroundColor: "#F2F2F2",
            borderRadius: "16px",
            marginTop: "26px",
            alignSelf: "flex-end", 
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
              </div>
            </>
          )}
        </div>

        {/* New and Export Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <button
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
            onClick={handleNewImageClick}
          >
            <AddIcon style={{ marginRight: "8px" }} />
            New
          </button>
        </div>
      </div>
    </div>
  );
}
