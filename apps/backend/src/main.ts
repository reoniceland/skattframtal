import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { BackendModule } from './backend.module'

async function bootstrap() {
  const app = await NestFactory.create(BackendModule)

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL!,
      'https://skattframtal-test-app.vercel.app',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  })

  const config = new DocumentBuilder()
    .setTitle('Ísland.is Skattaframtal API')
    .setDescription('API fyrir Skattaframtal á Ísland.is')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0')
}

// eslint-disable-next-line
bootstrap()
