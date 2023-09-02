import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import hoaDonApi from "../../../api/admin/hoadon/hoaDonApi";
import dayjs from "dayjs";
import { getStatus } from "../../../services/constants/statusHoaDon";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function AdBillPage() {
  const tableRowStyle = {
    "&:hover": {
      backgroundColor: "lightgray",
      cursor: "pointer",
    },
  };

  const [listHoaDon, setListHoaDon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputSearch, setInputSearch] = useState("");
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  //hàm khi thay đổi trang
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    if (inputSearch === undefined || inputSearch === "") {
      fetchData(currentPage - 1);
    } else {
      searchByInputtext(0, inputSearch);
    }
  }, [inputSearch]);
  const fetchData = (currentPage) => {
    hoaDonApi
      .getPage(currentPage)
      .then((response) => {
        console.log(response.data.data);
        setListHoaDon(response.data.data);
        setTotalPages(response.data.totalPages);
        console.log("totalpage: ");
        console.log();
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  };

  const searchByInputtext = (currentPage, inputSearch) => {
    hoaDonApi
      .searchInput(currentPage, inputSearch)
      .then((response) => {
        console.log(response.data.data);
        setListHoaDon(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API  search By ô input: ", error);
      });
  };
  const searchBillByDateRange = (currentPage, startDate, endDate) => {
    // Định dạng startDate và endDate thành dd-mm-yyyy
    const formattedStartDate = dayjs(startDate).format("DD-MM-YYYY");
    const formattedEndDate = dayjs(endDate).format("DD-MM-YYYY");

    // Chuyển đổi thành chuỗi
    const startDateString = formattedStartDate.toString();
    const endDateString = formattedEndDate.toString();
    hoaDonApi
      .searchByDateRange(currentPage, startDateString, endDateString)
      .then((response) => {
        console.log(response.data.data);
        setListHoaDon(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(
          "Lỗi khi gửi yêu cầu API tìm kiếm theo kho ngày: ",
          error
        );
      });
  };

  return (
    <div
      style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}
    >
      <h3>Hoá đơn</h3>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {" "}
            <TextField
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              id="hd-input-search"
              label="Tìm kiếm"
              type="text"
              size="small"
              style={{ width: "100%" }} // Đặt chiều rộng là 100%
            />
          </Grid>
          <Grid xs={0.5}></Grid>
          <Grid xs={2.3}>
            <TextField
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ mt: 2 }}
              id="hd-search-startdate"
              label="Từ ngày"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid xs={2.2}>
            <TextField
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ mt: 2 }}
              id="hd-search-endDate"
              label="Đến ngày"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid xs={1.5}>
            <Button
              sx={{ ml: 1, mt: 2 }}
              variant="contained"
              onClick={() => searchBillByDateRange(0, startDate, endDate)}
            >
              Tìm kiếm
            </Button>
          </Grid>
          <Grid xs={2.5}>
            <Button sx={{ ml: 1, mt: 2 }} color="success" variant="contained">
              <AddOutlinedIcon />
              <Typography sx={{ ml: 1 }}>Tạo Hoá đơn</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Mã</TableCell>
                <TableCell align="center">Tổng sản phẩm</TableCell>
                <TableCell align="center">Tổng số tiền</TableCell>
                <TableCell align="center">Tên khách hàng</TableCell>
                <TableCell align="center">Số điện thoại KH</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center">Loại hoá đơn</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listHoaDon.map((row, index) => (
                <TableRow key={row.code} sx={tableRowStyle}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">
                    {row.totalProduct !== null ? row.totalProduct : 0}
                  </TableCell>
                  <TableCell align="center">
                    {row.totalMoney !== null ? row.totalMoney : 0}
                  </TableCell>
                  <TableCell align="center">
                    {row.fullName !== null ? row.fullName : "Khách lẻ"}
                  </TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">
                    {dayjs(row.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      style={{
                        backgroundColor: "#55acee",
                        color: "#fff",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                    >
                      {row.type ? "Tại Quầy" : "Giao hàng"}
                    </Button>
                  </TableCell>

                  {/* <TableCell align="center"></TableCell> */}
                  <TableCell align="center">
                    <Button
                      style={{
                        backgroundColor: "#ffdb58",
                        color: "#fff",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                    >
                      {getStatus(row.status)}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <Tooltip title="Xem chi tiết">
                      <span>
                        <RemoveRedEyeOutlinedIcon
                          style={{ color: "#C0C0C0" }}
                        />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ float: "right", marginTop: "10px" }}>
          <Pagination
            defaultPage={1}
            page={currentPage}
            onChange={handlePageChange}
            count={totalPages}
            variant="outlined"
          />
        </div>
      </Paper>
    </div>
  );
}
