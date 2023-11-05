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
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ColorCustom } from '../../styles/ColorCustom'
import authenticationAPi from '../../api/authentication/authenticationAPi'
import { toast } from 'react-toastify'
import { getCookie, setCookie } from '../../services/cookie'
import { useDispatch } from 'react-redux'
import { addUser } from '../../services/slices/userSlice'

const InputForm = ({ label, Icon, id, isPass, defaultValue, chagneValue }) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <FormControl variant="standard" sx={{ width: '100%', marginBottom: '25px' }}>
      <InputLabel htmlFor={id} sx={{ color: 'black' }}>
        {label}
      </InputLabel>
      <Input
        onChange={(e) => {
          chagneValue(e.target.value)
        }}
        defaultValue={defaultValue}
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
  const [user, setUser] = useState({
    email: 'nguyenthithuyduong948@gmail.com',
    password: 'thuyduongxih',
  })
  const [error, SetError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submit = (e) => {
    e.preventDefault()
    return authenticationAPi.login(user.email, user.password).then(
      (response) => {
        if (response.data.success) {
          setCookie('ClientToken', response.data.data, 7)
          toast.success('Đăng nhập thành công!')
          SetError(null)
          authenticationAPi.getClient().then((response) => {
            dispatch(addUser(response.data.data))
          })
          navigate('/home')
        } else {
          toast.error('Đăng nhập thất bại!')
          SetError('Tài khoản hoặc mật khẩu không chính xác')
        }
      },
      (err) => {
        toast.error('Lỗi hệ thống vui lòng thử lại!')
      },
    )
  }
  return (
    <Box>
      <InputForm
        chagneValue={(e) => {
          setUser({ email: e })
        }}
        label="Địa chỉ email của bạn *"
        Icon={AccountCircle}
        id="login-input-user"
        defaultValue={user.email}
      />
      <InputForm
        chagneValue={(e) => {
          setUser({ password: e })
        }}
        defaultValue={user.password}
        label="Mật khẩu *"
        Icon={LockIcon}
        id="login-input-password"
        isPass={true}
      />
      {/* <FormControlLabel
        control={<Checkbox size="small" color="primary" />}
        label="Ghi nhớ mật khẩu"
      /> */}
      {error && <Typography color={'red'}>{error}</Typography>}
      <Box my={1}>
        <ThemeProvider theme={ColorCustom}>
          <Button
            onClick={submit}
            type="submit"
            variant="contained"
            color="neutral"
            sx={{ marginRight: '15px' }}>
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

  const token = getCookie('ClientToken')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return token ? (
    <Navigate to={'/home'} />
  ) : (
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
