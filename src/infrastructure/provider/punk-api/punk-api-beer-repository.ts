
import { Beer } from "../../../domain/entity/beer";
import { BeerRepository } from "../../../domain/repository/beer-repository";
import axios, { AxiosInstance } from "axios";

export class PunkAPIBeerRepository implements BeerRepository {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({baseURL:"https://api.punkapi.com/v2/"});
  }

  async getAllBeers(): Promise<Beer[]> {
      const {data} = await this.http.get("/");
    }
  }

