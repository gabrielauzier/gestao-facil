import { Organization } from '../../enterprise/entities/organization'

export abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<{ createdId: string }>
  abstract save(organization: Organization): Promise<void>
  abstract findByOwnerId(ownerId: string): Promise<Organization | null>
  abstract findById(organizationId: string): Promise<Organization | null>
}
