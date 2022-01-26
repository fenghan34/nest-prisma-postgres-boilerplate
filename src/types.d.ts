/// <reference types="jest-extended" />

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'test'
    DATABASE_URL?: string
  }
}
