import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => CommentEntity)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}


}
