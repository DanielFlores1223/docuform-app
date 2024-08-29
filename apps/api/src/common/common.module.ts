import { Module } from '@nestjs/common';
import { EncryptService } from './services';

@Module({
    providers: [EncryptService],
    exports: [EncryptService]
})
export class CommonModule {}
