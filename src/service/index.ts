import request from '@/utils/request';

export async function _login(username: string) {
  return request.post('/login', {
    data: {
      username,
      password: '1',
    }
  })
}

export async function _fetchCurrentUser() {
  return request<API.CurrentUser>('/current-user')
}
