import { FileUpload } from "./file-upload.model";

export class Games {
  id?: string;
  name!: string;
  images!: string[];
  youtube_links!: string[];
  about!: string;
  classification!: Classification;
  classification_descriptors!: ClassificationDescriptors[];
  developers!: string;
  editors!: string;
  franchise!: string;
  game_modes!: GameModes[];
  release_date!: any;
  publication_date!: any;
  categories!: Category[];
  platforms!: Platform[];
  operative_systems!: OperativeSystem[];

  lang_interface?: Languages[];
  lang_subtitles?: Languages[];
  lang_voices?: Languages[];

  windows_req_min_so?: string;
  windows_req_min_processor?: string;
  windows_req_min_directx?: string;
  windows_req_min_graphic_card?: string;
  windows_req_min_network?: string;
  windows_req_min_ram?: string;
  windows_req_min_storage?: string;

  windows_req_rec_so?: string;
  windows_req_rec_processor?: string;
  windows_req_rec_directx?: string;
  windows_req_rec_graphic_card?: string;
  windows_req_rec_network?: string;
  windows_req_rec_ram?: string;
  windows_req_rec_storage?: string;

  mac_req_min_so?: string;
  mac_req_min_processor?: string;
  mac_req_min_directx?: string;
  mac_req_min_graphic_card?: string;
  mac_req_min_network?: string;
  mac_req_min_ram?: string;
  mac_req_min_storage?: string;

  mac_req_rec_so?: string;
  mac_req_rec_processor?: string;
  mac_req_rec_directx?: string;
  mac_req_rec_graphic_card?: string;
  mac_req_rec_network?: string;
  mac_req_rec_ram?: string;
  mac_req_rec_storage?: string;

  linux_req_min_so?: string;
  linux_req_min_processor?: string;
  linux_req_min_directx?: string;
  linux_req_min_graphic_card?: string;
  linux_req_min_network?: string;
  linux_req_min_ram?: string;
  linux_req_min_storage?: string;

  linux_req_rec_so?: string;
  linux_req_rec_processor?: string;
  linux_req_rec_directx?: string;
  linux_req_rec_graphic_card?: string;
  linux_req_rec_network?: string;
  linux_req_rec_ram?: string;
  linux_req_rec_storage?: string;

