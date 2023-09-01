import { Box, Button, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function AdCustomerPage() {
  return (
    <div>
      <Box display="flex" height={"80px"}>
        <Box flexGrow={1} sx={{ marginTop: "20px" }}>
          <TextField
            id="filled-basic"
            label="Nhập tên"
            variant="filled"
            style={{ width: "400px" }}
          />
          <Button variant="outlined" startIcon={<SearchIcon />}>
            Tìm kiếm
          </Button>
        </Box>
      </Box>
    </div>
  );
}
