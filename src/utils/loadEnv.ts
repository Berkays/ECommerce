import { config } from 'dotenv';
import * as path from 'path';

const nodeEnv = process.env.ENV_FILE || 'development';
console.log('USING ENV_FILE:' + nodeEnv);
const envFilePath = path.resolve(__dirname, `../../env/${nodeEnv}.env`);
config({ path: envFilePath });
