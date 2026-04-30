export interface Size {
  id: number;      // this is productSizeId in the backend
  name: string;    // "Small", "Large", etc.
  price: number;   // full price for this size (no modifier — matches backend)
}
