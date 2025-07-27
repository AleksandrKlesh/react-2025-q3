export interface Character {
  id: number;
  name: string;
  species?: string;
  gender?: string;
  image?: string;
  status?: string;
  type?: string;
  origin?: Origin;
  location?: Location;
}

export interface Info {
  pages: number;
}

export interface Response {
  info: Info;
  results: Character[];
}

interface Origin {
  name?: string;
}

interface Location {
  name?: string;
}
