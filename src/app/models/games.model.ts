export class Games {
  id?: string;
  name!: string;
  images!: string[];
  profile_image!: string;
  youtube_links!: string[];
  about!: string;
  classification!: Classification;
  classification_descriptors!: ClassificationDescriptors[];
  developers!: Developers[];
  editors!: Editors[];
  franchise!: Franchise;
  game_modes!: GameModes[];
  soon!: any;
  publication_date!: any;
  categories!: Categories[];
  platforms!: Platforms[];
  operative_systems!: string[];

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

export class Categories {
  public static categories = [
    { key: 1, cat: 'AVENTURA', total: 0 },
    { key: 2, cat: 'CARRERAS', total: 0 },
    { key: 3, cat: 'MMORPG', total: 0 },
    { key: 4, cat: 'ESTRATEGIA', total: 0 },
    { key: 5, cat: 'SUPERVIVENCIA', total: 0 },
    { key: 6, cat: 'SANDBOX', total: 0 },
    { key: 7, cat: 'ACCIÓN', total: 0 },
    { key: 8, cat: 'MULTIJUGADOR MASIVO', total: 0 },
    { key: 9, cat: 'DEPORTES', total: 0 },
    { key: 10, cat: 'RPG', total: 0 },
    { key: 11, cat: 'TERROR', total: 0 },
    { key: 12, cat: 'INDIE', total: 0 },
    { key: 13, cat: 'SIMULACIÓN', total: 0 },
    { key: 14, cat: 'SIGILO', total: 0 },
    { key: 15, cat: 'ROL', total: 0 },
    { key: 16, cat: 'PUZZLES', total: 0 },
    { key: 17, cat: 'CARTAS Y MESA', total: 0 },
    { key: 18, cat: 'MUSICA Y BAILE', total: 0 },
    { key: 19, cat: 'DISPAROS', total: 0 },
    { key: 20, cat: 'EDUCATIVOS', total: 0 },
    { key: 21, cat: 'VR', total: 0 },
    { key: 22, cat: 'AR', total: 0 },
    { key: 23, cat: 'PLATAFORMAS', total: 0 },
    { key: 24, cat: 'LUCHA', total: 0 },
    { key: 25, cat: 'MUNDO ABIERTO', total: 0 },
    { key: 26, cat: 'CIENCIA FICCIÓN', total: 0 },
    { key: 27, cat: 'FANTASÍA', total: 0 },
    { key: 28, cat: 'MMO', total: 0 },
    { key: 29, cat: 'EXPLORACIÓN', total: 0 },
    { key: 30, cat: 'PELEA', total: 0 },
  ];
}

export class Platforms {
  public static platforms = [
    { key: 1, plat: 'STEAM', total: 0 },
    { key: 2, plat: 'Epic Games', total: 0 },
    { key: 3, plat: 'Ubisoft', total: 0 },
    { key: 4, plat: 'IOS', total: 0 },
    { key: 5, plat: 'MS-DOS', total: 0 },
    { key: 6, plat: 'Mac OS', total: 0 },
    { key: 7, plat: 'Project xCloud', total: 0 },
    { key: 8, plat: 'Google Stadia', total: 0 },
    { key: 9, plat: 'GOG', total: 0 },
    { key: 10, plat: 'Dreamcast', total: 0 },
    { key: 11, plat: 'Windows Mobile', total: 0 },
    { key: 12, plat: 'GNU/Linux', total: 0 },
    { key: 13, plat: 'Amazon Luna', total: 0 },
    { key: 14, plat: 'Atari 2600', total: 0 },
    { key: 15, plat: 'Android', total: 0 },
    { key: 16, plat: 'Game Boy', total: 0 },
    { key: 17, plat: 'Game Boy Color', total: 0 },
    { key: 18, plat: 'Game Boy Advance', total: 0 },
    { key: 19, plat: 'GameCube', total: 0 },
    { key: 20, plat: 'Mac OS Classic', total: 0 },
    { key: 21, plat: 'Microsoft Windows', total: 0 },
    { key: 22, plat: 'N-Gage', total: 0 },
    { key: 23, plat: 'Nintendo (NES)', total: 0 },
    { key: 24, plat: 'Super Nintendo (SNES)', total: 0 },
    { key: 25, plat: 'Nintendo Virtual Boy', total: 0 },
    { key: 26, plat: 'New Nintendo 3DS', total: 0 },
    { key: 27, plat: 'Nintendo DS', total: 0 },
    { key: 28, plat: 'Nintendo 64', total: 0 },
    { key: 29, plat: 'Nintendo Switch', total: 0 },
    { key: 30, plat: 'Neo-Geo', total: 0 },
    { key: 31, plat: 'PC', total: 0 },
    { key: 32, plat: 'PSP', total: 0 },
    { key: 33, plat: 'PlayStation', total: 0 },
    { key: 34, plat: 'PlayStation 2', total: 0 },
    { key: 35, plat: 'PlayStation 3', total: 0 },
    { key: 36, plat: 'PlayStation 4', total: 0 },
    { key: 37, plat: 'PlayStation 5', total: 0 },
    { key: 38, plat: 'PlayStation Vita', total: 0 },
    { key: 39, plat: 'PocketStation', total: 0 },
    { key: 40, plat: 'Raspberry PI', total: 0 },
    { key: 41, plat: 'Sega Saturn', total: 0 },
    { key: 42, plat: 'Sega Master System', total: 0 },
    { key: 43, plat: 'Sega Genesis', total: 0 },
    { key: 44, plat: 'Sega Mega Drive', total: 0 },
    { key: 45, plat: 'Sega Mega CD', total: 0 },
    { key: 46, plat: 'Wii', total: 0 },
    { key: 47, plat: 'Wii U', total: 0 },
    { key: 48, plat: 'Xbox', total: 0 },
    { key: 49, plat: 'XBOX 360', total: 0 },
    { key: 50, plat: 'Xbox One', total: 0 },
    { key: 51, plat: 'Xbox Series X|S', total: 0 },
    { key: 52, plat: 'GeForce Now', total: 0 },
    { key: 53, plat: 'Pokémon Mini', total: 0 },
    { key: 54, plat: 'Satellaview', total: 0 },
    { key: 55, plat: 'Famicom Disk System', total: 0 },
    { key: 56, plat: 'Game and Watch', total: 0 },
    { key: 57, plat: 'Color TV Game', total: 0 }
  ];
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
      image: '../../environments/PNG/007-persona.png',
      white_image: '../../environments/PNG/007-persona-white.png'
    },
    {
      name: 'Multijugador',
      image: '../../environments/PNG/008-multitud-de-usuarios.png',
      white_image: '../../environments/PNG/008-multitud-de-usuarios-white.png'
    },
    {
      name: 'JcJ',
      image: '../../environments/PNG/001-jcj.png',
      white_image: '../../environments/PNG/001-jcj-white.png'
    },
    {
      name: 'JcJ en línea',
      image: '../../environments/PNG/001-jcj.png',
      white_image: '../../environments/PNG/001-jcj-white.png'
    },
    {
      name: 'JcJ en LAN',
      image: '../../environments/PNG/001-jcj.png',
      white_image: '../../environments/PNG/001-jcj-white.png'
    },
    {
      name: 'JcJ en pantalla compartida',
      image: '../../environments/PNG/001-jcj.png',
      white_image: '../../environments/PNG/001-jcj-white.png'
    },
    {
      name: 'Cooperativo',
      image: '../../environments/PNG/002-equipo.png',
      white_image: '../../environments/PNG/002-equipo-white.png'
    },
    {
      name: 'Cooperativo en línea',
      image: '../../environments/PNG/002-equipo.png',
      white_image: '../../environments/PNG/002-equipo-white.png'
    },
    {
      name: 'Cooperativo en LAN',
      image: '../../environments/PNG/002-equipo.png',
      white_image: '../../environments/PNG/002-equipo-white.png'
    },
    {
      name: 'Coop. en pantalla compartida',
      image: '../../environments/PNG/002-equipo.png',
      white_image: '../../environments/PNG/002-equipo-white.png'
    },
    {
      name: 'Pantalla compartida',
      image: '../../environments/PNG/005-jugador-contra-jugador-1.png',
      white_image: '../../environments/PNG/005-jugador-contra-jugador-1-white.png'
    },
    {
      name: 'Multijugador multiplataforma',
      image: '../../environments/PNG/008-multitud-de-usuarios.png',
      white_image: '../../environments/PNG/008-multitud-de-usuarios-white.png'
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

export class Developers {
  id!: string;
  name!: string;
}

export class Editors {
  id!: string;
  name!: string;
}

export class Franchise {
  id!: string;
  name!: string;
}
