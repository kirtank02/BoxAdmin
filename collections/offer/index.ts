import type { CollectionConfig } from 'payload';

const Offers: CollectionConfig = {
  slug: 'offers',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        try {
          // validation or business logic here
          return data;
        } catch (error) {
          console.error('Offers beforeChange hook error:', error);
          throw error;
        }
      },
    ],
  },
  fields: [
    {
      name: 'venue_id',
      label: 'Venue',
      type: 'relationship',
      relationTo: 'venues',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'offer_type',
      type: 'text',
    },
    {
      name: 'discount_value',
      type: 'number',
    },
    {
      name: 'min_booking_amount',
      type: 'number',
    },
    {
      name: 'valid_from',
      type: 'date',
    },
    {
      name: 'valid_to',
      type: 'date',
    },
    {
      name: 'is_active',
      type: 'checkbox',
      defaultValue: true,
    },
  
  ],
};

export default Offers;
