import React from 'react'
import { Button, Form, Input, notification } from 'antd'
import { setCookie, destroyCookie } from 'nookies';
import Api, { LoginFormDTO } from '@api';

import styles from './Auth.module.scss'

// export const LoginForm: React.FC = () => {
export function LoginForm() {
  const onSubmit = async (values: LoginFormDTO): Promise<void> => {
    try {
      const { token } = await Api.auth.login(values);

      notification.success({
        message: 'Authorization was successful!',
        description: 'Go to admin panel...',
        duration: 2,
      });

      setCookie(null, '_token', token, { path: '/' })
      location.href = '/dashboard'
    } catch (err) {
      console.warn('LoginForm', err);
      notification.error({
        message: 'Authorization error',
        description: 'Incorrect login or password',
        duration: 4,
      })
      destroyCookie(null, '_token', { path: '/' });
    }
  }

  return (
    <div className={styles.root}>
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >

        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Enter your email'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Enter your password'
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>Log In</Button>
        </Form.Item>
      </Form>
    </div>
  )
}