import { Activity, ActivityConditions } from './types';

// Atividades disponíveis organizadas por categoria
export const ACTIVITIES: Activity[] = [
  // AREIA - Esportes
  { id: 'altinha', name: 'Altinha', category: 'sand', icon: 'Volleyball' },
  { id: 'beach-tennis', name: 'Beach Tennis', category: 'sand', icon: 'Trophy' },
  { id: 'frescobol', name: 'Frescobol', category: 'sand', icon: 'CircleDot' },
  { id: 'volei', name: 'Vôlei de Praia', category: 'sand', icon: 'Volleyball' },
  { id: 'futebol-areia', name: 'Futebol de Areia', category: 'sand', icon: 'Football' },
  
  // AREIA - Exercícios
  { id: 'caminhada', name: 'Caminhada', category: 'sand', icon: 'PersonStanding' },
  { id: 'corrida', name: 'Corrida', category: 'sand', icon: 'Footprints' },
  { id: 'bike', name: 'Bike', category: 'sand', icon: 'Bike' },
  
  // AREIA - Relaxamento
  { id: 'piquenique', name: 'Piquenique', category: 'sand', icon: 'UtensilsCrossed' },
  { id: 'banho-sol', name: 'Banho de Sol', category: 'sand', icon: 'Sun' },
  { id: 'leitura', name: 'Leitura', category: 'sand', icon: 'BookOpen' },
  { id: 'relaxar', name: 'Relaxar', category: 'sand', icon: 'Armchair' },
  
  // MAR
  { id: 'banho-mar', name: 'Banho de Mar', category: 'sea', icon: 'Waves' },
  { id: 'mergulho-snorkel', name: 'Mergulho Snorkel', category: 'sea', icon: 'Fish' },
  { id: 'mergulho-cilindro', name: 'Mergulho Cilindro', category: 'sea', icon: 'Droplet' },
  { id: 'nadar', name: 'Nadar no Mar', category: 'sea', icon: 'PersonStanding' },
  { id: 'surf', name: 'Surf', category: 'sea', icon: 'Waves' },
  { id: 'skimboard', name: 'Skimboard', category: 'sea', icon: 'Wind' },
  
  // NAVEGAÇÃO
  { id: 'sup', name: 'SUP', category: 'navigation', icon: 'Anchor' },
  { id: 'caiaque', name: 'Caiaque', category: 'navigation', icon: 'Ship' },
  { id: 'canoa', name: 'Canoa', category: 'navigation', icon: 'Ship' },
  { id: 'kitesurf', name: 'Kitesurf', category: 'navigation', icon: 'Wind' },
  { id: 'windsurf', name: 'Windsurf', category: 'navigation', icon: 'Wind' },
  { id: 'jet-ski', name: 'Jet Ski', category: 'navigation', icon: 'Zap' },
  { id: 'lancha', name: 'Lancha', category: 'navigation', icon: 'Ship' },
  { id: 'veleiro', name: 'Veleiro', category: 'navigation', icon: 'Sailboat' },
  { id: 'pesca-costao', name: 'Pesca no Costão', category: 'navigation', icon: 'Fish' },
  { id: 'pesca-costeira', name: 'Pesca Costeira', category: 'navigation', icon: 'Fish' },
];

// Condições ideais por atividade (baseado no documento técnico)
export const ACTIVITY_CONDITIONS: Record<string, ActivityConditions> = {
  // AREIA - Esportes
  'altinha': { vento_max: 22, uv_max: 8, sem_chuva: true, sensacao_max: 36 },
  'beach-tennis': { vento_max: 22, uv_max: 8, sem_chuva: true, sensacao_max: 36 },
  'frescobol': { vento_max: 22, uv_max: 8, sem_chuva: true, sensacao_max: 36 },
  'volei': { vento_max: 22, uv_max: 8, sem_chuva: true, sensacao_max: 36 },
  'futebol-areia': { vento_max: 22, uv_max: 8, sem_chuva: true, sensacao_max: 36 },
  
  // AREIA - Exercícios
  'caminhada': { temp_min: 18, temp_max: 30, vento_max: 25, uv_max: 7 },
  'corrida': { temp_min: 18, temp_max: 30, vento_max: 25, uv_max: 7 },
  'bike': { temp_min: 18, temp_max: 30, vento_max: 25, uv_max: 7 },
  
  // AREIA - Relaxamento
  'piquenique': { vento_max: 20, uv_max: 6, sem_chuva: true },
  'banho-sol': { vento_max: 18, uv_max: 8 },
  'leitura': { vento_max: 20, uv_max: 6, sem_chuva: true },
  'relaxar': { vento_max: 20, uv_max: 6, sem_chuva: true },
  
  // MAR
  'banho-mar': { 
    onda_max: 1.2, 
    vento_max: 25, 
    agua_temp_min: 22, 
    agua_temp_max: 27,
    correntes: 'fracas'
  },
  'mergulho-snorkel': { 
    onda_max: 0.8, 
    vento_max: 18, 
    visibilidade_min: 8 
  },
  'mergulho-cilindro': { 
    onda_max: 0.8, 
    vento_max: 18, 
    visibilidade_min: 8 
  },
  'nadar': { onda_max: 1.0, vento_max: 22 },
  'surf': { 
    onda_min: 1.0, 
    onda_max: 2.5, 
    periodo_min: 8, 
    periodo_max: 14 
  },
  'skimboard': { onda_min: 0.3, onda_max: 1.0 },
  
  // NAVEGAÇÃO
  'sup': { vento_max: 15, onda_max: 0.8 },
  'caiaque': { vento_max: 15, onda_max: 0.8 },
  'canoa': { vento_max: 15, onda_max: 0.8 },
  'kitesurf': { vento_min: 20, vento_max: 35 },
  'windsurf': { vento_min: 20, vento_max: 35 },
  'jet-ski': { vento_max: 22, onda_max: 1.2 },
  'lancha': { vento_max: 22, onda_max: 1.2 },
  'veleiro': { vento_max: 22, onda_max: 1.2 },
  'pesca-costao': { onda_max: 1.0, vento_max: 20, visibilidade_min: 5 },
  'pesca-costeira': { onda_max: 1.0, vento_max: 20, visibilidade_min: 5 },
};

// Categorias de atividades
export const ACTIVITY_CATEGORIES = {
  sand: 'Areia',
  sea: 'Mar',
  navigation: 'Navegação'
} as const;

// URLs das APIs
export const API_URLS = {
  openMeteo: 'https://api.open-meteo.com/v1/forecast',
  openWeather: 'https://api.openweathermap.org/data/3.0/onecall',
  stormglass: 'https://api.stormglass.io/v2/weather/point',
  nominatim: 'https://nominatim.openstreetmap.org/search'
} as const;

// Raio de busca de praias próximas (em km)
export const NEARBY_BEACHES_RADIUS = 50;
