import { User } from '@/src/entities/User';

export interface Methods {
  get: {
    response: Omit<User, 'password'>;
  };
}
