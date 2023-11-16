@REM Arrancamos el cmd y dentro ejecutamos el servidor de nuestra base de datos
start cmd.exe /k "cd C:\Program Files\MongoDB\Server\7.0\bin && mongod.exe"

@REM Arrancamos el cmd y dentro nos dirigimos a la ruta de nuestro proyecto de api y lo ejecutamos
start cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Telef_proyect\Telefonica_api_rest && npm start"

@REM Arrancamos el cmd y dentro nos dirigimos a la ruta de nuestro proyecto frontend y lo ejecutamos
start cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Telef_proyect\Telefonica\telefonica && npm run dev"

@REM Arrancamos el cmd y dentro ejecutamos el siguiente comando que accede a dicha url en el navegador

:: Abre una URL en el navegador
start "" "http://localhost:5173/"

:: Espera a que se cierre la ventana del navegador
timeout /t 5 > nul

:: Cerrar la ventana del CMD
exit
