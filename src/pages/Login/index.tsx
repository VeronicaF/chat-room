import { Button, Form, Input, message } from 'antd';
import style from './index.less';
import { useModel } from '@@/plugin-model/useModel';
import { history } from 'umi';

function Login() {
  const { login } = useModel('user');

  const onFinish = async (data: { username: string }) => {
    await login(data.username);
    message.success('登录成功')
    history.push('/')
  };

  return (
    <div className={style.wrapper}>
      <div className={style.formWrapper}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Enter
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
