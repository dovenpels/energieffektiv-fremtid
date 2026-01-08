@echo off
echo Starting Tailwind CSS watch mode...
echo Press Ctrl+C to stop
echo.
tailwindcss-windows-x64.exe -i ./css/input.css -o ./css/output.css --watch
