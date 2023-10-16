
import { Beer } from "../../../domain/entity/beer";
import { BeerRepository } from "../../../domain/repository/beer-repository";
import { PunkAPIBeer } from "./interface/punkapi-beer";
import { punkAPIBeerDeserializer } from "./punk-api-beer-deserializer";
import axios, { AxiosInstance } from "axios";

export class PunkAPIBeerRepository implements BeerRepository {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({baseURL:"https://api.punkapi.com/v2/"});
  }

  async getAllBeers(): Promise<Beer[]> {
    try {

      const {data} = await this.http.get<PunkAPIBeer[]>("/beers");
      if(!data?. length){
        return [];
      }
      return data.map((punkApiBeer: any) => punkAPIBeerDeserializer.deserialize(punkApiBeer));
      
    }catch(err){
      return [];
    }
      
    }
  }

