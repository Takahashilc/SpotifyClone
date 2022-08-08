// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const SpotifyConfiguration = {
  clientId: 'ef22d57366ff4b4bb9e5b2c89e224260',
  authEndPoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',
  scopes: [
    'user-read-currently-playing', // tocando agora
    'user-read-recently-played', // tocadas recentemente
    'user-read-playback-state', //estado do player do usuario
    'user-top-read', // top artistas e musicas do user
    'user-modify-playback-state', //alterar do player do user
    'user-library-read', //biblioteca dos usuarios
    'playlist-read-private', // plsytlist private
    'playlist-read-collaborative', // playslit colaborativas
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
