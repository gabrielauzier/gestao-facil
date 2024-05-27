import { Entity } from '@/core/domain/entities/entity'
import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'

export interface MemberProps {
  userId: UniqueEntityID
  organizationId: UniqueEntityID
  role: string
}

export class Member extends Entity<MemberProps> {
  overwriteId(newId: string) {
    this.id = new UniqueEntityID(newId)
  }

  get userId() {
    return this.props.userId
  }

  get organizationId() {
    return this.props.organizationId
  }

  get role() {
    return this.props.role
  }

  static create(props: MemberProps, id?: UniqueEntityID) {
    const member = new Member(props, id)

    return member
  }
}
