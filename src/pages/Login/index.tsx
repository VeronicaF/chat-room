import request from '@/utils/request';
import { useMount } from 'ahooks';

function Login() {
  useMount(() => {
    request('/api/login', {
      data: {
        username: 'test',
        password: 'test',
      }
    })
  })
  return (
    <h1>登录页</h1>
  )
}

export default Login
