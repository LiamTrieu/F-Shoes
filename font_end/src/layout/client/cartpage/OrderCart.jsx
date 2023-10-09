import {
  TableCell,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import React, { Fragment } from "react";

export default function OrderCart() {
  return <div>OrderCart</div>;
}

export function TableCellCustom({ labels, align, isCart }) {
  return labels.map((label, i) => {
    return (
      <TableCell
        align={align}
        key={i}
        sx={{
          px: label === "Tạm tính" ? 1 : 0,
          fontWeight: "700",
          fontFamily: "monospace",
          fontSize: "17px",
          width: isCart
            ? label === "Sản phẩm"
              ? "38%"
              : label === ""
              ? "1%"
              : "15%"
            : "default",
        }}>
        {label}
      </TableCell>
    );
  });
}

export function OrderCartHeading() {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          sx={{
            fontWeight: "700",
            fontFamily: "monospace",
            fontSize: "17px",
          }}>
          Sản phẩm
        </TableCell>
        <TableCell
          align="right"
          width={"40%"}
          sx={{
            fontWeight: "700",
            fontFamily: "monospace",
            fontSize: "17px",
          }}>
          Giá(vnđ)
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export function OrderCartBody({ orders }) {
  return (
    <Fragment>
      {orders.map((order) => {
        return (
          <TableRow key={order.id}>
            <TableCell align="left">{order.name}</TableCell>
            <TableCell align="right">
              <b>{order.gia}</b>
            </TableCell>
          </TableRow>
        );
      })}
    </Fragment>
  );
}
export function OrderCartFotter({ label, value }) {
  return (
    <TableRow
      sx={{
        "& td": { py: 1, px: 2 },
        [`& .${tableCellClasses.root}`]: {
          borderTop: "solid 1px gray",
        },
      }}>
      <TableCellCustom labels={[label]} />
      <TableCell align="right">
        <Typography fontWeight={800} color={"error"}>
          {value}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
