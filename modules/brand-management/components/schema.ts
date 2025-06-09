import * as z from "zod";

export const brandFormSchema = z.object({
  brandLogo: z.string().optional(),
  coverImage: z.string().optional(),
  themeColors: z.object({
    base: z.string(),
    lighter1: z.string(),
    lighter2: z.string(),
    darker: z.string(),
  }),
  fontFamily: z.string().min(1, "Please select a font family"),
});

export const fontFamilies = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'lato', label: 'Lato' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'sourcesans', label: 'Source Sans Pro' },
  { value: 'raleway', label: 'Raleway' },
  { value: 'nunito', label: 'Nunito' },
]; 