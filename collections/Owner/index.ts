import { CollectionConfig } from 'payload';

const OwnerOrganizations: CollectionConfig = {
  slug: 'owner_organizations',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,  // allow public create
    read: () => true,    // allow public read (optional)
    update: () => true,  // allow public update (optional, be careful)
    delete: () => true,  // allow public delete (optional, be careful)
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'password_hash',
      type: 'text',
      required: true,
      // admin: {
      //   readOnly: true,
      // },
    },
    {
      name: 'calcom_org_id',
      type: 'text',
    },
  ],
};

export default OwnerOrganizations;
