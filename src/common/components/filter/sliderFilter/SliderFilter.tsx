import React from "react";
import Box from "@mui/material/Box";
import { Slider } from "@mui/material";
import { StyledDiv } from "common/styles/styledDiv/StyledDiv";

function valuetext(value: number) {
  return `${value}°C`;
}

export const SliderFilter = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <Box sx={{ width: 300 }}>
      <StyledDiv />
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <StyledDiv />
    </Box>
  );
};
