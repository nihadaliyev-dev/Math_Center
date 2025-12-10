# Create .env file from template
# This script helps create the .env file with required variables

Write-Host "🔧 Creating .env file..." -ForegroundColor Cyan

$EnvFile = ".env"
$ExampleFile = ".env.example"

# Check if .env already exists
if (Test-Path $EnvFile) {
    Write-Host "⚠️  .env file already exists!" -ForegroundColor Yellow
    $Overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($Overwrite -ne "y" -and $Overwrite -ne "Y") {
        Write-Host "Cancelled. Existing .env file preserved." -ForegroundColor Gray
        exit 0
    }
}

# Try to copy from example if it exists
if (Test-Path $ExampleFile) {
    Copy-Item $ExampleFile $EnvFile
    Write-Host "✅ Created .env from .env.example" -ForegroundColor Green
    Write-Host "`n⚠️  IMPORTANT: Edit .env and fill in your values:" -ForegroundColor Yellow
    Write-Host "   - DB_URL (MongoDB connection string)" -ForegroundColor Gray
    Write-Host "   - JWT_SECRET_KEY (long random string)" -ForegroundColor Gray
    Write-Host "`nOpening .env file for editing..." -ForegroundColor Cyan
    Start-Sleep -Seconds 1
    notepad $EnvFile
} else {
    # Create basic .env file
    $EnvContent = @"
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
# For local MongoDB:
DB_URL=mongodb://localhost:27017/math_center

# OR for MongoDB Atlas:
# DB_URL=mongodb+srv://username:password@cluster.mongodb.net/math_center?retryWrites=true&w=majority

DB_USERNAME=
DB_PASSWORD=

# Admin Account
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme

# Security (IMPORTANT: Change these!)
JWT_SECRET_KEY=CHANGE_THIS_TO_A_LONG_RANDOM_STRING_AT_LEAST_32_CHARACTERS
REGISTRATION_SECRET=your_registration_secret_key_2024

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
"@
    
    $EnvContent | Out-File -FilePath $EnvFile -Encoding utf8
    Write-Host "✅ Created basic .env file" -ForegroundColor Green
    Write-Host "`n⚠️  IMPORTANT: Edit .env and fill in your values:" -ForegroundColor Yellow
    Write-Host "   - DB_URL (MongoDB connection string)" -ForegroundColor Gray
    Write-Host "   - JWT_SECRET_KEY (generate a long random string)" -ForegroundColor Gray
    Write-Host "`nOpening .env file for editing..." -ForegroundColor Cyan
    Start-Sleep -Seconds 1
    notepad $EnvFile
}

Write-Host "`n✅ Done! After editing .env, restart your server." -ForegroundColor Green

