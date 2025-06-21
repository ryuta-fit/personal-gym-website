// Vercel用のPostinstallスクリプト
// 本番環境でPrisma Clientを確実に生成する

const { execSync } = require('child_process');

try {
  // Prisma Clientを生成
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully');
} catch (error) {
  console.error('❌ Failed to generate Prisma Client:', error.message);
  process.exit(1);
}