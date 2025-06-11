<h4>2 Test d’ESLint sur un fichier JavaScript</h4>
2. On a ces erreurs lors de la commande npx eslint index.js
   7:7   error  'unusedVar' is assigned a value but never used  no-unused-vars
  19:7   error  'message' is assigned a value but never used    no-unused-vars
  21:5   error  Unexpected constant condition                   no-constant-condition
  25:7   error  'tableau' is assigned a value but never used    no-unused-vars
  36:10  error  'toutFaire' is defined but never used           no-unused-vars
  56:7   error  'd' is assigned a value but never used          no-unused-vars
  58:10  error  'fetchData' is defined but never used           no-unused-vars
  63:7   error  'nombres' is assigned a value but never used    no-unused-vars
  67:1   error  Unexpected 'debugger' statement                 no-debugger

3. Les mêmes erreurs apparaissent lorsqu'on fait npx eslint --fix index.js

<h4>3 Intégration avec Git Hooks (Husky) </h4>
1. Les commandes npm install husky --save-dev et npx husky install  sont dépréciées
il faut utiliser :
npm install --save-dev husky
npx install husky
2. La commande npx husky add .husky/pre-commit "npx eslint ." est dépréciée, il faut utiliser: npx husky init

<h4>4 Configuration avancée d’ESLint </h4>
1. La modification de eslintrc.json donne ceci
// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "eslint/eslintrc";  // <-- bien depuis 'eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default defineConfig([
  {
    // Recommandations de @eslint/js pour tous les fichiers JS
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    // Mode CommonJS pour les .js uniquement
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    // Globals du navigateur pour .js/.mjs/.cjs
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  // Injecte la config airbnb-base legacy via FlatCompat
  ...compat.extends("airbnb-base"),
  {
    // Vos règles perso
    rules: {
      "no-console": "warn",
      indent: ["error", 2],
      quotes: ["error", "single"],
    },
    env: {
      browser: true,
      node: true,
    },
  },
]);

Une fois la modification faite nous faisons la commande npm run lint afin de vérigier notre config.
Malgré la modification de la config et l'installation des modules avec nom install, lors de l'exécution nous avons ces erreurs.

Error: Cannot find module 'D:\ESGI\L3\S2\Outil et pratique du code\TP_Note\node_modules\@eslint\config-array\dist\cjs\index.cjs'
    at createEsmNotFoundErr (node:internal/modules/cjs/loader:1180:15)
    at finalizeEsmResolution (node:internal/modules/cjs/loader:1168:15)
    at resolveExports (node:internal/modules/cjs/loader:590:14)
    at Module._findPath (node:internal/modules/cjs/loader:667:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:1129:27)
    at Module._load (node:internal/modules/cjs/loader:984:27)
    at Module.require (node:internal/modules/cjs/loader:1231:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (D:\ESGI\L3\S2\Outil et pratique du code\TP_Note\node_modules\eslint\lib\config\flat-config-array.js:12:44)
    at Module._compile (node:internal/modules/cjs/loader:1369:14)

Ce problème n'a pas pu être réglé.

<h4>5 Mise en place de GitHub Actions</h4>