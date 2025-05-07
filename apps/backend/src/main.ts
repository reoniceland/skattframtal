import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { BackendModule } from './backend.module'

async function bootstrap() {
  const app = await NestFactory.create(BackendModule)
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
