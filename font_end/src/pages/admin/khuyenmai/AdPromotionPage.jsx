import React from "react";
import Container from "@mui/material/Container";
import { Box, Button, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function AdPromotionPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ border: "2px solid black", p: 2 }}>
        <TextField
          id="outlined-basic"
          label="Mã khuyến mãi"
          variant="outlined"
          size="small"
        />
        <Button variant="contained">Tìm kiếm</Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label="Basic date time picker" />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </Container>
  );
}
