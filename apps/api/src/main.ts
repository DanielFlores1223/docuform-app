import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.setGlobalPrefix('docuform/api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {enableImplicitConversion: true} 
    })
  );
  
  app.use(morgan('short'))

  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('DocumForm API')
    .setDescription(`
        The Docuform API is a powerful and intuitive RESTful service designed to convert PDF 
        documents into dynamic, fully customizable forms. It enables users to quickly extract data and 
        create forms that meet specific needs with ease. The API is built to be flexible, scalable, and 
        easy to integrate into various applications.
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docuform/api', app, document);

  await app.listen(process.env.PORT);

}
bootstrap();
