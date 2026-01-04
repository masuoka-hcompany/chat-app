import { User } from '../../graphql-types/objects/user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<User | null>;
  createUserWithAccount(data: {
    email: string;
    image?: string;
    provider: string;
    providerAccountId: string;
  }): Promise<User>;
  addAccountToUser(
    userId: string,
    provider: string,
    providerAccountId: string,
  ): Promise<User>;
}

export const IUserRepositoryToken = Symbol('IUserRepository');
