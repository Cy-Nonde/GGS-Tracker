#!/usr/bin/env node
/**
 * CSC4035 Final Project - Visible Tests
 *
 * These tests check basic functionality and structure requirements.
 * Hidden tests will check edge cases and advanced features after deadline.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const results = {
    passed: 0,
    failed: 0,
    tests: []
};

async function test(name, fn) {
    try {
        await fn();
        results.passed++;
        results.tests.push({ name, status: 'passed' });
        console.log(`  ✓ ${name}`);
    } catch (error) {
        results.failed++;
        results.tests.push({ name, status: 'failed', error: error.message });
        console.log(`  ✗ ${name}`);
        console.log(`    Error: ${error.message}`);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// Helper to make HTTP requests
function makeRequest(options) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: data ? JSON.parse(data) : null
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: data
                    });
                }
            });
        });
        req.on('error', reject);
        if (options.body) {
            req.write(JSON.stringify(options.body));
        }
        req.end();
    });
}

async function runTests() {
    console.log('\n=== CSC4035 Final Project - Visible Tests ===\n');

    // =========================================================================
    // STRUCTURE TESTS
    // =========================================================================
    console.log('Structure Tests:');

    await test('server/server.js exists', () => {
        assert(fs.existsSync('server/server.js'), 'server/server.js not found');
    });

    await test('server/server.js has actual content (not empty)', () => {
        const content = fs.readFileSync('server/server.js', 'utf8');
        assert(content.length > 100, 'server/server.js appears to be empty or minimal');
        assert(/require|import|function|class/.test(content), 'server/server.js missing actual code');
    });

    await test('public/index.html exists', () => {
        assert(fs.existsSync('public/index.html'), 'public/index.html not found');
    });

    await test('public/css/styles.css exists', () => {
        assert(fs.existsSync('public/css/styles.css'), 'public/css/styles.css not found');
    });

    await test('public/css/styles.css has actual styling (not empty)', () => {
        const content = fs.readFileSync('public/css/styles.css', 'utf8');
        assert(content.length > 50, 'styles.css appears to be empty or minimal');
        assert(/[.#][\w-]+\s*\{|@media/.test(content), 'styles.css missing actual CSS rules');
    });

    await test('public/js/app.js exists', () => {
        assert(fs.existsSync('public/js/app.js'), 'public/js/app.js not found');
    });

    await test('public/js/app.js has actual content (not empty)', () => {
        const content = fs.readFileSync('public/js/app.js', 'utf8');
        assert(content.length > 100, 'app.js appears to be empty or minimal');
        assert(/function|const|let|class|async/.test(content), 'app.js missing actual JavaScript');
    });

    await test('package.json has start script', () => {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        assert(pkg.scripts && pkg.scripts.start, 'package.json missing start script');
    });

    // =========================================================================
    // HTML TESTS
    // =========================================================================
    console.log('\nHTML Tests:');

    await test('HTML has proper doctype', () => {
        const html = fs.readFileSync('public/index.html', 'utf8');
        assert(html.toLowerCase().includes('<!doctype html>'), 'Missing DOCTYPE');
    });

    await test('HTML has lang attribute with actual language', () => {
        const html = fs.readFileSync('public/index.html', 'utf8');
        assert(/lang\s*=\s*["'][a-z]{2}["']/i.test(html), 'Missing or empty lang attribute');
    });

    await test('HTML has viewport meta tag', () => {
        const html = fs.readFileSync('public/index.html', 'utf8');
        assert(/viewport.*content\s*=\s*/.test(html), 'Missing or empty viewport meta tag');
    });

    await test('HTML has all three semantic elements', () => {
        const html = fs.readFileSync('public/index.html', 'utf8');
        const hasHeader = /<header/i.test(html);
        const hasMain = /<main/i.test(html);
        const hasFooter = /<footer/i.test(html);
        assert(hasHeader && hasMain && hasFooter, 'Missing semantic elements (header, main, footer)');
    });

    await test('HTML links CSS and JS files', () => {
        const html = fs.readFileSync('public/index.html', 'utf8');
        const hasCSS = /link[^>]*href[^>]*(css|styles)/i.test(html);
        const hasJS = /<script[^>]*src[^>]*(js|app)/i.test(html) || /<script[^>]*>[^<]*(document|window|function)/i.test(html);
        assert(hasCSS && hasJS, 'HTML should link to CSS and include JavaScript');
    });

    // =========================================================================
    // CSS TESTS
    // =========================================================================
    console.log('\nCSS Tests:');

    await test('CSS uses custom properties with values', () => {
        const css = fs.readFileSync('public/css/styles.css', 'utf8');
        assert(/--[\w-]+\s*:\s*[^;]+;/.test(css), 'CSS custom properties found but not properly defined');
    });

    await test('CSS has media queries with rules', () => {
        const css = fs.readFileSync('public/css/styles.css', 'utf8');
        assert(/@media[^{]*\{[^}]+\}/s.test(css), 'Media queries found but appear empty');
    });

    await test('CSS uses flexbox or grid with actual layout', () => {
        const css = fs.readFileSync('public/css/styles.css', 'utf8');
        const flexMatch = /display\s*:\s*flex\s*;[^}]*(justify|align|flex)/.test(css);
        const gridMatch = /display\s*:\s*grid\s*;[^}]*(grid-template|grid-column|grid-row)/.test(css);
        assert(flexMatch || gridMatch, 'Flexbox or grid found but not properly configured');
    });

    await test('CSS has meaningful styling (not just whitespace/empty)', () => {
        const css = fs.readFileSync('public/css/styles.css', 'utf8');
        const rules = css.match(/[.#][\w-]+\s*\{[^}]*\}/g) || [];
        assert(rules.length >= 5, 'CSS should have at least 5 style rules');
    });

    // =========================================================================
    // JAVASCRIPT TESTS
    // =========================================================================
    console.log('\nJavaScript Tests:');

    await test('JS uses const/let (not var)', () => {
        const js = fs.readFileSync('public/js/app.js', 'utf8');
        const usesVar = /\bvar\s+\w/.test(js);
        assert(!usesVar, 'Using var instead of const/let');
    });

    await test('JS uses const or let declarations', () => {
        const js = fs.readFileSync('public/js/app.js', 'utf8');
        const hasConstOrLet = /\b(const|let)\s+\w+\s*=/.test(js);
        assert(hasConstOrLet, 'Missing const or let variable declarations');
    });

    await test('JS has async/await with actual functionality', () => {
        const js = fs.readFileSync('public/js/app.js', 'utf8');
        const hasAsync = /async\s+(function|\()|async\s*\(.*?\)\s*=>/.test(js);
        const hasAwait = /await\s+(fetch|fetch\(|Promise)/.test(js);
        assert((hasAsync && hasAwait) || /fetch\([^)]*\)\.then/.test(js),
            'Should use async/await or fetch with .then pattern');
    });

    await test('JS has event listeners attached to elements', () => {
        const js = fs.readFileSync('public/js/app.js', 'utf8');
        assert(/\.addEventListener\s*\(\s*['"][a-z]+['"]/.test(js), 'Event listeners should be properly attached');
    });

    await test('JS should have meaningful functions (not just empty stubs)', () => {
        const js = fs.readFileSync('public/js/app.js', 'utf8');
        const functions = js.match(/(function|const|let)\s+\w+\s*(\(|=)\s*[^{]*\{[^}]+\}/g) || [];
        assert(functions.length >= 2, 'Should have at least 2 meaningful functions');
    });

    // =========================================================================
    // API TESTS (requires server running)
    // =========================================================================
    console.log('\nAPI Tests:');

    // Start server for API tests
    let server;
    let serverStarted = false;

    try {
        // Fork a process to run the server
        const { spawn } = require('child_process');
        server = spawn('node', ['server/server.js'], {
            stdio: 'pipe',
            detached: true
        });

        // Wait for server to start
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Health check to verify server is running
        try {
            const healthRes = await makeRequest({
                hostname: 'localhost',
                port: 3000,
                path: '/api/health',
                method: 'GET'
            });
            if (healthRes.status === 200) {
                serverStarted = true;
            }
        } catch (e) {
            // Server didn't respond to health check
            serverStarted = false;
        }
    } catch (error) {
        console.log(`  ! Server startup failed: ${error.message}`);
        serverStarted = false;
    }

    // API health endpoint test
    await test('API health endpoint works', async () => {
        assert(serverStarted, 'Server failed to start');
        const res = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/api/health',
            method: 'GET'
        });
        assert(res.status === 200, `Expected 200, got ${res.status}`);
        assert(res.body && res.body.success === true, 'Health check should return success');
    });

    // GET items test
    await test('GET /api/items returns array with data', async () => {
        assert(serverStarted, 'Server failed to start');
        const res = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/api/items',
            method: 'GET'
        });
        assert(res.status === 200, `Expected 200, got ${res.status}`);
        assert(res.body && res.body.success === true, 'Should return success');
        assert(Array.isArray(res.body.data), 'Data should be an array');
        assert(res.body.data.length >= 0, 'Data array should be accessible');
    });

    // POST item test
    await test('POST /api/items creates item with proper response', async () => {
        assert(serverStarted, 'Server failed to start');
        const res = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/api/items',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { name: 'Test Item' }
        });
        assert(res.status === 201, `Expected 201, got ${res.status}`);
        assert(res.body && res.body.success === true, 'Should return success');
        assert(res.body.data && res.body.data.id, 'Created item should have id');
        assert(res.body.data && res.body.data.name === 'Test Item', 'Item name should match');
    });

    // POST validation test
    await test('POST /api/items validates input (rejects empty name)', async () => {
        assert(serverStarted, 'Server failed to start');
        const res = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/api/items',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { name: '' }
        });
        assert(res.status === 400, `Expected 400 for invalid input, got ${res.status}`);
        assert(res.body && res.body.success === false, 'Should indicate failure');
    });

    // 404 handler test
    await test('API returns 404 for unknown endpoints', async () => {
        assert(serverStarted, 'Server failed to start');
        const res = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/api/nonexistent',
            method: 'GET'
        });
        assert(res.status === 404, `Expected 404, got ${res.status}`);
    });

    // Static files test
    await test('Server serves static files', async () => {
        assert(serverStarted, 'Server failed to start');
        const res = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/',
            method: 'GET'
        });
        assert(res.status === 200, `Expected 200, got ${res.status}`);
    });

    // Cleanup server safely
    if (server && server.pid) {
        try {
            process.kill(-server.pid, 'SIGTERM');
        } catch (e) {
            // Server process already exited — ignore
        }
    }

    // =========================================================================
    // RESULTS
    // =========================================================================
    console.log('\n=== Results ===');
    console.log(`Passed: ${results.passed}`);
    console.log(`Failed: ${results.failed}`);
    console.log(`Score: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%\n`);

    // Exit with error code if any tests failed
    process.exit(results.failed > 0 ? 1 : 0);
}

runTests().catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
});
