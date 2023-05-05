export class Games {
  id?: string;
  name?: string;
  image?: string;
  about?: string;
  classification?: string;
  developers?: string;
  editors?: string;
  franchise?: string;
  game_modes?: string;
  release_date?: any;
  publication_date?: any;
  categories?: Category[];
  platforms?: Platform[];

  lang_interface?: string;
  lang_subtitles?: string;
  lang_voices?: string;

  req_min_so?: string;
  req_min_directx?: string;
  req_min_graphic_card?: string;
  req_min_network?: string;
  req_min_ram?: string;
  req_min_storage?: string;

  req_rec_so?: string;
  req_rec_directx?: string;
  req_rec_graphic_card?: string;
  req_rec_network?: string;
  req_rec_ram?: string;
  req_rec_storage?: string;

  published?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {

  }
}

export class Category {
  id?: string;
  name: string;
  total: number;

  constructor(
    name: string,
    total: number
  ) {
    this.name = name;
    this.total = total
  }
}

export class Platform {
  id?: string;
  name?: string;
  total?: number;
}
