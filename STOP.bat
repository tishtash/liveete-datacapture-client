@ECHO OFF
PAUSE

ECHO 'STOPPING SERVER.......'
call pm2 stop liveeye-data-receiver
ECHO 'STEP COMPLETED'

ECHO 'REMOVING PROCESS FROM WINDOWS STARTUP.....'
call pm2 delete liveeye-data-receiver
ECHO 'STEP COMPLETED'

PAUSE
cmd /k