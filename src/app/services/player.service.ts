import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { newMusica } from '../Common/factories';
import { IMusica } from '../interfaces/IMusica';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  status = new BehaviorSubject<boolean>(false);
  timerId: any = null;
  timerStatusId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
    this.obterStatus();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);

    //Obtenho Musica
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);

    //Causo Loop
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000);
  }

  async obterStatus() {
    clearTimeout(this.timerStatusId);

    //Obtenho Musica
    const status = await this.spotifyService.obterStatus();
    this.definirStatus(status);

    //Causo Loop
    this.timerStatusId = setInterval(async () => {
      await this.obterStatus();
    }, 3000);
  }

  definirMusicaAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }

  definirStatus(status: boolean) {
    this.status.next(status);
  }

  async voltarMusica() {
    await this.spotifyService.voltarMusica();
  }

  async playMusica() {
    await this.spotifyService.playMusica();
    this.definirStatus(true);
  }

  async pauseMusica() {
    await this.spotifyService.pauseMusica();
    this.definirStatus(false);
  }

  async proximaMusica() {
    await this.spotifyService.proximaMusica();
  }
}
