import { Avatar, Button, Layout, Menu, Popover } from "antd";
import { CloudOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Api from '@api';

import styles from './Header.module.scss'

// export const Header: React.FC = () => {
export function Header() {
  const router = useRouter();
  const selectedMenu = router.pathname;

  const onClickLogout = () => {
    if (window.confirm('Are your sure?')) {
      Api.auth.logout();
      location.href = '/';
    }
  }

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>

        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            Cloud Storage
          </h2>
          <Menu
            className={styles.topMenu}
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={[selectedMenu]}
            onSelect={({ key }) => router.push(key)}
            items={[
              { key: '/dashboard', label: 'Main' },
              { key: '/dashboard/profile', label: 'Profile' },
            ]}
          />
        </div>

        <div className={styles.headerRight}>
          <Popover
            trigger='click'
            content={
              <Button onClick={onClickLogout} type='primary' danger>
                Logout
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>

      </div>
    </Layout.Header>
  );
}