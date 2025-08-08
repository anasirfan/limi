# Test script for middleware functionality
Write-Host "🧪 Testing Middleware Functionality" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Test 1: Normal localhost request (should go to main site)
Write-Host "`n1️⃣ Testing localhost (should serve main site):" -ForegroundColor Yellow
try {
    $response1 = Invoke-WebRequest -Uri "http://localhost:3002/" -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response1.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response1.Content.Length) characters"
    
    # Check if it contains limiai-specific content
    if ($response1.Content -match "LimiAI|limiai") {
        Write-Host "⚠️  WARNING: localhost is serving limiai content (unexpected)" -ForegroundColor Red
    } else {
        Write-Host "✅ Serving main site content (expected)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Simulated limiai.co root request (should redirect to /limiai)
Write-Host "`n2️⃣ Testing limiai.co root (should serve /limiai page):" -ForegroundColor Yellow
try {
    $response2 = Invoke-WebRequest -Uri "http://localhost:3002/" -Headers @{"Host"="limiai.co"} -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response2.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response2.Content.Length) characters"
    
    # Check if it contains limiai-specific content
    if ($response2.Content -match "LimiAI|limiai") {
        Write-Host "✅ Serving /limiai content (expected)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: limiai.co root is NOT serving /limiai content" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Test limiai.co/invest (should redirect to /limifuture)
Write-Host "`n3️⃣ Testing limiai.co/invest (should serve /limifuture page):" -ForegroundColor Yellow
try {
    $response3 = Invoke-WebRequest -Uri "http://localhost:3002/invest" -Headers @{"Host"="limiai.co"} -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response3.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response3.Content.Length) characters"
    
    if ($response3.Content -match "LimiFuture|limifuture") {
        Write-Host "✅ /invest serves /limifuture content (expected)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: limiai.co/invest is NOT serving /limifuture content" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Test a random path on limiai.co (should redirect to /limiai)
Write-Host "`n4️⃣ Testing limiai.co/random-path (should redirect to /limiai):" -ForegroundColor Yellow
try {
    $response4 = Invoke-WebRequest -Uri "http://localhost:3002/some-random-path" -Headers @{"Host"="limiai.co"} -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response4.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response4.Content.Length) characters"
    
    if ($response4.Content -match "LimiAI|limiai") {
        Write-Host "✅ Random paths on limiai.co serve /limiai content (expected)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: limiai.co random paths are NOT serving /limiai content" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🏁 Test Complete!" -ForegroundColor Green
Write-Host "💡 Check your Next.js dev server console for middleware logs" -ForegroundColor Cyan
Write-Host "🔍 Look for lines starting with 'Middleware executing:'" -ForegroundColor Cyan
