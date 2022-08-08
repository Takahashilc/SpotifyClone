import { Component, OnDestroy } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss'],
})
export class RodapeUsuarioComponent implements OnDestroy {
  sairIcone = faSignOutAlt;
  usuario: IUsuario;
  subs: Subscription[] = [];

  constructor(private spotifyService: SpotifyService) {
    const usuarioChange: Subscription = this.spotifyService.usuario$.subscribe(
      (usuario) => {
        if (usuario) {
          this.usuario = usuario;
        }
      }
    );

    this.subs.push(usuarioChange);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  logout() {
    this.spotifyService.logout();
  }
}
