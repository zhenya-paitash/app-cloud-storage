import { getColorByExtension, getExtensionFromFileName, isImage } from '@utils';

import styles from './FileCard.module.scss'
import { FileTextOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface FileCardProps {
  filename: string;
  originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({ originalName, filename }) => {
  const ext = getExtensionFromFileName(filename);
  const extIsImage = isImage(ext)
  const imageUrl = ext && extIsImage ? `http://localhost:3000/uploads/${filename}` : '';
  const color = getColorByExtension(ext);
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className="classColor">{ext}</i>
        {
          extIsImage ? (
            // <Image className={styles.image} src={imageUrl} alt="file" />
            <img className={styles.image} src={imageUrl} alt="file" />
          ) : <FileTextOutlined />
        }
      </div>
      <span>{originalName}</span>
    </div>
  );
}