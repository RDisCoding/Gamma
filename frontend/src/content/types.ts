export interface Review {
  id: string;
  clientName: string;
  reviewText: string;
  /** Where the review was originally given. */
  source: string | null;
  /** Only reviews with confirmed origin and publishing permission are shown. */
  verified: boolean;
}
