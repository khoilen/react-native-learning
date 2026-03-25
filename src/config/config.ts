import configEnv from 'react-native-config';

export type AppConfig = {
  API_BASE: string;
  ENV: 'sbx' | 'dev' | 'test' | 'pre' | 'prod';
};

const Config: AppConfig = {
  ENV: configEnv.ENV as AppConfig['ENV'],
  API_BASE: configEnv.API_BASE!,
};

export default Config;
