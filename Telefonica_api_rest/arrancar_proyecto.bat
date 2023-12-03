@echo off

:: Arrancamos el cmd y dentro ejecutamos el servidor de nuestra base de datos
start "MongoDB" cmd.exe /k "cd C:\Program Files\MongoDB\Server\7.0\bin && mongod.exe"

:: Espera un momento para que MongoDB se inicie
timeout /t 5 > nul

:: Arrancamos el cmd y dentro nos dirigimos a la ruta de nuestro proyecto de API y lo ejecutamos
start "API" cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Telef_proyect\Telefonica_api_rest && npm start"

:: Arrancamos el cmd y dentro nos dirigimos a la ruta de nuestro proyecto frontend y lo ejecutamos
start "Frontend" cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Telef_proyect\Telefonica\telefonica && npm run dev"

:: Arrancamos el cmd y dentro ejecutamos el siguiente comando que accede a dicha URL en el navegador
start "" "http://localhost:5173/"

:: Espera a que se cierre la ventana del navegador
timeout /t 5 > nul

:: Cerrar la ventana del CMD
exit
