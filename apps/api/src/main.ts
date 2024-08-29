import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('docuform/api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT);

}
bootstrap();
