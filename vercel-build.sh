#!/bin/sh
set -e

# Generate environment.prod.ts from Vercel environment variables
cat > src/environments/environment.prod.ts <<EOF
export const environment = {
  apiUrl: '${API_URL}',
  apiKey: '${API_KEY}',
  apiKeyOpenAI: '${API_KEY_OPENAI}',
  production: true,
  logLevel: 'ERROR' as const,
  youtubeControls: 1 as const,
  gamesActivityId: '${GAMES_ACTIVITY_ID}',
};
EOF

npm run build
