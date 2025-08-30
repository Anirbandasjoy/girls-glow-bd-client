"use client";

import ReactPixel from "react-facebook-pixel";
import { useEffect } from "react";

const PixelTracker = () => {
  useEffect(() => {
    const pixelId = "YOUR_PIXEL_ID";
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  }, []);  return null;
};export default PixelTracker;