import Selecto from 'react-selecto'

import { FileItem } from "@api"
import { FileCard } from "@components"

import styles from './FileList.module.scss'

export type FileSelectType = 'select' | 'unselect';

interface FileListProps {
  items: FileItem[]
  onFileSelect: (id: number, type: FileSelectType) => void;
}

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  return (
    <div className={styles.root}>
      {items.map((item: FileItem) => (
        <div key={item.id} className="file" data-id={item.id}>
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}

      {/* TODO */}
      <Selecto
        container={".files"}
        selectableTargets={['.file']}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={['shift']}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach(el => {
            el.classList.add('active')
            onFileSelect(Number(el.dataset['id']), 'select')
          })
          e.removed.forEach(el => {
            el.classList.remove('active')
            onFileSelect(Number(el.dataset['id']), 'unselect')
          })
        }}
      />
    </div>
  )
}