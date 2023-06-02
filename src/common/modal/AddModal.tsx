import React from "react";
import { UniversalModal } from "common/modal/UniversalModal";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const AddModal = () => {
  return (
    <UniversalModal title={"add new pack"}>
      <Box id="modal-modal-description" sx={{ mt: 2 }}>
        <TextField id="standard-basic" label="Name Pack" variant="standard" />
      </Box>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Private pack" />
    </UniversalModal>
  );
};
