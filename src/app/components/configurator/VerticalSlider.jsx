"use client";

import React, { useState } from "react";
import { Slider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Col } from "rsuite";

const VerticalSlider = ({
  initialValue = 2,
  onChange = () => {},
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (value) => {
    setValue(value);
    onChange(value);
  };

  // Custom mark rendering
  const renderMark = (mark) => {
    return <span className="text-xs text-gray-300 font-medium">{mark}</span>;
  };
  const style = { height: 400 };
  return (
    <div>
      <div className="relative flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-lg border border-gray-700/40 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
        <div className="flex flex-col items-center mb-4"></div>
        {/* Glass cylinder container */}

        <Col md={2} xs={4}>
          <div style={style}>
            <Slider
              defaultValue={value}
              onChange={handleChange}
              vertical
              progress
            />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default VerticalSlider;
