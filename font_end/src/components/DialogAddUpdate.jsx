import { Button, Dialog, DialogContent, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { spButton } from '../pages/admin/sanpham/sanPhamStyle'

export default function DialogAddUpdate({ children, open, setOpen, title, buttonSubmit }) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => {
        setOpen(false)
      }}>
      <DialogContent>
        <Typography
          fontFamily={"'Montserrat', sans-serif"}
          fontSize={'30px'}
          fontWeight={500}
          textAlign={'center'}>
          {title}
        </Typography>
        {children}
        <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
          {buttonSubmit}
          <Button
            onClick={() => {
              setOpen(false)
            }}
            color="error"
            disableElevation
            sx={{ ...spButton }}
            variant="contained">
            Hủy
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
