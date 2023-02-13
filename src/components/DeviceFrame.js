import { View, Text } from "react-native";
import React from "react";

const DeviceFrame = () => {
  return (
    <div className="iphone-x">
      <div className="side">
        <div className="screen">
          <Text>hi</Text>
        </div>
      </div>
      <div className="line"></div>
      <div className="header">
        <div className="sensor-1"></div>
        <div className="sensor-2"></div>
        <div className="sensor-3"></div>
      </div>
      <div className="volume-button"></div>
      <div className="power-button"></div>
    </div>
  );
};

export default DeviceFrame;
