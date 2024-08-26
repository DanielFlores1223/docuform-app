import 'dotenv/config';
import { get } from 'env-var';
import { EnvsVariables } from '../interfaces';

export default (): EnvsVariables => ({
  DB_PORT: get('DB_PORT').required().asPortNumber(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_USER: get('DB_USER').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),
  DB_HOST: get('DB_HOST').required().asString(),
});
