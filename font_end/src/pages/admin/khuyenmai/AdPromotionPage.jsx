import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  Stack,
  Table,
  TextField,
  Typography,
} from "@mui/material";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import khuyenMaiApi from "../../../api/admin/khuyenmai/khuyenMaiApi";
// import khuyenMaiApi from "../../../api/admin/khuyenmai/khuyenMaiApi";
// import axios from "axios";

export default function AdPromotionPage() {
  const [listKhuyenMai, setListKhuyenMai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handelOnchangePage = (Page) => {
    loadData(Page - 1);
    setCurrentPage(Page);
  };

  const loadData = (currentPage) => {
    khuyenMaiApi.getPage(currentPage).then((response) => {
      setListKhuyenMai(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    });
  };

  useEffect(() => {
    loadData(currentPage - 1);
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
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
                {/* <AddIcon /> */}
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
            {/* <Dropdown>
              <MenuButton
                // endDecorator={<ArrowDropDown />}
                sx={{ border: "none" }}>
                Size
              </MenuButton>
              <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
                <MenuItem>Smaller</MenuItem>
                <MenuItem>Larger</MenuItem>
              </Menu>
            </Dropdown> */}
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
              {listKhuyenMai.map((promotion, index) => (
                <TableRow
                  key={promotion.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>

                  <TableCell align="right">{promotion.name}</TableCell>
                  <TableCell align="right">{promotion.value}</TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{
                        backgroundColor:
                          promotion.type === false ? "#FFFF99" : "#66FFFF",
                        borderRadius: "90px",
                        textTransform: "none",
                      }}
                    >
                      {promotion.type === false ? "Tất cả" : "Giới hạn"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{
                        backgroundColor:
                          promotion.status === 0 ? "#FF6633" : "#00FF00",
                        borderRadius: "90px",
                        textTransform: "none",
                      }}
                    >
                      {promotion.status === 0 ? "Hết hạn" : "Còn hạn"}
                    </Button>
                  </TableCell>

                  <TableCell align="right">
                    {promotion.timeStart} - {promotion.timeEnd}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/promotion/get-one/${promotion.id}`}>
                      <Button variant="contained" align="right">
                        Chi tiết
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Pagination
            page={currentPage}
            onChange={(event, value) => handelOnchangePage(value)}
            count={totalPages}
            variant="outlined"
          />
        </div>
      </Paper>
    </Container>
  );
}
