import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
} from "@mui/material";
import React from "react";
import LabelTitle from "../../layout/client/checkoutpage/LabelTitle";
import InputForm, {
  InputFormGrid,
  InputFormSelectGrid,
} from "../../layout/client/checkoutpage/InputForm";
import {
  OrderCartBody,
  OrderCartFotter,
  OrderCartHeading,
} from "../../layout/client/cartpage/OrderCart";
import { BoderDotted } from "../../styles/TableStyle";

const arrData2 = [
  {
    id: 2,
    name: "Air Jordan 1 Mid - Neutral Grey - 41 x 2",
    gia: 20000,
  },
  {
    id: 1,
    name: "Air Jordan 1 Mid - Neutral Grey - 41 x 3",
    gia: 30000,
  },
];
export default function Checkout() {
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Paper
        sx={{
          padding: "40px",
          paddingTop: 0,
          minHeight: "68vh",
          marginBottom: "15px",
          py: 2,
        }}>
        <Grid container spacing={2}>
          <Grid item lg={7} sx={{ px: { lg: "40px" } }} width={"100%"}>
            <LabelTitle title="Thông tin thanh toán" />
            <InputForm id="input-name" label="Họ và tên của bạn" />
            <Grid container mt={0} spacing={3}>
              <InputFormGrid id="input-number" label="Số điện thoại của bạn" />
              <InputFormGrid id="input-email" label="Địa chỉ email của bạn" />
            </Grid>
            <Grid container mt={0} spacing={3}>
              <InputFormSelectGrid
                id="input-tinh"
                options={["Hưng Yên", "Hà Nội", "Thanh Hóa"]}
                label="Tỉnh/Thành phố"
              />
              <InputFormSelectGrid
                id="input-huyen"
                options={["Ấn Thi", "Nam Từ Niêm", "Thiệu Hóa"]}
                label="Quận/Huyện"
              />
            </Grid>
            <Grid container mt={0} spacing={3}>
              <InputFormSelectGrid
                id="input-xa"
                options={["Đặng Lễ", "Phúc Diễn", "Xã Minh Tâm"]}
                label="Xã/Phường"
              />
              <InputFormGrid id="dia-chi" label="Địa chỉ cụ thể" />
            </Grid>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="ghi-chu">
                Ghi chú đơn hàng (tuỳ chọn)
              </InputLabel>
              <OutlinedInput id="ghi-chi" label="Ghi chú đơn hàng (tuỳ chọn)" />
            </FormControl>
          </Grid>
          <Grid item lg={5} width={"100%"}>
            <Paper sx={{ height: "100%" }} variant="outlined">
              <LabelTitle title="Đơn hàng của bạn" />
              <Table>
                <OrderCartHeading />
                <TableBody sx={BoderDotted}>
                  <OrderCartBody orders={arrData2} />
                </TableBody>
                <OrderCartFotter label="Phí ship" value={200000} />
                <OrderCartFotter label="Tổng tiền" value={2000000} />
              </Table>
              <FormControl>
                <RadioGroup
                  sx={{ ml: 2, mt: 1 }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group">
                  <FormControlLabel
                    value="0"
                    control={<Radio size="small" />}
                    label="Thanh toán khi nhận hàng."
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label="Thanh toán ngay"
                  />
                </RadioGroup>
              </FormControl>
              <Box></Box>
              <Button
                size="sm"
                variant="contained"
                color="success"
                sx={{ float: "right", my: 2, mr: 2 }}>
                <b>thanh toán</b>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
