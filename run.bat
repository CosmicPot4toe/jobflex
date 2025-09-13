@ECHO OFF
ECHO #################################
ECHO #      JobFlex Run Script       #
ECHO #################################
ECHO.

REM Check if venv directory exists
IF NOT EXIST venv (
    ECHO [+] Creating virtual environment...
    python -m venv venv
    ECHO.
    ECHO [+] Installing requirements...
    call venv\Scripts\pip.exe install -r reqs.txt
    ECHO.
    ECHO [+] Requirements installed.
    ECHO.
)

ECHO [+] Starting Django development server...
ECHO    Access the application at http://127.0.0.1:8000/
ECHO    Press CTRL+C to stop the server.
ECHO.
call venv\Scripts\python.exe Jobflex\manage.py runserver

PAUSE
