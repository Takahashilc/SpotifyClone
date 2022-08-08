import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  musica: IMusica = newMusica();
  status: boolean = false;
  subs: Subscription[] = [];

  //Icones
  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  startIcone = faPlay;
  pauseIcone = faPause;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.obterMusicaTocando();
    this.obterStatus();
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  obterStatus() {
    const sub = this.playerService.status.subscribe((status) => {
      this.status = status;
    });

    this.subs.push(sub);
  }

  voltarMusica() {
    this.playerService.voltarMusica();
  }

  playMusica() {
    this.playerService.playMusica();
  }

  pauseMusica() {
    this.playerService.pauseMusica();
  }

  proximaMusica() {
    this.playerService.proximaMusica();
  }

  handleStatus() {
    if (this.status) {
      this.pauseMusica();
    } else {
      this.playMusica();
    }
  }
}
