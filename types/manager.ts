export interface Manager {
   id: string;
   name: string;
   email: string;
   role: string;
   status: boolean;
   assignedVenues?: string[];
   createdAt: Date;
   updatedAt: Date;
} 