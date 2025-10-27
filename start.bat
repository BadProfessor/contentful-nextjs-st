@echo off
REM Local Development Quick Start Script for Windows
REM This script helps you quickly set up and run the Contentful CMS Tester locally

echo ====================================
echo Contentful CMS Tester - Local Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

node --version
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
) else (
    echo Dependencies already installed
    echo.
)

REM Ask if user wants to start the dev server
set /p start="Start development server? (y/n): "
if /i "%start%"=="y" (
    echo.
    echo Starting development server...
    echo Press Ctrl+C to stop
    echo.
    call npm run dev
) else (
    echo.
    echo To start the development server later, run:
    echo   npm run dev
    echo.
    echo Other useful commands:
    echo   npm run build    - Build for production
    echo   npm run preview  - Preview production build
    echo.
    pause
)
