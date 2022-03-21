import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { types } from 'pg';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Core Bank - API')
    .setVersion('1.0')
    .addTag('Bank')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Bank Core API',
  });
  app.useGlobalPipes(new ValidationPipe());

  // parser to postgres numeric values
  types.setTypeParser(1700, (x) => parseFloat(x));
  await app.listen(3000);
  logger.log(`Server start at port ${3000}`);
}
bootstrap();
