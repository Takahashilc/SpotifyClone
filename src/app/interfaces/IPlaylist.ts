import { IMusica } from './IMusica';

export interface IPlaylist {
  id: string;
  nome: string;
  imageUrl: string;
  musicas?: IMusica[];
}
