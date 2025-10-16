import { z } from 'zod';

/**
 * Transfer Money Form Data Schema
 * - recipientEmail: required string (email address)
 * - amount: required string (monetary amount)
 * - currency: optional string (defaults to USD)
 * - confirmed: optional boolean
 */
export const makeAPaymentFormSchema = {
  type: 'object',
  properties: {
    recipientEmail: {
      type: 'string',
      description: 'Email address of the recipient (required)',
    },
    amount: {
      type: 'string',
      description: 'Amount to transfer (required)',
    },
    currency: {
      type: 'string',
      description: 'Currency code (e.g., USD, EUR). Defaults to USD',
    },
    confirmed: {
      type: 'boolean',
      description: 'Whether the user has confirmed the transfer details',
    },
  },
  required: ['recipientEmail', 'amount'],
  additionalProperties: false,
} as const;

export const makeAPaymentFormParser = z.object({
  recipientEmail: z.string().email(),
  amount: z.string(),
  currency: z.string().optional().default('USD'),
  confirmed: z.boolean().optional(),
});
