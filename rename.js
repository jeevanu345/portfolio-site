const fs = require('fs');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\bAskTarsButton\b/g, 'AskSequoiaButton');
  content = content.replace(/\bTarsMessage\b/g, 'SequoiaMessage');
  content = content.replace(/\btarsIcon\b/g, 'sequoiaIcon');
  content = content.replace(/\bisTarsAvatar\b/g, 'isSequoiaAvatar');
  content = content.replace(/\btars-history\b/g, 'sequoia-history');
  content = content.replace(/\bsession-id-tars\b/g, 'session-id-sequoia');
  content = content.replace(/\btars\.svg\b/g, 'sequoia.svg');
  content = content.replace(/\bdeleteTarsSession\b/g, 'deleteSequoiaSession');
  content = content.replace(/\bclearTarsHistory\b/g, 'clearSequoiaHistory');
  content = content.replace(
    /\bhandleClearTarsHistory\b/g,
    'handleClearSequoiaHistory'
  );
  content = content.replace(/\bTARS_ENDPOINT\b/g, 'SEQUOIA_ENDPOINT');
  content = content.replace(/\/tars\b/g, '/sequoia');
  content = content.replace(/\bTars AI\b/g, 'Sequoia AI');
  content = content.replace(/\bTARS\b/g, 'SEQUOIA');
  content = content.replace(/\bTars\b/g, 'Sequoia');
  content = content.replace(/\btars\b/g, 'sequoia');
  fs.writeFileSync(filePath, content, 'utf8');
}

[
  'pages/sequoia/index.tsx',
  'components/AskSequoiaButton.tsx',
  'pages/_app.tsx',
  'components/FloatingButtonGroup.tsx',
  'components/Avatar.tsx',
  'pages/api/deleteSequoiaSession.ts',
].forEach(replaceInFile);
