import { BeerColorIntensity } from './beer-color-intensity';

export type BeerDependencies = {
  id: number;
  name: string;
};

export class Beer {
  public id: number;
  public name: string;
  public description?: string; // ? pour dire que c'est soit remplie soit undefined
  public url?: string;
  public abv = 0; //alcohol by volume
  public ibu = 0; // bitterness Unit
  public couleurB? : BeerColorIntensity;

  constructor({ id, name}: BeerDependencies) {
    this.id = id;
    this.name = name;
  }
}
