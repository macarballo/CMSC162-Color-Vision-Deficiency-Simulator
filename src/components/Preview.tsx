import { useState } from "react";

export default function Preview() {
  const [selectedFilter, setSelectedFilter] = useState("Blue-Weak/Tritanomaly");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px",
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
          }}
        />
      </div>

      {/* Right Section: Filters and Details */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        {/* Filters Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Filters</h3>
          <label style={{ fontSize: "14px", fontWeight: "500" }}>
            Color Blindness Type
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          >
            <option value="Anomalous Trichromacy">Anomalous Trichromacy</option>
            <option value="Red-Weak/Protanomaly">Red-Weak/Protanomaly</option>
            <option value="Green-Weak/Deuteranomaly">
              Green-Weak/Deuteranomaly
            </option>
            <option value="Blue-Weak/Tritanomaly">Blue-Weak/Tritanomaly</option>
          </select>

          {/* Radio Buttons */}
          <div>
            {["Red-Weak/Protanomaly", "Green-Weak/Deuteranomaly", "Blue-Weak/Tritanomaly"].map(
              (filter) => (
                <label
                  key={filter}
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <input
                    type="radio"
                    value={filter}
                    checked={selectedFilter === filter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    style={{ marginRight: "8px" }}
                  />
                  {filter}
                </label>
              )
            )}
          </div>
        </div>

        {/* Adjustments Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Adjustments</h3>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Color Slider
          </label>
          <input
            type="range"
            min="0"
            max="100"
            style={{
              width: "100%",
              appearance: "none",
              height: "8px",
              borderRadius: "4px",
              background: "linear-gradient(to right, red, orange, yellow, green, blue, violet)",
            }}
          />
        </div>

        {/* Details Section */}
        <div>
          <h4 style={{ fontSize: "16px", fontWeight: "600" }}>Deuteranopia</h4>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            The most common type of red-green color vision deficiency; it makes
            certain shades of green look more red. This type is mild and
            doesn’t usually get in the way of normal activities.
          </p>
          <a
            href="https://nei.nih.gov"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4E6AF0", fontSize: "14px", textDecoration: "none" }}
          >
            National Eye Institute
          </a>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#FFF",
              cursor: "pointer",
            }}
          >
            + New
          </button>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#4E6AF0",
              color: "#FFF",
              border: "none",
              cursor: "pointer",
            }}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
