import { blackPetProject } from './blackPet';
import { missPantojaProject } from './missPantoja';
import { essenciaGlobalUpProject } from './essenciaGlobalUp';
import { luarNcPratasProject } from './luarNcPratas';

export * from './blackPet';
export * from './missPantoja';
export * from './essenciaGlobalUp';
export * from './luarNcPratas';
export * from './aguaDeSalsicha'; // mantido em arquivo para preservação documental, mas fora do grid principal

export const identidadeVisualProjects = [
  blackPetProject,
  missPantojaProject,
  essenciaGlobalUpProject,
  luarNcPratasProject
];
