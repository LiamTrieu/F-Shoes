import { AccountCircle } from '@mui/icons-material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Google from '../../assets/image/google.svg'
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ColorCustom } from '../../styles/ColorCustom'

const InputForm = ({ label, Icon, id, isPass }) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <FormControl variant="standard" sx={{ width: '100%', marginBottom: '25px' }}>
      <InputLabel htmlFor={id} sx={{ color: 'black' }}>
        {label}
      </InputLabel>
      <Input
        sx={{ fontFamily: 'monospace' }}
        id={id}
        type={isPass && !showPass ? 'password' : 'text'}
        endAdornment={
          <InputAdornment position="end">
            {isPass && (
              <Button
                onClick={() => {
                  setShowPass(!showPass)
                }}
                sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                {showPass ? (
                  <VisibilityOffIcon sx={{ color: 'black' }} />
                ) : (
                  <RemoveRedEyeIcon sx={{ color: 'black' }} />
                )}
              </Button>
            )}
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <Icon sx={{ color: 'black' }} />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const RegisterPanel = () => {
  return (
    <Box>
      <InputForm label="Tên tài khoản *" Icon={AccountCircle} id="reg-input-user" />
      <InputForm label="Địa chỉ email *" Icon={EmailIcon} id="reg-input-email" type="email" />
      <InputForm label="Mật khẩu *" Icon={LockIcon} id="reg-input-pass" isPass={true} />
      <InputForm isPass={true} label="Nhập lại mật khẩu *" Icon={LockIcon} id="reg-input-repass" />
      <ThemeProvider theme={ColorCustom}>
        <Button type="submit" variant="contained" color="neutral" sx={{ marginRight: '15px' }}>
          Đăng ký
        </Button>
      </ThemeProvider>
    </Box>
  )
}

const LoginPanel = () => {
  return (
    <Box>
      <InputForm
        label="Tên tài khoản hoặc địa chỉ email *"
        Icon={AccountCircle}
        id="login-input-user"
      />
      <InputForm label="Mật khẩu *" Icon={LockIcon} id="login-input-password" isPass={true} />
      <FormControlLabel
        control={<Checkbox size="small" color="primary" />}
        label="Ghi nhớ mật khẩu"
      />
      <Box my={1}>
        <ThemeProvider theme={ColorCustom}>
          <Button type="submit" variant="contained" color="neutral" sx={{ marginRight: '15px' }}>
            Đăng nhập
          </Button>
          <Button
            sx={{ fontWeight: 'bold' }}
            variant="outlined"
            color="gray"
            startIcon={<img src={Google} alt="Google" />}>
            Google
          </Button>
        </ThemeProvider>
      </Box>
      <Typography variant="a" component={Link} to={'/'}>
        Quên mật khẩu?
      </Typography>
    </Box>
  )
}

export default function Login() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Container maxWidth={'sm'} sx={{ my: 6 }}>
      <Paper elevation={3} sx={{ padding: '20px', my: 10 }}>
        <Tabs
          sx={{ mb: 3 }}
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example">
          <Tab
            label="Đăng nhập"
            sx={{
              fontWeight: '800',
              textTransform: 'none',
              fontFamily: 'monospace',
              fontSize: '20px',
              color: 'black',
            }}
          />
          <Tab
            label="Đăng ký"
            sx={{
              fontWeight: '800',
              textTransform: 'none',
              fontFamily: 'monospace',
              fontSize: '20px',
              color: 'black',
            }}
          />
        </Tabs>
        {value === 0 ? <LoginPanel /> : <RegisterPanel />}
      </Paper>
    </Container>
  )
}
