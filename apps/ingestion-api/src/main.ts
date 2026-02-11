import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { IngestionApiModule } from './ingestion-api.module';

async function bootstrap() {
  const app = await NestFactory.create(IngestionApiModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // reject extra fields
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
