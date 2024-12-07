import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReplayIcon from '@mui/icons-material/Replay';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Preview() {
  const [colorblindType, setColorblindType] = useState<keyof typeof filters | "Select">("Select");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isAdjustmentsVisible, setAdjustmentsVisible] = useState(true);
  const [severity, setSeverity] = useState(0); // Default value set to 0
  const [isFilterVisible, setFilterVisible] = useState(true);

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

  const getFilterStyle = () => {
    if (!isFilterVisible || colorblindType === "Select" || !selectedFilter) {
      return {};
    }
    // Apply your filter logic here based on selectedFilter and severity
    // This is just a placeholder example
    return {
      filter: `grayscale(${severity}%)`,
    };
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
          src="placeholder-image-path.jpg"
          alt="Preview"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            objectFit: "cover",
            ...getFilterStyle(),
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
            {isFilterVisible ? (
              <VisibilityIcon
                onClick={() => setFilterVisible(!isFilterVisible)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => setFilterVisible(!isFilterVisible)}
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
                setColorblindType(e.target.value);
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
                paddingLeft: "16px", // Added padding inside the dropdown bar
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
                onChange={() => setSelectedFilter(filter)}
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
                  onChange={(e) => setSeverity(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    appearance: "none",
                    height: "8px",
                    borderRadius: "4px",
                    background: `linear-gradient(to right, blue ${severity}%, #ccc ${severity}%)`,
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
              setColorblindType("Select");
              setSelectedFilter("");
              setSeverity(0); // Reset severity to 0
              setFilterVisible(true);
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
      </div>
    </div>
  );
}
