import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../repositories/interfaces/interface.user.repository';
import { User } from '../graphql-types/objects/user.model';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
