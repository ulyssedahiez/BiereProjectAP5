type BeerDependencies = {
  id: number;
  name: string;
  description: string;
  url: string;
  abv: number;
  ibu: number;
  couleurB: string;
};

export class Beer {
  public id: number;
  public name: string;
  public description?: string; // ? pour dire que c'est soit remplie soit undefined
  public url: string;
  public abv: number;
  public ibu: number;
  public couleurB: string;

  constructor({ id, name, description, url, abv, ibu, couleurB }: BeerDependencies) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.abv = abv;
    this.ibu = ibu;
    this.couleurB = couleurB;
  }
}
