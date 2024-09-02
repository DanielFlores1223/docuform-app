import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptService {
    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
      }
    
      async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
      }
}