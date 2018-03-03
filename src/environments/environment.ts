// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: 'AIzaSyAKUz_VsxOi9tGctg7Wf2oj9YuPEku2OqU',
    authDomain: 'findyoutrain.firebaseapp.com',
    databaseURL: 'https://findyoutrain.firebaseio.com',
    projectId: 'findyoutrain',
    storageBucket: 'findyoutrain.appspot.com',
    messagingSenderId: '901081728111'
  }
};
