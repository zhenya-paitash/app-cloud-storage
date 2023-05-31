import { Extension } from "./getColorByExtension"

export const getExtensionFromFileName = (filename: string): Extension => {
  return filename.split('.').pop() as Extension;
}