import { User } from '../../graphql-types/objects/user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
}

export const IUserRepositoryToken = Symbol('IUserRepository');
