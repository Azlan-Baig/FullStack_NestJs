import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Post])
  posts: Post[];
  
  @Field(() => [CommentEntity])
  comments: CommentEntity[];

}


