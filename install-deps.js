const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Installation des dépendances manquantes pour MyAI Dev Studio...');

// Dépendances manquantes pour shadcn/ui et Radix UI
const missingDeps = [
  '@radix-ui/react-slot',
  '@radix-ui/react-select',
  '@radix-ui/react-dialog',
  '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-label',
  '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover',
  '@radix-ui/react-progress',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-separator',
  '@radix-ui/react-sheet',
  '@radix-ui/react-slider',
  '@radix-ui/react-switch',
  '@radix-ui/react-tabs',
  '@radix-ui/react-toast',
  '@radix-ui/react-toggle',
  '@radix-ui/react-tooltip',
  'tailwindcss-animate',
  'react-hook-form',
  '@hookform/resolvers',
  'zod',
  'react-hot-toast',
  'framer-motion',
  'react-syntax-highlighter',
  '@types/react-syntax-highlighter',
  'monaco-editor',
  '@monaco-editor/react',
  'zustand'
];

try {
  console.log('📦 Installation des dépendances...');
  execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
  
  console.log('✅ Dépendances installées avec succès !');
  console.log('');
  console.log('📝 Prochaines étapes :');
  console.log('1. Configurez vos variables d\'environnement dans .env.local');
  console.log('2. Exécutez le script SQL sur Supabase');
  console.log('3. Lancez le projet avec: npm run dev');
  console.log('');
  console.log('🎉 MyAI Dev Studio est prêt !');
  
} catch (error) {
  console.error('❌ Erreur lors de l\'installation des dépendances:', error.message);
  process.exit(1);
}
