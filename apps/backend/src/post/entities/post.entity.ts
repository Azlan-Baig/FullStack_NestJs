import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field()
  description: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => User)
  author: User;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [CommentEntity])
  comments: CommentEntity[];

  @Field(() => [Like])
  likes: Like[];

  @Field(() => Int)
  authorId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
