import React from 'react'
import { MenuItem, Select } from '@mui/material'
import './index.css'

export function SelectFilter({ label, data, value, setValue }) {
  return (
    <div className="filter">
      <b>{label}:</b>
      <Select
        displayEmpty
        size="small"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}>
        <MenuItem value={''}>Tất cả</MenuItem>
        {data?.map((item) => (
          <MenuItem key={item?.id} value={item?.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
