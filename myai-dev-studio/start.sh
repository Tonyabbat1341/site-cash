#!/bin/bash

# MyAI Dev Studio - Script de démarrage
echo "🚀 Démarrage de MyAI Dev Studio..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer avec Node.js"
    exit 1
fi

# Vérifier si le fichier .env.local existe
if [ ! -f ".env.local" ]; then
    echo "⚠️  Fichier .env.local non trouvé. Création à partir de .env.local.example..."
    cp .env.local.example .env.local
    echo "📝 Veuillez configurer vos variables d'environnement dans .env.local"
    echo ""
    echo "Variables requises :"
    echo "- NEXT_PUBLIC_SUPABASE_URL"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (optionnel)"
    echo "- STRIPE_SECRET_KEY (optionnel)"
    echo ""
    echo "Appuyez sur Entrée pour continuer après avoir configuré .env.local..."
    read
fi

# Installer les dépendances si node_modules n'existe pas
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier les dépendances critiques
echo "🔍 Vérification des dépendances..."

# Vérifier Next.js
if ! npm list next &> /dev/null; then
    echo "❌ Next.js n'est pas installé"
    exit 1
fi

# Vérifier Supabase
if ! npm list @supabase/supabase-js &> /dev/null; then
    echo "❌ @supabase/supabase-js n'est pas installé"
    exit 1
fi

# Vérifier Stripe
if ! npm list stripe &> /dev/null; then
    echo "❌ stripe n'est pas installé"
    exit 1
fi

echo "✅ Toutes les dépendances sont installées"

# Démarrer le serveur de développement
echo "🚀 Démarrage du serveur de développement..."
echo "📱 L'application sera disponible sur http://localhost:3000"
echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

npm run dev