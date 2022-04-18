import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(ApplicationModule, appOptions);

  const options = new DocumentBuilder()
    .setTitle('后端文档') // 文档标题
    .setDescription('The Real world API description') // 文档描述
    .setVersion('1.0') // 文档版本
    .addBearerAuth() // 鉴权，可以输入token
    .build(); // 创建
  // 创建swagger
  const document = SwaggerModule.createDocument(app, options);
  // 启动swagger
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
