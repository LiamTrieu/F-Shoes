import { Button, Container, Paper, TextField, Table } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Ảnh",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "accountName",
    key: "accountName",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "accountName",
    key: "accountName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Họ và tên",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
];

const rows = [
  {
    stt: 1,
    id: 1,
    image: "Ảnh 1",
    accountName: "Trang",
  },
];

export default function AdStaffPage() {
  return (
    <div
      style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}
    >
      <Container>
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <TextField
            id="outlined-basic"
            label="Tên Nhân Viên"
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            startIcon={<SearchIcon />}
          >
            Tìm kiếm
          </Button>
          <Button
            variant="outlined"
            style={{ float: "right" }}
            color="success"
            startIcon={<AddIcon />}
          >
            Tạo tài khoản
          </Button>
        </Paper>
      </Container>
      <Container sx={{ marginTop: "50px" }}>
        <Table
          dataSource={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Container>
    </div>
  );
}
