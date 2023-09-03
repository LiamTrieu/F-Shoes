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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import hoaDonApi from "../../../api/admin/hoadon/hoaDonApi";
import dayjs from "dayjs";
import { getStatus } from "../../../services/constants/statusHoaDon";
import Tooltip from "@mui/material/Tooltip";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  // ... các imports khác
  DemoContainer,
  DemoItem,
} from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
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
  const [statusBill, setStatusBill] = useState(-1);
  const [typeBill, setTypeBill] = useState(-1);
  const [rangeDate, setRangeDate] = useState([
    dayjs(dayjs().format("YYYY-MM-DD")),
    dayjs(dayjs().format("YYYY-MM-DD")),
  ]);

  useEffect(() => {
    fetchData(currentPage - 1);
  }, []);

  //hàm khi thay đổi trang
  const handlePageChange = (event, newPage) => {
    //newPage <=> currentPage được hiển thị ( hiển thị từ 1 <=> pageNo + 1)
    fetchData(newPage - 1);
    setCurrentPage(newPage);
  };

  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
    if (e.target.value === undefined || e.target.value === "") {
      fetchData(currentPage - 1);
    } else {
      searchByInputtext(0, e.target.value);
    }
  };

  const handleChangeSelectStatusBill = (event) => {
    setStatusBill(event.target.value);
  };

  const handleChangeSelectTypeBill = (event) => {
    setTypeBill(event.target.value);
  };

  const fetchData = (currentPage) => {
    hoaDonApi
      .getPage(currentPage)
      .then((response) => {
        console.log(response.data.data);
        setListHoaDon(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API get page: ", error);
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
        console.error("Lỗi khi gửi yêu cầu API search By ô input: ", error);
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
          "Lỗi khi gửi yêu cầu API tìm kiếm theo khoảng ngày: ",
          error
        );
      });
  };

  /////////
  const searchBillByDateRange2 = (currentPage, rangeDate) => {
    const startDate = rangeDate[0]; // Phần tử đầu tiên của mảng
    const endDate = rangeDate[1]; // Phần tử thứ hai của mảng

    console.log("Start Date: ", startDate);
    console.log("End Date: ", endDate);

    // Định dạng startDate và endDate thành dd-mm-yyyy
    const formattedStartDate = dayjs(startDate).format("DD-MM-YYYY");
    const formattedEndDate = dayjs(endDate).format("DD-MM-YYYY");

    // Chuyển đổi thành chuỗi
    const startDateString = formattedStartDate.toString();
    const endDateString = formattedEndDate.toString();
    console.log("String: ");
    console.log(formattedStartDate);
    console.log(formattedEndDate);
  };

  //

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h2>Hoá đơn</h2>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={5} style={{ margin: "25px", padding: "8px" }}>
            {" "}
            <TextField
              value={inputSearch}
              onChange={handleInputSearch}
              id="hd-input-search"
              label="Tìm kiếm"
              type="text"
              size="small"
              style={{ width: "100%" }} // Đặt chiều rộng là 100%
            />
          </Grid>
          <Grid xs={2.5} style={{ margin: "20px" }}></Grid>
          <Grid xs={2.5} style={{ margin: "20px" }}>
            <Button sx={{ ml: 1, mt: 2 }} color="success" variant="contained">
              {/* <AddOutlinedIcon /> */}
              <Typography sx={{ ml: 1 }}>Tạo Hoá đơn</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid xs={2}></Grid>
          {/* <Grid xs={2}>
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
          <Grid xs={2}>
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
          </Grid> */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
              <DemoItem label="Controlled picker" component="DateRangePicker">
                <DateRangePicker
                  value={rangeDate}
                  onChange={(newValue) => setRangeDate(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={rangeDate}
              onChange={(newValue) => setRangeDate(newValue)}
            />
          </LocalizationProvider>

          <Grid xs={1.5}>
            <Button
              sx={{ ml: 1, mt: 2 }}
              variant="contained"
              onClick={() => searchBillByDateRange2(0, rangeDate)}>
              Tìm kiếm
            </Button>
          </Grid>
          <Grid xs={2} style={{ marginTop: "15px" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="hd-select-status" shrink>
                Trạng thái
              </InputLabel>
              <Select
                id="hd-select-status"
                value={statusBill === null ? "" : statusBill.toString()} // Chuyển giá trị sang chuỗi
                onChange={handleChangeSelectStatusBill}
                style={{ height: "40px" }}
                label="Trạng thái"
                inputProps={{
                  name: "Trạng thái",
                  id: "hd-select-status",
                }}>
                <MenuItem value="-1">Tất cả</MenuItem>
                <MenuItem value="0">{getStatus(0)}</MenuItem>
                <MenuItem value="1">{getStatus(1)}</MenuItem>
                <MenuItem value="2">{getStatus(2)}</MenuItem>
                <MenuItem value="3">{getStatus(3)}</MenuItem>
                <MenuItem value="4">{getStatus(4)}</MenuItem>
                <MenuItem value="5">{getStatus(5)}</MenuItem>
                <MenuItem value="6">{getStatus(6)}</MenuItem>
                <MenuItem value="7">{getStatus(7)}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2} style={{ marginTop: "15px", marginLeft: "25px" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="hd-select-type" shrink>
                Loại:
              </InputLabel>
              <Select
                id="hd-select-type"
                value={typeBill === null ? "" : typeBill.toString()} // Chuyển giá trị sang chuỗi
                onChange={handleChangeSelectTypeBill}
                style={{ height: "40px" }}
                label="Loại"
                inputProps={{
                  name: "Loại",
                  id: "hd-select-type",
                }}>
                <MenuItem value="-1">Tất cả</MenuItem>
                <MenuItem value="0">Tại quầy</MenuItem>
                <MenuItem value="1">Giao hàng</MenuItem>
              </Select>
            </FormControl>
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
                        borderRadius: "90px",
                        textTransform: "none",
                      }}>
                      {row.type ? "Giao hàng" : "Tại Quầy"}
                    </Button>
                  </TableCell>

                  {/* <TableCell align="center"></TableCell> */}
                  <TableCell align="center">
                    <Button
                      style={{
                        backgroundColor: "#ffdb58",
                        color: "#fff",
                        borderRadius: "90px",
                        textTransform: "none",
                      }}>
                      {getStatus(row.status)}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <Tooltip title="Xem chi tiết">
                      <Button style={{ color: "#C0C0C0" }}>
                        <span>{/* <FontAwesomeIcon icon={faEye} /> */}</span>
                      </Button>
                    </Tooltip>
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
          }}>
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
