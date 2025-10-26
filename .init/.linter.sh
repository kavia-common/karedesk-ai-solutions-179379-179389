#!/bin/bash
cd /home/kavia/workspace/code-generation/karedesk-ai-solutions-179379-179389/karedesk_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

