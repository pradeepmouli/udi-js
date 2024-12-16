# Publishing a new release

1. Edit the Makefile
   - Set the version
2. Edit pkg-descr
   - Update the release notes with the new release
3. make
4. Testing: Install the pkg locally
   - sudo ./install.sh 
5. ./publish.sh
