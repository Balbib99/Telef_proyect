@echo off

:: Detener el servidor de MongoDB
taskkill /IM mongod.exe /F

:: Detener el servidor de API
taskkill /IM node.exe /F

:: Cerrar las ventanas CMD específicas
taskkill /FI "WINDOWTITLE eq MongoDB" /F
taskkill /FI "WINDOWTITLE eq API" /F
taskkill /FI "WINDOWTITLE eq Frontend" /F

:: Intentar cerrar la ventana de MongoDB por el título original o parte del texto que la identifique
taskkill /FI "WINDOWTITLE eq mongod.exe" /F

echo Procesos detenidos
pause
