import { Button, Popconfirm } from 'antd';
import { NextPageWithLayout } from '@pages/_app'
import styles from './FileActions.module.scss'

interface FileActionsProps {
  onClickRemove?: VoidFunction;
  onClickShare?: VoidFunction;
  isActive?: boolean;
}

export const FileActions: NextPageWithLayout<FileActionsProps> = ({
  onClickRemove,
  onClickShare,
  isActive,
}) => {
  return (
    <div className={styles.root}>
      <Button onClick={onClickShare} disabled={!isActive}>Share</Button>
      <Popconfirm
        onConfirm={onClickRemove}
        title="Delete file(s)?"
        description="All files will be moved to trash"
        okText="Remove"
        cancelText="No"
        disabled={!isActive}
      >
        <Button type="primary" disabled={!isActive} danger>Remove</Button>
      </Popconfirm>
    </div>
  )
}