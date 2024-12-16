#!/bin/sh

# Step 1: Extract version from Makefile
VERSION=$(grep "PORTVERSION=" Makefile | cut -d'=' -f2 | tr -d '[:space:]')

if [ -z "$VERSION" ]; then
    echo "Error: Could not extract version from Makefile"
    exit 1
fi

echo "matter-server version: $VERSION"

# Step 2: Copy the pkg to bsdev14
PKG_FILE="work/pkg/matter-server-${VERSION}.pkg"

if [ ! -f "$PKG_FILE" ]; then
    echo "Error: Package file $PKG_FILE not found"
    exit 1
fi

echo "Copying $PKG_FILE to bsdev14..."
scp "$PKG_FILE" bsdev14:matter-server-"${VERSION}".pkg

if [ $? -ne 0 ]; then
    echo "Error: Failed to copy package to bsdev14"
    exit 1
fi

# Step 3 and 4: Login to remote system and run commands
echo "Logging into bsdev14"
ssh -t bsdev14 << EOF
bash
# Need to have PATH updated
source /home/ec2-user/.bashrc

echo "Move to staging: /home/ec2-user/matter-server-${VERSION}.pkg"
os.ops move.package.to.staging /home/ec2-user/matter-server-${VERSION}.pkg

echo "Move to production: /home/ec2-user/matter-server-${VERSION}.pkg"
os.ops move.ud.packages.to.production /home/ec2-user/matter-server.pkg.list
EOF

if [ $? -ne 0 ]; then
    echo "Error: Failed to execute remote commands"
    exit 1
fi

echo "Script completed successfully"
