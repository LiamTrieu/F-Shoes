import React from "react";
import Container from "@mui/material/Container";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuButton from "@mui/joy/MenuButton";

import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";

function createData(STT, Name, Values, permission, status, Time, Action) {
  return { STT, Name, Values, permission, status, Time, Action };
}

const rows = [
  createData(
    1,
    "Quốc Khánh",
    "7%",
    "Công Khai",
    "Đang hoạt động",
    "21:10;10.10-10-2022",
    <RemoveRedEyeIcon />
  ),
  createData(
    1,
    "Quốc Khánh",
    "7%",
    "Công Khai",
    "Đang hoạt động",
    "21:10;10.10-10-2022",
    <RemoveRedEyeIcon />
  ),
  createData(
    1,
    "Quốc Khánh",
    "7%",
    "Công Khai",
    "Đang hoạt động",
    "21:10;10.10-10-2022",
    <RemoveRedEyeIcon />
  ),
];

export default function AdPromotionPage() {
  return (
    <Container>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: "97%" }}>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <TextField
                sx={{ width: "80%" }}
                id="outlined"
                label="Name"
                type="text"
                size="small"
              />
            </Grid>
            <Grid xs={6} md={2}>
              <Button sx={{ ml: 1, mt: 2 }} variant="contained">
                Tìm kiếm
              </Button>
            </Grid>
            <Grid xs={6} md={2}>
              <TextField
                sx={{ mt: 2, width: "80%" }}
                id="outlined-basic"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={6} md={2}>
              <TextField
                sx={{ mt: 2, width: "80%" }}
                id="outlined-basic"
                label="Đến ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <Button
                sx={{ ml: 1, mt: 2 }}
                color="success"
                variant="contained"
                component={Link}
                to="/admin/promotion/add"
              >
                <AddIcon />
                <Typography sx={{ ml: 1 }}>Tạo Khuyến Mại</Typography>
              </Button>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography>Trạng Thái:</Typography>
            <Dropdown>
              <MenuButton
                endDecorator={<ArrowDropDown />}
                sx={{ border: "none" }}
              >
                Size
              </MenuButton>
              <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
                <MenuItem>Smaller</MenuItem>
                <MenuItem>Larger</MenuItem>
              </Menu>
            </Dropdown>
          </Stack>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="right">Tên</TableCell>
                <TableCell align="right">Giá trị</TableCell>
                <TableCell align="right">Quyền</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Thời gian</TableCell>
                <TableCell align="right">Hoạt động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.STT}</TableCell>
                  <TableCell align="right">{row.Name}</TableCell>
                  <TableCell align="right">{row.Values}</TableCell>
                  <TableCell align="right">{row.permission}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.Time}</TableCell>
                  <TableCell align="right">{row.Action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
