import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codearena.app',
  appName: 'CodeArena',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
