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
