import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract create(user: User): Promise<{ createdId: string }>
  abstract findByEmail(email: string): Promise<User | null>
}
