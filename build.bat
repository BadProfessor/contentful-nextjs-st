@echo off
REM Production Build and Deployment Script for Windows
REM This script builds the app and shows deployment options

echo ================================================
echo Building Contentful CMS Tester for Production
echo ================================================
echo.

REM Clean previous build
if exist "dist" (
    echo Cleaning previous build...
    rmdir /s /q dist
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm ci
)

REM Build the application
echo Building application...
call npm run build

echo.
echo Build completed successfully!
echo Build output is in the 'dist' folder
echo.

REM Deployment options
echo Deployment Options:
echo ===================
echo.
echo 1. Vercel (Recommended)
echo    Run: vercel --prod
echo    Or: vercel deploy --prod
echo.
echo 2. Netlify
echo    Run: netlify deploy --prod --dir=dist
echo.
echo 3. Docker
echo    Run: docker build -t contentful-cms-tester .
echo    Then: docker run -p 8080:80 contentful-cms-tester
echo.
echo 4. Manual Upload
echo    Upload the contents of the 'dist' folder to your hosting provider
echo.

REM Ask if user wants to preview
set /p preview="Preview the production build locally? (y/n): "
if /i "%preview%"=="y" (
    echo.
    echo Starting preview server...
    echo Press Ctrl+C to stop
    call npm run preview
) else (
    echo.
    echo To preview the build later, run:
    echo   npm run preview
    pause
)
