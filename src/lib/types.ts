// Tipos globais do MARU

// Usuário
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  preferences?: UserPreferences;
}

// Preferências do usuário
export interface UserPreferences {
  activities_sand: string[];
  activities_sea: string[];
  activities_navigation: string[];
}

// Atividades disponíveis
export type ActivityCategory = 'sand' | 'sea' | 'navigation';

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  icon: string;
}

// Dados meteorológicos e oceanográficos
export interface WeatherData {
  temperatura_ar: number | null;
  sensacao_termica: number | null;
  umidade: number | null;
  vento_velocidade_kmh: number | null;
  vento_direcao_graus: number | null;
  uv: number | null;
  precipitacao: number | null;
  nebulosidade: number | null;
  pressao: number | null;
}

export interface OceanData {
  onda_altura_m: number | null;
  onda_direcao_graus: number | null;
  onda_periodo_s: number | null;
  swell_altura_m: number | null;
  swell_periodo_s: number | null;
  agua_temperatura: number | null;
  visibilidade: number | null;
  correntes: string | null;
}

export interface BeachData {
  weather: WeatherData;
  ocean: OceanData;
  timestamp: string;
}

// Praia
export interface Beach {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  city: string;
  is_favorite?: boolean;
}

// Recomendação de atividade
export type RecommendationLevel = 'perfect' | 'possible' | 'not_recommended';

export interface ActivityRecommendation {
  activity: Activity;
  level: RecommendationLevel;
  reasons: string[];
  score: number;
}

// Condições ideais por atividade
export interface ActivityConditions {
  vento_max?: number;
  vento_min?: number;
  uv_max?: number;
  temp_min?: number;
  temp_max?: number;
  sensacao_max?: number;
  onda_min?: number;
  onda_max?: number;
  periodo_min?: number;
  periodo_max?: number;
  agua_temp_min?: number;
  agua_temp_max?: number;
  visibilidade_min?: number;
  sem_chuva?: boolean;
  correntes?: 'fracas' | 'moderadas' | 'fortes';
}
