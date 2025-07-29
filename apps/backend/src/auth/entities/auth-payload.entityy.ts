import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthJwtPayload {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar: string;

  @Field()
  accessToken: string;
}
