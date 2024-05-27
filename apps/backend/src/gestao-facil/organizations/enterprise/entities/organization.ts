import { Entity } from '@/core/domain/entities/entity'
import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { OrganizationMembersList } from './organization-members-list'
import { Slug } from './value-objects/slug'

export interface OrganizationProps {
  ownerId: UniqueEntityID
  name: string
  slug: Slug
  createdAt: Date
  updatedAt: Date
  members: OrganizationMembersList
}

export class Organization extends Entity<OrganizationProps> {
  overwriteId(newId: string) {
    this.id = new UniqueEntityID(newId)
  }

  get ownerId() {
    return this.props.ownerId
  }

  get name() {
    return this.props.name
  }

  set name(input: string) {
    this.props.name = input
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get members() {
    return this.props.members
  }

  static create(
    props: Optional<OrganizationProps, 'createdAt' | 'updatedAt' | 'members'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Organization(
      {
        ...props,
        members: props.members ?? new OrganizationMembersList(),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}
