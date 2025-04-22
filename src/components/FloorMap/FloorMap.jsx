import React, { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RoomModal from "./RoomModal.jsx";
import { initialRoomUpdates, statusColors } from "../../data/mockRoomData";
import {
  Box,
  Paper,
  Typography,
  IconButton
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import "./FloorMap.css";

export default function FloorMap({ selectedFloor }) {
  const [svgRaw, setSvgRaw] = useState("");
  const [updates, setUpdates] = useState(initialRoomUpdates);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const svgContainerRef = useRef(null);
  const transformWrapperRef = useRef(null);

  useEffect(() => {
    if (!selectedFloor) return;

    const url = `${import.meta.env.BASE_URL}/${selectedFloor}.svg`;
    console.log("Fetching SVG from:", url);

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`SVG not found at ${url}`);
        const text = await res.text();
        setSvgRaw(text);
        console.log("SVG fetched:", selectedFloor);
      } catch (err) {
        console.error("Error fetching SVG:", err);
      }
    })();
  }, [selectedFloor]);


  useEffect(() => {
    if (!svgRaw || !updates) return;
    const container = svgContainerRef.current;
    if (!container) return;

    container.innerHTML = svgRaw;
    const svgEl = container.querySelector("svg");
    if (!svgEl) return;

    svgEl.querySelectorAll("text.room-label").forEach((t) => t.remove());

    Object.entries(updates).forEach(([id, { status, facility }]) => {
      const room = svgEl.getElementById(id);
      if (!room) return;

      room.setAttribute("fill", statusColors[status]);
      room.style.cursor = "pointer";

      try {
        const { x, y, width, height } = room.getBBox();

        const nameElem = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        nameElem.classList.add("room-label");
        nameElem.setAttribute("x", x + width / 2);
        nameElem.setAttribute("y", y + height / 2 - 6);
        nameElem.setAttribute("text-anchor", "middle");
        nameElem.setAttribute("font-size", "8");
        nameElem.textContent = id.replace("room-", "Room ");
        svgEl.appendChild(nameElem);

        const facilityElem = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        facilityElem.classList.add("room-label");
        facilityElem.setAttribute("x", x + width / 2);
        facilityElem.setAttribute("y", y + height / 2 + 6);
        facilityElem.setAttribute("text-anchor", "middle");
        facilityElem.setAttribute("font-size", "7");
        facilityElem.textContent = facility;
        svgEl.appendChild(facilityElem);
      } catch (err) {
        console.error(err);
      }
    });
  }, [svgRaw, updates]);

  const handleClick = (e) => {
    const id = e.target.id;
    if (id && updates[id]) {
      setSelectedRoom({ id, ...updates[id] });
    }
  };

  const handleSave = ({ id, status, facility }) => {
    setUpdates((prev) => ({
      ...prev,
      [id]: { status, facility },
    }));
    setSelectedRoom(null);
  };

  const zoomIn = () => {
    const { zoomIn } = transformWrapperRef.current;
    zoomIn();
  };

  const zoomOut = () => {
    const { zoomOut } = transformWrapperRef.current;
    zoomOut();
  };

  const resetZoom = () => {
    const { resetTransform } = transformWrapperRef.current;
    resetTransform();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Floor Plan: {selectedFloor?.toUpperCase()}
        </Typography>

        <Box
          sx={{
            position: "relative", // Make it a positioning context
            border: "1px solid #ccc",
            borderRadius: 2,
            overflow: "hidden",
            height: "500px", // optional: set a fixed height for better layout control
          }}
        >
          <TransformWrapper ref={transformWrapperRef}>
            <TransformComponent>
              <div
                className="svg-floor"
                ref={svgContainerRef}
                onClick={handleClick}
                style={{ width: "100%", height: "100%" }}
              />
            </TransformComponent>
          </TransformWrapper>

          {/* Floating Zoom Buttons */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 1,
              boxShadow: 3,
              p: 1,
              zIndex: 10,
            }}
          >
            <IconButton onClick={zoomIn}>
              <ZoomInIcon />
            </IconButton>
            <IconButton onClick={zoomOut}>
              <ZoomOutIcon />
            </IconButton>
            <IconButton onClick={resetZoom}>
              <RestartAltIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>


      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          onSave={handleSave}
          onCancel={() => setSelectedRoom(null)}
        />
      )}
    </Box>
  );

}
