import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class UtilsService {
  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, 10)
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash)
  }
}
