import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { AuthJwtPayload } from './entities/auth-payload.entityy';

@Resolver()
export class AuthResolver { 
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthJwtPayload)
  async signIn(@Args('signInput') signInInput: SignInInput) {
    const user = await this.authService.validateUser(signInInput);

    if (!user) {
      throw new Error('Authentication failed');
    }

    return await this.authService.signIn(user); 
  }
}
