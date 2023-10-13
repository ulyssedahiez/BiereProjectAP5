import { Beer } from "../../../domain/entity/beer";

export class punkAPIBeerDeserializer {
  public static deserialize(source: any): Beer {
    const {id, name, description} = source;
    const myBeer = new Beer({id, name, description, url, abv, ibu, couleurB});
    myBeer.description = description;
    return myBeer;
    
  }
}