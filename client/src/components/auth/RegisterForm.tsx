import React from 'react'
import { Button, Form, Input, notification } from 'antd';
import { destroyCookie, setCookie } from 'nookies';
import Api, { RegisterFormDTO } from '@api';

import styles from './Auth.module.scss'

// export const RegisterForm: React.FC = () => {
export function RegisterForm() {
  const onSubmit = async (values: RegisterFormDTO): Promise<void> => {
    if (values.password !== values.passwordConfirm) {
      notification.error({
        message: 'Registration error',
        description: 'Passwords mismatch',
        duration: 4,
      })
      return;
    }

    try {
      const { token } = await Api.auth.register(values);

      notification.success({
        message: 'Registration was successful!',
        description: 'Go to admin panel...',
        duration: 2,
      });

      setCookie(null, '_token', token, { path: '/' })
    } catch (err) {
      console.warn('LoginForm', err);
      notification.error({
        message: 'Registration error',
        description: 'Incorrect login or password',
        duration: 4,
      })
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
          label='Full Name'
          name='fullName'
          rules={[
            {
              required: true,
              message: 'Enter your full name'
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
          label='Password confirm'
          name='passwordConfirm'
          rules={[
            {
              required: true,
              message: 'Confirm your password'
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
          <Button type='primary' htmlType='submit'>Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
}