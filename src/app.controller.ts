import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redirection')
  redirectUrl(@Query('link') link: string, @Res() res: Response) {
    if (!link) {
      return res.status(400).send('URL de destino no proporcionada.');
    }

    try {
      // Decodifica la URL
      const normalizedUrl = this.normalizeUrl(link);

      console.log(normalizedUrl);

      // Verifica si la URL tiene un esquema (http o https)
      if (
        !normalizedUrl.startsWith('http://') &&
        !normalizedUrl.startsWith('https://')
      ) {
        return res.redirect(`https://${normalizedUrl}`);
      }

      // Redirige a la URL completa
      return res.redirect(normalizedUrl);
    } catch (error) {
      return res.status(400).send('Error al decodificar la URL.');
    }
  }

  // Función para normalizar la URL
  private normalizeUrl(url: string): string {
    return (
      url
        .replace(/%E1/g, 'á') // a con acento
        .replace(/%E9/g, 'é') // e con acento
        .replace(/%ED/g, 'í') // i con acento
        .replace(/%F3/g, 'ó') // o con acento
        .replace(/%FA/g, 'ú') // u con acento
        .replace(/%F1/g, 'ñ') // ñ minúscula
        .replace(/%D1/g, 'Ñ') // Ñ mayúscula
        .replace(/%20/g, ' ') // Espacios
        .replace(/%2F/g, '/') // Slash
        .replace(/%3A/g, ':') // Dos puntos
        .replace(/%2C/g, ',') // Comas
        .replace(/%3F/g, '?') // Signo de interrogación
        .replace(/%3D/g, '=') // Signo igual
        .replace(/%21/g, '!') // Signo de exclamación
        .replace(/%27/g, "'") // Comilla simple
        .replace(/%28/g, '(') // Paréntesis izquierdo
        .replace(/%29/g, ')') // Paréntesis derecho
        // Manejo de mayúsculas acentuadas
        .replace(/%C1/g, 'Á') // A con acento
        .replace(/%C9/g, 'É') // E con acento
        .replace(/%CD/g, 'Í') // I con acento
        .replace(/%D3/g, 'Ó') // O con acento
        .replace(/%DA/g, 'Ú') // U con acento
      // Agrega más reemplazos según sea necesario
    );
  }
}
