# Created by: Michel Kohanim <michel@universal-devices.com>
# $FreeBSD: $

PORTNAME=		matter
PORTVERSION=	1.0.9
PORTREVISION=	0
CATEGORIES=		misc
MASTER_SITES=	https://udx.s3.amazonaws.com/pkg/${PORTVERSION}/
DISTNAME=		matter

MAINTAINER=	benoit@universal-devices.com
COMMENT= matter server

#LICENSE=        EULA
#CANNOT USR RUN DEPENDS ... if they remove any of the dependencies, this is removed as well. We cannot have this.
#RUN_DEPENDS= 	/var/isy

DISTDIR= ${.CURDIR}
#NEWSYSLOG_CONFDIR=${STAGEDIR}${PREFIX}/etc/newsyslog.conf.d

NO_BUILD=	yes

USE_RC_SUBR=	${PORTNAME}

# matter server has to run as polyglot
USERS=      polyglot
GROUPS=     polyglot

NO_WRKSUBDIR=	yes

TAR_FILE := matter.tar.gz

all: distclean build-matter makesum package

build-matter:
	@echo "Filesdir ${FILESDIR}"
	@echo "*** Cleaning build files ***"
	@rm -rf build
	@rm -f "files/${TAR_FILE}"
	@echo "*** Compiling ***"
	@cd ../../../ && lerna run build
	@echo "*** Copying required files to build ***"
	@mkdir -p build/bin
	@cp -r ../bin/* build/bin/
	@cp files/.env build/.env
	@cp ../package*.json build/
# we can copy the package-lock.json since it will only be used to verify the checksums of the dependencies
	@cp ../../../package-lock.json build/


#	@echo "*** Updating package lock ***"
#	@cd build && npm i --package-lock-only --workspaces=false

	@echo "*** Installing dependencies ***"
	@cd build && npm ci --omit=dev --workspaces=false

	@echo "*** Creating tar file ${TAR_FILE} ***"
  # We need the tar file in ./files for the do-install, but we also need it in . for makesum
	cd build && tar -czf ../files/${TAR_FILE} . && cp ../files/${TAR_FILE} ..

do-install:
	${MKDIR} ${STAGEDIR}${PREFIX}/etc/${PORTNAME}.d/files
	${INSTALL_DATA} ${FILESDIR}/${TAR_FILE} ${STAGEDIR}${PREFIX}/etc/${PORTNAME}.d/files/${TAR_FILE}

# .include <bsd.port.mk>
