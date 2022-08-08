export const environment = {
  production: true,
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
