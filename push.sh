#!/bin/bash
set -e

# Get token from environment
TOKEN="$GITHUB_TOKEN"

if [ -z "$TOKEN" ]; then
  echo "Error: GITHUB_TOKEN not set"
  exit 1
fi

# Configure git to use the token
git remote set-url origin "https://${TOKEN}@github.com/royalmewAlt/sakalla-font-editor.git"

# Push the code
echo "Pushing to GitHub..."
git push origin main --force 2>&1 | grep -E "To https|fatal|error|branch|remote|file"

if [ $? -eq 0 ]; then
  echo "Success! Code pushed to GitHub."
else
  echo "Checking git status..."
  git status
fi
