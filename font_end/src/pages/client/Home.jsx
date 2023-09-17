import React from 'react'
import './index.css'
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export default function Home() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Table sx={{ margin: 10 }} className="tableCss">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Màu sắc</TableCell>
                <TableCell align="center">Ngày thêm</TableCell>
                <TableCell align="center">Hoạt động</TableCell>
                <TableCell align="center">Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  )
}
