import {
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
// import PercentIcon from "@mui/icons-material/Percent";

export default function AdVoucherAdd() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Container>
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Grid>
            <h1>Voucher</h1>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={5.5}>
              <TextField
                id="MGG"
                label="Mã giảm giá"
                type="text"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5.5}>
              <TextField
                label="Giá trị"
                id="GT"
                type="number"
                size="small"
                minValue={0}
                maxValue={100}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <PercentIcon /> */}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={0.5}></Grid>
          </Grid>
          {/*------------------------------------------------------------------------------------- */}

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={5.5}>
              <TextField
                id="GTTD"
                label="Mã giảm giá"
                type="text"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5.5}>
              <TextField
                label="Giá trị"
                id="DK"
                type="number"
                size="small"
                minValue={0}
                maxValue={100}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <PercentIcon /> */}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={0.5}></Grid>
          </Grid>
          {/**?------------------------------------------------------------------------------------------------------- */}

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ mt: 2 }}
                id="TN"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ mt: 2 }}
                id="DN"
                label="Đến ngày"
                type="date"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={2}>
              <TextField
                sx={{ mt: 2 }}
                id="LAD"
                label="Lượt áp dụng"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={0.5}></Grid>
          </Grid>
          {/**?------------------------------------------------------------------------------------------------------- */}

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={5}>
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Quyền sử dụng
                </InputLabel>
                <Select
                  value={age}
                  label="Quyền sử dụng"
                  onChange={handleChange}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{ mt: 3, width: 150, float: "left" }}
                variant="contained">
                Chọn
              </Button>
            </Grid>
            <Grid item xs={0.5}></Grid>
          </Grid>
          {/**?------------------------------------------------------------------------------------------------------- */}

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={3}>
              <Button variant="contained" fullWidth color="success">
                Xác nhận
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Paper>
      </Container>
    </div>
  );
}
