@echo off

:: Detener el servidor de MongoDB
taskkill /IM mongod.exe /F

:: Detener el servidor de API
taskkill /IM node.exe /F

:: Cerrar las ventanas CMD específicas por el título de la ventana
taskkill /FI "WINDOWTITLE eq MongoDB" /F
taskkill /FI "WINDOWTITLE eq API" /F
taskkill /FI "WINDOWTITLE eq Frontend" /F

:: Intentar cerrar la ventana de MongoDB por el título original o parte del texto que la identifique
taskkill /FI "WINDOWTITLE eq mongod.exe" /F

:: Esperar un momento para que los procesos se cierren completamente
timeout /t 5 > nul

:: Intentar cerrar las ventanas CMD por el nombre del ejecutable
taskkill /FI "IMAGENAME eq cmd.exe" /F

echo Procesos detenidos
pause
