import { z } from 'zod';

/**
 * Contact form validation schema
 * Validates user input for the contact form according to requirements 5.3 and 5.4
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  service: z
    .string()
    .min(1, 'Please select a service'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

/**
 * Type inference for contact form data
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;
