#!/bin/bash
echo "Starting Weather Dashboard..."
echo ""
cd "$(dirname "$0")"
catalyst serve
