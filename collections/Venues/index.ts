import type { CollectionConfig } from 'payload'

const Venues: CollectionConfig = {
  slug: 'venues',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'owner_org',
      type: 'relationship',
      relationTo: 'owner_organizations',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'lat',
      type: 'number',
      required: true,
    },
    {
      name: 'lng',
      type: 'number',
      required: true,
    },
    {
      name: 'full_address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
    },
    {
      name: 'calcom_team_id',
      type: 'text',
    },
  ],
  access: {
    create: () => true,  
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  timestamps: true,
};

export default Venues;