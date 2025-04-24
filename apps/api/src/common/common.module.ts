import { Module } from '@nestjs/common';
import { EncryptService, SlugService } from './services';

@Module({
    providers: [EncryptService, SlugService],
    exports: [EncryptService, SlugService]
})
export class CommonModule {}
