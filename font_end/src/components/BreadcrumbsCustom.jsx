import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export default function BreadcrumbsCustom({ listLink, nameHere }) {
  let breadcrumbs = []

  if (Array.isArray(listLink)) {
    breadcrumbs = [
      listLink.map((e, index) => {
        return (
          <Typography
            variant="h4"
            sx={{
              color: 'layout.colorText',
              textDecoration: 'none',
              fontWeight: '400',
              fontSize: 'calc(1.2rem + 0.15vw)',
            }}
            component={e.link != null ? Link : ''}
            key={`listLink${index + 1}`}
            to={e.link}>
            {e.name}
          </Typography>
        )
      }),
    ]
  }
  breadcrumbs.push(
    <Typography
      sx={{
        textDecoration: 'none',
        fontWeight: '400',
        fontSize: 'calc(1.2rem + 0.15vw)',
      }}
      key={'listLink0'}
      color="text.primary">
      {nameHere}
    </Typography>,
  )
  return (
    <Breadcrumbs
      separator={
        <Typography
          sx={{
            fontSize: 'calc(1.2rem + 0.15vw)',
          }}>
          /
        </Typography>
      }
      sx={{ mb: 2, mt: 1 }}
      aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  )
}
