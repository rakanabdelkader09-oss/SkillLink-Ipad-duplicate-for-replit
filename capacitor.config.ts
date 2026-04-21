import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.skilllink.app',
  appName: 'SkillLink',
  webDir: 'dist',
  ios: {
    allowsLinkPreview: false,
    scrollEnabled: true,
    allowsInlineMediaPlayback: true,
    mediaTypesRequiringUserActionForPlayback: '',
    limitsNavigationsToAppBoundDomains: false,
  },
  server: {
    allowNavigation: [
      '*.youtube.com',
      'www.youtube.com',
      'youtube.com',
      'img.youtube.com',
      '*.youtube-nocookie.com',
      'youtu.be',
    ],
  },
};

export default config;
