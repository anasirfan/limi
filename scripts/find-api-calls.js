/**
 * Script to find all files with hardcoded API URLs
 * Run with: node scripts/find-api-calls.js
 */

const fs = require('fs');
const path = require('path');

const API_PATTERNS = [
  /https:\/\/dev\.api\.limitless-lighting\.co\.uk/g,
  /https:\/\/dev\.api1\.limitless-lighting\.co\.uk/g,
  /https:\/\/api\.limitless-lighting\.co\.uk/g,
  /https:\/\/api1\.limitless-lighting\.co\.uk/g,
];

const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git', 'scripts'];
const EXCLUDE_FILES = ['api.config.js', 'find-api-calls.js', 'API_MIGRATION_GUIDE.md'];

function searchDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip excluded directories
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        searchDirectory(filePath, results);
      }
      return;
    }

    // Skip excluded files
    if (EXCLUDE_FILES.includes(file)) {
      return;
    }

    // Only check JS/JSX/TS/TSX files
    if (!/\.(js|jsx|ts|tsx)$/.test(file)) {
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let hasMatch = false;
      const matches = [];

      API_PATTERNS.forEach(pattern => {
        const found = content.match(pattern);
        if (found) {
          hasMatch = true;
          matches.push(...found);
        }
      });

      if (hasMatch) {
        const lines = content.split('\n');
        const matchedLines = [];

        lines.forEach((line, index) => {
          if (API_PATTERNS.some(pattern => pattern.test(line))) {
            matchedLines.push({
              lineNumber: index + 1,
              content: line.trim()
            });
          }
        });

        results.push({
          file: filePath,
          matchCount: matches.length,
          lines: matchedLines
        });
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
    }
  });

  return results;
}

// Run the search
const srcDir = path.join(__dirname, '..', 'src');
console.log('🔍 Searching for hardcoded API URLs...\n');

const results = searchDirectory(srcDir);

if (results.length === 0) {
  console.log('✅ No hardcoded API URLs found! All files have been migrated.\n');
} else {
  console.log(`⚠️  Found ${results.length} files with hardcoded API URLs:\n`);
  
  // Sort by match count (descending)
  results.sort((a, b) => b.matchCount - a.matchCount);

  results.forEach((result, index) => {
    const relativePath = path.relative(process.cwd(), result.file);
    console.log(`${index + 1}. ${relativePath} (${result.matchCount} matches)`);
    
    result.lines.forEach(line => {
      console.log(`   Line ${line.lineNumber}: ${line.content.substring(0, 80)}${line.content.length > 80 ? '...' : ''}`);
    });
    console.log('');
  });

  console.log('\n📋 Summary:');
  console.log(`   Total files to migrate: ${results.length}`);
  console.log(`   Total API calls: ${results.reduce((sum, r) => sum + r.matchCount, 0)}`);
  console.log('\n💡 See API_MIGRATION_GUIDE.md for migration instructions.\n');
}
