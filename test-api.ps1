# Test the Referral API
$uri = "http://localhost:3000/api/referral"
$body = @{
    name = "Test User"
    email = "test@example.com"
    phone = "0400000000"
    referralReason = "Testing the API"
} | ConvertTo-Json

Write-Host "Testing Referral API..." -ForegroundColor Yellow
Write-Host "URL: $uri" -ForegroundColor Cyan
Write-Host "Body: $body" -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $uri -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $responseBody = $reader.ReadToEnd()
    Write-Host "Response: $responseBody" -ForegroundColor Red
    Write-Host ""
    Write-Host "Full Error: $($_.Exception.Message)" -ForegroundColor Red
}

