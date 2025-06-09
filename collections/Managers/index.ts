import type { CollectionConfig } from 'payload'

export const Managers: CollectionConfig = {
  slug: 'managers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'created_by',
      type: 'relationship',
      relationTo: 'owner_organizations',
      required: true,
    },
  ],
}