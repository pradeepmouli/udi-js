#!/bin/sh

VERSION=$(grep "PORTVERSION=" Makefile | cut -d'=' -f2 | tr -d '[:space:]')

if [ -z "$VERSION" ]; then
    echo "Error: Could not extract version from Makefile"
    exit 1
fi

echo "matter-server version: $VERSION"

# Install the pkg locally
PKG_FILE="work/pkg/matter-${VERSION}.pkg"
pkg add -f "${PKG_FILE}"

service matter restart
