import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistParaPlaylist,
  SpotifySinglePlaylistParaPlaylist,
  SpotifyTrackParaMusica,
  spotifyUserParaUsuario,
} from '../Common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario$: BehaviorSubject<IUsuario | null> =
    new BehaviorSubject<IUsuario | null>(null);

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario$.getValue()) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.definirAccessToken(token);
      const usuarioSpotify = await this.obterSpotifyUsuario();
      if (usuarioSpotify) {
        this.usuario$.next(usuarioSpotify);
      }
      return !!usuarioSpotify;
    } catch (ex) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    return spotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndPoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(
    id: string,
    offset = 0,
    limit = 50
  ): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(id, {
      offset,
      limit,
    });

    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify) return null;

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });
    playlist.musicas = musicasSpotify.items.map((musica) =>
      SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map((x) => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string) {
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackParaMusica(musicaSpotify.item);
  }

  async obterStatus(): Promise<boolean> {
    const status = await this.spotifyApi.getMyCurrentPlaybackState();
    return status.is_playing;
  }

  async voltarMusica() {
    await this.spotifyApi.skipToPrevious();
  }

  async proximaMusica() {
    await this.spotifyApi.skipToNext();
  }

  async playMusica() {
    await this.spotifyApi.play();
  }

  async pauseMusica() {
    await this.spotifyApi.pause();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
