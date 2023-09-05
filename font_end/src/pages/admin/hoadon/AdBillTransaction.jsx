import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { formatCurrency } from "../../../services/common/formatCurrency ";
import dayjs from "dayjs";

const AdBillTransaction = (props) => {
  const { listTransaction } = props;
  const tableRowStyle = {
    "&:hover": {
      backgroundColor: "lightgray",
      cursor: "pointer",
    },
  };
  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Số tiền</TableCell>
              <TableCell align="center">Thời gian</TableCell>
              <TableCell align="center">Loại giao dịch</TableCell>
              <TableCell align="center">PTTT</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ghi chú</TableCell>
              <TableCell align="center">Nhân viên xác nhận</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listTransaction.map((row, index) => (
              <TableRow key={row.code} sx={tableRowStyle}>
                <TableCell align="center">
                  {row.totalMoney !== null ? formatCurrency(row.totalMoney) : 0}
                </TableCell>
                <TableCell align="center">
                  {dayjs(row.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={row.type ? "Thanh toán" : "Hoàn tiền"}
                      color="primary"
                    />
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={
                        row.paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"
                      }
                      color="primary"
                    />
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={
                        row.status === 1 ? "Thành công" : "Không thành công"
                      }
                      color="primary"
                    />
                  </Stack>
                </TableCell>
                <TableCell align="center">{row.note}</TableCell>
                <TableCell align="center">{row.staff.fullName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdBillTransaction;
