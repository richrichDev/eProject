export interface Customer {
    id: number;
    name: string;
    address: {
      country: string,
      city: string, 
      street: string
    };
}