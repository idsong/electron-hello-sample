const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const {resolve, win32} = require('path');

module.exports = {
  packagerConfig: {
    asar: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'QuickConfig',
        setupExe: 'QuickConfigSetup.exe',
        certificateFile: resolve(__dirname, 'certs/certificates.pfx'),
        certificatePassword: '123456'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      // platforms: ['darwin', 'win32'],
      platforms: []
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [{
    name: '@electron-forge/publisher-github',
    config: {
      repository: {
        owner: 'idSong',
        name: 'electron-hello-sample'
      },
      authToken: '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',
      // authToken: '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', 
      prerelease: true,
      draft: true
    },

  }]
};
