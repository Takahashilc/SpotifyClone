import { addMilliseconds, format } from 'date-fns';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IUsuario } from '../interfaces/IUsuario';
import { newMusica, newPlaylist } from './factories';

export function spotifyUserParaUsuario(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUsuario {
  return {
    id: user.id,
    nome: user.display_name,
    imageUrl: user.images.pop().url,
  };
}

export function SpotifyPlaylistParaPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    id: playlist.id,
    nome: playlist.name,
    imageUrl: playlist.images.pop().url,
  };
}

export function SpotifySinglePlaylistParaPlaylist(
  playlist: SpotifyApi.SinglePlaylistResponse
): IPlaylist {
  if (!playlist) return newPlaylist();
  return {
    id: playlist.id,
    nome: playlist.name,
    imageUrl: playlist.images.shift().url,
    musicas: [],
  };
}

export function SpotifyArtistaParaArtista(
  spotifyArtista: SpotifyApi.ArtistObjectFull
): IArtista {
  return {
    id: spotifyArtista.id,
    imagemUrl: spotifyArtista.images.sort((a, b) => a.width - b.width).pop()
      .url,
    nome: spotifyArtista.name,
  };
}

export function SpotifyTrackParaMusica(
  spotifyTrack: SpotifyApi.TrackObjectFull
): IMusica {
  if (!spotifyTrack) return newMusica();

  const msParaMinutos = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  };

  return {
    id: spotifyTrack.uri,
    titulo: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imagemUrl: spotifyTrack.album.images.shift().url,
      nome: spotifyTrack.album.name,
    },
    artistas: spotifyTrack.artists.map((artista) => ({
      id: artista.id,
      nome: artista.name,
    })),
    tempo: msParaMinutos(spotifyTrack.duration_ms),
  };
}