  published?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
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

export class Classification {
  public static classification = [
    { id: '1', title: 'EVERYONE', image: '../../environments/ESRB svg/Everyone_SP.svg' },
    { id: '2', title: 'EVERYONE 10+', image: '../../environments/ESRB svg/Everyone10_SP.svg' },
    { id: '3', title: 'TEEN', image: '../../environments/ESRB svg/Teen_SP.svg' },
    { id: '4', title: 'MATURE', image: '../../environments/ESRB svg/Mature_SP.svg' },
    { id: '5', title: 'ADULTS ONLY', image: '../../environments/ESRB svg/Adult_SP.svg' },
    { id: '6', title: 'RATING PENDING', image: '../../environments/ESRB svg/RatingPending_Spanish-1.svg' },
    { id: '7', title: 'RATING PENDING - Likely Mature 17+', image: '../../environments/ESRB svg/RP-LM17-Spanish.svg' }
  ];
}

export class ClassificationDescriptors {
  public static classification_descriptors = [
    { id: '1', content: 'ALCOHOL REFERENCE' },
    { id: '2', content: 'ANIMATED BLOOD' },
    { id: '3', content: 'BLOOD' },
    { id: '4', content: 'BLOOD AND GORE' },
    { id: '5', content: 'COMIC MISCHIEF' },
    { id: '6', content: 'CRUDE HUMOR' },
    { id: '7', content: 'DRUG REFERENCE' },
    { id: '8', content: 'FANTASY VIOLENCE' },
    { id: '9', content: 'GAMBLING THEMES' },
    { id: '10', content: 'MILD LANGUAGE' },
    { id: '11', content: 'LYRICS' },
    { id: '12', content: 'MATURE HUMOR' },
    { id: '13', content: 'NUDITY' },
    { id: '14', content: 'PARTIAL NUDITY' },
    { id: '15', content: 'REAL GAMBLING' },
    { id: '16', content: 'SEXUAL CONTENT' },
    { id: '17', content: 'SEXUAL THEMES' },
    { id: '18', content: 'SEXUAL VIOLENCE' },
    { id: '19', content: 'SIMULATED GAMBLING' },
    { id: '20', content: 'STRONG LANGUAGE' },
    { id: '21', content: 'STRONG LYRICS' },
    { id: '22', content: 'STRONG SEXUAL CONTENT' },
    { id: '23', content: 'SUGGESTIVE THEMES' },
    { id: '24', content: 'TOBACCO REFERENCE' },
    { id: '25', content: 'USE OF ALCOHOL' },
    { id: '26', content: 'USE OF DRUGS' },
    { id: '27', content: 'USE OF TOBACCO' },
    { id: '28', content: 'VIOLENCE' },
    { id: '29', content: 'VIOLENT REFERENCES' },
    { id: '30', content: 'IN-GAME PURCHASES' },
    { id: '31', content: 'USERS INTERACT' },
    { id: '32', content: 'SHARES LOCATION' },
    { id: '33', content: 'UNRESTRICTED INTERNET' },
  ];
}

export class OperativeSystem {
  public static operative_system = [
    { id: '1', name: 'WINDOWS' },
    { id: '2', name: 'MAC' },
    { id: '3', name: 'LINUX' }
  ];
}

export class GameModes {
  public static game_modes = [
    {
      name: 'Un Jugador',
      image: '../../environments/PNG/007-persona.png'
    },
    {
      name: 'Multijugador',
      image: '../../environments/PNG/008-multitud-de-usuarios.png'
    },
    {
      name: 'JcJ',
      image: '../../environments/PNG/001-jcj.png'
    },
    {
      name: 'JcJ en línea',
      image: '../../environments/PNG/001-jcj.png'
    },
    {
      name: 'JcJ en LAN',
      image: '../../environments/PNG/001-jcj.png'
    },
    {
      name: 'JcJ en pantalla compartida',
      image: '../../environments/PNG/001-jcj.png'
    },
    {
      name: 'Cooperativo',
      image: '../../environments/PNG/002-equipo.png'
    },
    {
      name: 'Cooperativo en línea',
      image: '../../environments/PNG/002-equipo.png'
    },
    {
      name: 'Cooperativo en LAN',
      image: '../../environments/PNG/002-equipo.png'
    },
    {
      name: 'Coop. en pantalla compartida',
      image: '../../environments/PNG/002-equipo.png'
    },
    {
      name: 'Pantalla compartida',
      image: '../../environments/PNG/005-jugador-contra-jugador-1.png'
    },
    {
      name: 'Multijugador multiplataforma',
      image: '../../environments/PNG/008-multitud-de-usuarios.png'
    }
  ];
}

export class Languages {
  public static languages = [
    { language: 'Español de Hispanoamérica' },
    { language: 'Español de España' },
    { language: 'Inglés' },
    { language: 'Francés' },
    { language: 'Italiano' },
    { language: 'Alemán' },
    { language: 'Árabe' },
    { language: 'Japonés' },
    { language: 'Coreano' },
    { language: 'Portugues de Brasil' },
    { language: 'Ruso' },
    { language: 'Chino simplificado' },
    { language: 'Chino tradicional' },
    { language: 'Tailandés' },
    { language: 'Polaco' },
    { language: 'Checo' },
    { language: 'Húngaro' },
    { language: 'Turco' },
    { language: 'Holandés' },
    { language: 'Sueco' },
    { language: 'Danés' },
    { language: 'Noruego' },
    { language: 'Finlandés' },
    { language: 'Árabe moderno estándar' },
    { language: 'Hebreo' },
    { language: 'Indonesio' },
    { language: 'Malayo' },
    { language: 'Vietnamita' },
    { language: 'Tagalo' },
    { language: 'Griego' },
    { language: 'Búlgaro' },
    { language: 'Croata' },
    { language: 'Serbio' },
    { language: 'Eslovaco' },
    { language: 'Esloveno' },
    { language: 'Rumano' },
    { language: 'Ucraniano' },
    { language: 'Lituano' },
    { language: 'Letón' },
    { language: 'Estonio' }
  ];
}
