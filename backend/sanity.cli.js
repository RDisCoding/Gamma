import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6j14bhax',
    dataset: 'production'
  },
  deployment: {
    appId: 'lp50ud5ncm8nlsajc8f51yfr',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
