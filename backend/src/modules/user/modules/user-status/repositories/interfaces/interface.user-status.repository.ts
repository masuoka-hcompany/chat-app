import { UserStatus } from '../../graphql-types/user-status.model';

export interface IUserStatusRepository {
  findById(userId: string): Promise<UserStatus | null>;
}

export const IUserStatusRepositoryToken = Symbol('IUserStatusRepository');
