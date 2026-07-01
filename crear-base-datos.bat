@echo off
cd /d "%~dp0Backend"
echo Creando base de datos etoile_blanche...
echo.
mysql -u root -P 3306 < database\schema.sql
pause
