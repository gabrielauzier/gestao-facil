import { Member } from '../../enterprise/entities/member'

export abstract class MembersRepository {
  abstract findMembership(
    userId: string,
    organizationId: string,
  ): Promise<Member | null>

  abstract createMany(members: Member[]): Promise<void>
  abstract deleteMany(members: Member[]): Promise<void>
}
