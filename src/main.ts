import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // CREATE APP
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });
  app.enableCors({ credentials: true, origin: true });

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Cloud Storage REST API')
    .setDescription('rest api server')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // RUN
  await app.listen(3000);
}
bootstrap();
