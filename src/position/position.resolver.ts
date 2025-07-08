import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PositionService } from './position.service';
import { Position } from './entities/position.entity';
import { CreatePositionInput } from './dto/create-position.input';

@Resolver(() => Position)
export class PositionResolver {
  constructor(private readonly positionService: PositionService) {}

  @Query(() => [Position])
  positions() {
    return this.positionService.findAll();
  }

  @Mutation(() => Position)
  createPosition(@Args('data') data: CreatePositionInput) {
    return this.positionService.create(data);
  }

  @Mutation(() => Boolean)
  deletePosition(@Args('id', { type: () => Int }) id: number) {
    return this.positionService.delete(id).then(() => true);
  }

  @Mutation(() => Position)
updatePosition(
  @Args('id', { type: () => Int }) id: number,
  @Args('data') data: CreatePositionInput,
) {
  return this.positionService.update(id, data);
}
}