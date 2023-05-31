import * as auth from './auth';
import * as files from './files'
const Api = {
  auth,
  files,
}

export default Api;
export * from './dto/auth.dto';
export * from './dto/files.dto'