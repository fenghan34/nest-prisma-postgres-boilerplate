import path from 'path'

export const isDev = process.env.NODE_ENV === 'development'

export const configFolderPath = path.resolve(__dirname, '../config')

export enum InjectionTokens {
  CONFIG_OPTIONS = 'CONFIG_OPTIONS',
}
