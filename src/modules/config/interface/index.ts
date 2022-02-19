export type ConfigOptions = {
  /**
   * whether load env file
   * @default true
   */
  loadEnvFile?: boolean
  /**
   * folder path of env files
   * @default `${process.cwd()}/config`
   */
  folderPath?: string
  /**
   * should be global module
   * @default true
   */
  isGlobal?: boolean
}

export type Config = NodeJS.ProcessEnv
