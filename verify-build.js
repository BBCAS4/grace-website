// Build verification script for Azure deployment
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build...');

// Check if .next directory exists
const nextDir = path.join(__dirname, '.next');
if (!fs.existsSync(nextDir)) {
    console.error('❌ .next directory not found. Build may have failed.');
    process.exit(1);
}

// Check if build manifest exists
const buildManifest = path.join(nextDir, 'BUILD_ID');
if (!fs.existsSync(buildManifest)) {
    console.error('❌ BUILD_ID not found. Build may be incomplete.');
    process.exit(1);
}

// Check if static pages exist
const staticDir = path.join(nextDir, 'static');
if (!fs.existsSync(staticDir)) {
    console.error('❌ Static directory not found.');
    process.exit(1);
}

// Check if server files exist
const serverDir = path.join(nextDir, 'server');
if (!fs.existsSync(serverDir)) {
    console.error('❌ Server directory not found.');
    process.exit(1);
}

console.log('✅ Build verification passed!');
console.log('📁 Build artifacts found:');
console.log('   - .next directory ✓');
console.log('   - BUILD_ID ✓');
console.log('   - Static files ✓');
console.log('   - Server files ✓');
console.log('');
console.log('🎯 Ready for deployment!');
