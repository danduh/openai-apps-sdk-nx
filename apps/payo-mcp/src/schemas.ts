import { z } from 'zod';

/**
 * Bank Account Form Data Schema
 * - bankName: optional string
 * - accountHolder: required string
 * - accountNumber: optional string
 * - swiftBic: optional string
 * - confirmed: optional boolean
 */
export const makeAPaymentFormSchema = {
  type: 'object',
  properties: {
    bankName: {
      type: 'string',
      description: 'Name of the bank',
    },
    accountHolder: {
      type: 'string',
      description: 'Name of the account holder (required). Person name',
    },
    accountNumber: {
      type: 'string',
      description: 'Bank account number',
    },
    swiftBic: {
      type: 'string',
      description: 'SWIFT/BIC code for international transfers',
    },
    confirmed: {
      type: 'boolean',
      description: 'Whether the user has confirmed the bank account details',
    },
  },
  required: ['accountHolder'],
  additionalProperties: false,
} as const;

export const makeAPaymentFormParser = z.object({
  bankName: z.string().optional(),
  accountHolder: z.string(),
  accountNumber: z.string().optional(),
  swiftBic: z.string().optional(),
  confirmed: z.boolean().optional(),
});
