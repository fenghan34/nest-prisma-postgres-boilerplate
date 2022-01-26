export type ConfigOptions = {
  /**
   * whether load env file
   * @default true
   */
  loadEnvFile: boolean
  /**
   * folder path of env files
   * @default `${process.cwd()}/config`
   */
  folderPath: string
}

export type EnvConfig = NodeJS.ProcessEnv
