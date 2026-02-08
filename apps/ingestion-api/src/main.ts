import { NestFactory } from '@nestjs/core';
import { IngestionApiModule } from './ingestion-api.module';

async function bootstrap() {
  const app = await NestFactory.create(IngestionApiModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
