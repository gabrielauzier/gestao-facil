import { WatchedList } from '@/core/domain/entities/watched-list'

import { Member } from './member'

export class OrganizationMembersList extends WatchedList<Member> {
  compareItems(a: Member, b: Member): boolean {
    return a.userId.equals(b.userId)
  }
}
