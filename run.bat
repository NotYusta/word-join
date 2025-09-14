
@echo off
echo.
call npm i
call npm run build
call node index.js
pause