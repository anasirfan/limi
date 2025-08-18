# Test script for middleware functionality
Write-Host "🧪 Testing Middleware Functionality" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Test 1: Normal localhost request (should go to main site)
Write-Host "`n1️⃣ Testing localhost (should serve main site):" -ForegroundColor Yellow
try {
    $response1 = Invoke-WebRequest -Uri "http://localhost:3002/" -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response1.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response1.Content.Length) characters"
    
    # Check if it contains assembly-specific content
    if ($response1.Content -match "Assembly|Edge AI Infrastructure") {
        Write-Host "⚠️  WARNING: localhost is serving assembly content (unexpected)" -ForegroundColor Red
    } else {
        Write-Host "✅ Serving main site content (expected)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Simulated limiai.co request (should redirect to /assembly)
Write-Host "`n2️⃣ Testing limiai.co simulation (should serve /assembly page):" -ForegroundColor Yellow
try {
    $response2 = Invoke-WebRequest -Uri "http://localhost:3002/" -Headers @{"Host"="limiai.co"} -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response2.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response2.Content.Length) characters"
    
    # Check if it contains assembly-specific content
    if ($response2.Content -match "Assembly|Edge AI Infrastructure") {
        Write-Host "✅ Serving assembly content (expected)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: limiai.co is NOT serving assembly content" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Test limiai.co/dashboard (should redirect to /assembly/dashboard)
Write-Host "`n3️⃣ Testing limiai.co/dashboard (should serve Assembly dashboard):" -ForegroundColor Yellow
try {
    $response3 = Invoke-WebRequest -Uri "http://localhost:3002/dashboard" -Headers @{"Host"="limiai.co"} -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response3.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response3.Content.Length) characters"
    
    # Check if it contains assembly dashboard content
    if ($response3.Content -match "Assembly Dashboard|Analytics, leads, and performance monitoring") {
        Write-Host "✅ Serving Assembly dashboard content (expected)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: limiai.co/dashboard is NOT serving Assembly dashboard" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Test a specific path on limiai.co
Write-Host "`n4️⃣ Testing limiai.co/invest (should redirect to /limifuture):" -ForegroundColor Yellow
try {
    $response4 = Invoke-WebRequest -Uri "http://localhost:3002/invest" -Headers @{"Host"="limiai.co"} -Method GET -TimeoutSec 10
    Write-Host "✅ Status: $($response4.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Content length: $($response4.Content.Length) characters"
    
    if ($response4.Content -match "LimiFuture|Investor") {
        Write-Host "✅ limiai.co/invest serves LimiFuture content (expected)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: limiai.co/invest is NOT serving LimiFuture content" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🏁 Test Complete!" -ForegroundColor Green
Write-Host "💡 Check your Next.js dev server console for middleware logs" -ForegroundColor Cyan
Write-Host "🔍 Look for lines starting with 'Middleware executing:'" -ForegroundColor Cyan
