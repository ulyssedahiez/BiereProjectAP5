import { Beer } from "../../../domain/entity/beer";
import { BeerColorIntensity } from "../../../domain/entity/beer-color-intensity";

const beerColorIntensityMappingWithEuropeanBreweryConvention = 
[
  {threshold: 138, intensity: BeerColorIntensity.IMPERIAL_STOUT},
  {threshold: 79, intensity: BeerColorIntensity.EXPORT_STOUT},
  {threshold: 69, intensity: BeerColorIntensity.BALTIC_PORTER},
  {threshold: 57, intensity: BeerColorIntensity.STOUT} ,
  {threshold: 47, intensity: BeerColorIntensity.PORTER} ,
  {threshold: 39, intensity: BeerColorIntensity.DUNKEL} ,
  {threshold: 33, intensity: BeerColorIntensity.AMBER} ,
  {threshold: 26, intensity: BeerColorIntensity.GARDE} ,
  {threshold: 20, intensity: BeerColorIntensity.GARDE},
  {threshold: 16, intensity: BeerColorIntensity.GARDE},
  {threshold: 12, intensity: BeerColorIntensity.GARDE},
  {threshold: 8, intensity: BeerColorIntensity.GARDE} ,
  {threshold: 6, intensity: BeerColorIntensity.GARDE} ,
  {threshold: 4, intensity: BeerColorIntensity.GARDE} ,

];

export class punkAPIBeerDeserializer {
  public static deserialize(source: any): Beer {

    const {id, name, description,url, abv, ibu, ebc} = source;

    const myBeer = new Beer({id, name});

    myBeer.description = description;
    myBeer.url = url;
    myBeer.abv = abv;
    myBeer.ibu = ibu;
    myBeer.couleurB = this.deserializeBeerColorIntensity(ebc);

    return myBeer;
  }
  public static deserializeBeerColorIntensity(EuropeanBreweryConvention: number): BeerColorIntensity {
    for(const{threshold, intensity} of beerColorIntensityMappingWithEuropeanBreweryConvention){
      if(EuropeanBreweryConvention >= threshold){
        return intensity;
      }
    }
    return BeerColorIntensity.UNKNOWN;
}
}