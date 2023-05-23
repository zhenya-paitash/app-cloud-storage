import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * This is a constructor function that takes an AuthService parameter and sets the
   * usernameField property to 'email' for a parent class.
   *
   * @param authService The `authService` parameter is an instance of the
   * `AuthService` class that is being injected into the constructor of the class
   * that contains this code. This is a common pattern in Angular applications where
   * services are injected into components or other services to provide functionality
   * and data. The `AuthService` likely provides methods
   */
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * This function validates a user's email and password and returns the user if they
   * are authenticated, otherwise it throws an UnauthorizedException.
   *
   * @param email A string representing the email address of the user trying to log
   * in.
   * @param password The `password` parameter is a string that represents the
   * password entered by the user during the login process.
   * @return the user object if the user is validated successfully.
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong login or password');
    }

    return user;
  }
}
