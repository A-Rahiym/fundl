export type PostJobFieldKey =
  | 'title'
  | 'description'
  | 'category'
  | 'location'
  | 'budgetMin'
  | 'budgetMax'
  | 'preferredDate'

export interface PostJobFieldConfig {
  key: PostJobFieldKey
  inputType: 'text' | 'textarea' | 'number' | 'date'
  labelKey: string
  errorKey?: string
  rangeErrorKey?: string
  required?: boolean
  min?: number
}

/** Post-a-job form field metadata (§7.8): labels + validation keys per field. */
export const POST_JOB_FIELDS = {
  title: { key: 'title', inputType: 'text', labelKey: 'postJob.jobTitle', errorKey: 'postJob.errTitle', required: true },
  description: { key: 'description', inputType: 'textarea', labelKey: 'postJob.description', errorKey: 'postJob.errDescription', required: true },
  category: { key: 'category', inputType: 'text', labelKey: 'postJob.category', errorKey: 'postJob.errCategory', required: true },
  location: { key: 'location', inputType: 'text', labelKey: 'postJob.location' },
  budgetMin: { key: 'budgetMin', inputType: 'number', labelKey: 'postJob.budgetMin', errorKey: 'postJob.errBudget', min: 0 },
  budgetMax: { key: 'budgetMax', inputType: 'number', labelKey: 'postJob.budgetMax', errorKey: 'postJob.errBudget', rangeErrorKey: 'postJob.errBudgetRange', min: 0 },
  preferredDate: { key: 'preferredDate', inputType: 'date', labelKey: 'postJob.preferredDate' },
} as const satisfies Record<PostJobFieldKey, PostJobFieldConfig>
