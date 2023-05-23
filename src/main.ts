import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  /* This code is creating a NestJS application instance and configuring it with some
  settings. */
  // ? CREATE APP
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });
  app.setGlobalPrefix('api/v1');
  app.enableCors({ credentials: true, origin: true });
  app.use('/uploads', express.static(resolve(__dirname, '../uploads')));

  /* This code is configuring and setting up Swagger documentation for the NestJS
  application. Swagger is a tool that helps to document and test APIs. */
  // ? SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Cloud Storage API')
    .setDescription(
      '<i>Cloud Storage Test Application.<br/>REST API server<br/><br/><a href="https://github.com/zhenya-paitash/app-cloud-storage.git">github</a></i>',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  /* Starting the NestJS application and listening for incoming requests on port
  3000. This line of code is responsible for running the application and making
  it available to clients who want to interact with the API. */
  // ? RUN
  await app.listen(3000);
}
bootstrap();
