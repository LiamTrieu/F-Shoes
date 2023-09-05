import Swal from 'sweetalert2'

export default function confirmSatus(title, text, theme) {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    background: theme.palette.layout.colorBgNav,
    color: theme.palette.layout.colorText,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Vâng!',
    cancelButtonText: 'Hủy',
  })
}
