import { Beer } from "../entity/beer";


export interface BeerRepository {
  getAllBeers(): Promise<Beer[]>;
}