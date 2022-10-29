import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GamerModule } from './gamer/gamer.module';

@Module({
  imports: [UserModule, GamerModule]
})
export class ServerModule {}
