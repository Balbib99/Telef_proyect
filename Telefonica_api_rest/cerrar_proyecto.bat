@echo off

:: Detener el servidor de MongoDB
taskkill /IM mongod.exe /F

:: Detener el servidor de API
taskkill /IM node.exe /F

:: No es posible detener la solicitud curl directamente desde este archivo .bat

echo Procesos detenidos
pause
