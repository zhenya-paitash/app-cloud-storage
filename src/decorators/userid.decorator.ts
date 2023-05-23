import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/* This code is creating a custom parameter decorator called `UserId` using the
`createParamDecorator` function from the `@nestjs/common` package. */
export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id ? Number(request.user.id) : null;
  },
);
