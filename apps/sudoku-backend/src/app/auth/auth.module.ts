import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { createSecretKey, randomBytes } from 'crypto';
import { JwtStrategy } from './jwt.strategy';

function generateSecret() {
  const rndInit = randomBytes(256);
  const secretKey = createSecretKey(rndInit);
  process.env.jwtSecret = secretKey.export().toString('base64');
  return process.env.jwtSecret;
}

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: generateSecret(),
      signOptions: { expiresIn: '3600s' },
    })
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [
    AuthController
  ],
  exports:[
    UserService
  ]
})
export class AuthModule {}
