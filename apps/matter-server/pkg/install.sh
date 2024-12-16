#!/bin/sh

VERSION=$(grep "PORTVERSION=" Makefile | cut -d'=' -f2 | tr -d '[:space:]')

if [ -z "$VERSION" ]; then
    echo "Error: Could not extract version from Makefile"
    exit 1
fi

echo "matter-server version: $VERSION"

# Step 2: Copy the pkg to bsdev14
PKG_FILE="work/pkg/matter-server-${VERSION}.pkg"

pkg add -f "${PKG_FILE}"

service matter-server restart
