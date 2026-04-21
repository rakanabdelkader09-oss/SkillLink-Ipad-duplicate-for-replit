import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.skilllink.app',
  appName: 'SkillLink',
  webDir: 'build',
  ios: {
    allowsLinkPreview: false,
    scrollEnabled: true
  },
  server: {
    allowNavigation: ['*.youtube.com', 'img.youtube.com', '*.youtube-nocookie.com']
  }
};
export default config;