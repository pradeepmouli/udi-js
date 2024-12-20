#!/usr/bin/env bash

TAR="matter.tar.gz"

# Create tar file with specified files and profile directory
tar -czf ${TAR}  *.py *.md install.sh requirements.txt LICENSE profile/*

echo "Created ${TAR}"
