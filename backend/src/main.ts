import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  app.enableCors({
    origin: 'http://localhost:3201', // Next.jsのURL
    credentials: true,
  });
  await app.listen(3200);
}
bootstrap();
