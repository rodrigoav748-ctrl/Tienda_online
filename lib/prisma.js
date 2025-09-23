// lib/prisma.js

import { PrismaClient } from './generated/prisma';

// Se declara la variable global de Prisma
let prisma;

// En producción se crea una sola instancia.
// En desarrollo, se crea una instancia global para que Next.js no cree múltiples.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;