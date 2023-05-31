export const isImage = (ext: string): boolean => {
  const images: string[] = ['jpg', 'jpeg', 'png', 'gif']
  return images.includes(ext)
}