@echo off

REM Get the full path of the script's directory (Token-Manager root)
set "ROOT_PATH=%~dp0"

REM Set paths to React, Spring Boot App 1, and Spring Boot App 2
set "REACT_APP_PATH=%ROOT_PATH%frontend"
set "SPRING_APP_1_PATH=%ROOT_PATH%generator"
set "SPRING_APP_2_PATH=%ROOT_PATH%validator"

REM Navigate to the directories of your applications and start them
cd /d "%REACT_APP_PATH%"
start cmd /k npm start

cd /d "%SPRING_APP_1_PATH%"
start cmd /k mvn spring-boot:run

cd /d "%SPRING_APP_2_PATH%"
start cmd /k mvn spring-boot:run
