import axios from '@core'
import { FileItem, FileType } from '@api'

export const getAll = async (type: FileType = FileType.ALL): Promise<FileItem[]> => {
  return (await axios.get(`/files?type=${type}`)).data;
}

export const remove = (ids: number[]): Promise<void> => {
  return axios.delete(`/files?ids=${ids}`);
}

export const uploadFile = async (options: any): Promise<void> => {
  const { onSuccess, onError, onProgress, file } = options;

  const formData = new FormData()
  formData.append('file', file)
  
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 })
    },
  }

  try {
    const { data } = await axios.post('/files', formData, config);
    onSuccess();
  } catch (err) {
    onError({ err })
  }
}
