import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const InputQuantity = ({
  cart,
  decreaseQuantityBillDetail,
  inputQuantityBillDetail,
  increaseQuantityBillDetail,
  totalSum,
}) => {
  const [quantity, setQuantity] = useState(cart.quantity)

  useEffect(() => {
    setQuantity(cart.quantity)
  }, [cart.quantity])

  return (
    <Box
      width={'65px'}
      display="flex"
      alignItems="center"
      sx={{
        border: '1px solid gray',
        borderRadius: '20px',
      }}
      p={'3px'}>
      <IconButton
        size="small"
        sx={{ p: 0 }}
        onClick={() => {
          decreaseQuantityBillDetail(cart.idBillDetail, cart.id, quantity)
          setQuantity(parseInt(quantity) - 1)
        }}
        disabled={quantity <= 1}>
        <RemoveIcon fontSize="1px" />
      </IconButton>
      <TextField
        value={quantity}
        inputProps={{ min: 1 }}
        size="small"
        sx={{
          width: '30px ',
          '& input': { p: 0, textAlign: 'center' },
          '& fieldset': {
            border: 'none',
          },
        }}
        onChange={(e) => setQuantity(e.target.value)}
        onBlur={(e) => {
          const inputValue = e.target.value
          const numericValue = Number(inputValue)
          if (!isNaN(numericValue) && numericValue >= 1) {
            setQuantity(inputQuantityBillDetail(cart.idBillDetail, cart.id, numericValue, cart))
          }
        }}
      />
      <IconButton
        disabled={Number(totalSum) >= 500000000}
        size="small"
        sx={{ p: 0 }}
        onClick={() => {
          increaseQuantityBillDetail(cart.idBillDetail, cart.id, quantity)
          setQuantity(parseInt(quantity) + 1)
        }}>
        <AddIcon fontSize="1px" />
      </IconButton>
    </Box>
  )
}

export default InputQuantity
