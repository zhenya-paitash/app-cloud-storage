import React from 'react'
import { Empty } from 'antd';
import Api, { FileItem } from '@api';
import { FileList, FileActions, FileSelectType } from '@components'

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = React.useState(items || []);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const onFileSelect = (id: number, type: FileSelectType) => {
    setSelectedIds((prev) => 
      type === 'select' ? [...prev, id] : prev.filter((_id) => _id !== id)
    )
  }

  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((file: FileItem) => !selectedIds.includes(file.id)))
    Api.files.remove(selectedIds)
  }

  const onClickShare = () => {
    alert('share')
  }

  return (
    <>
      {
        files.length ? (
          <>
            {withActions && <FileActions
              isActive={selectedIds.length > 0}
              onClickShare={onClickShare}
              onClickRemove={onClickRemove}
            />}
            <FileList items={files} onFileSelect={onFileSelect} />
          </>
        ) : (
          <Empty className='empty-block' description="File list is empty!" />
        )
      }
    </>
  );
}