#!/bin/bash
set +e
SRCLOCATION=`dirname $0`
ACCEL_BASE_FOLDER=`dirname $SRCLOCATION`
CHILD_BASE_FOLDER=`pwd`
set -a
# source $CHILD_BASE_FOLDER/site.properties
source $SRCLOCATION/environmentSetup.sh

set +a

checkBuildDependencies

deployCode()
{
    PACKAGE_NAME=`echo $2 | tr '[:upper:]' '[:lower:]'`
    sfcc-ci client:auth
    case $PACKAGE_NAME in
        'newbuild')
            BUILDVERSION=GF-v`date +"%y.%m.%d.%H%M"`
            mkdir $BUILDVERSION && cp -R cartridges/* $BUILDVERSION && zip -r $BUILDVERSION.zip $BUILDVERSION  > /dev/null && rm -rf $BUILDVERSION
            ;;
		'brand')
			BUILDVERSION=`sfcc-ci code:list | grep true | cut -d " " -f2`
			mkdir $BUILDVERSION && cp -R cartridges/app_custom_$SITEID $BUILDVERSION && zip -r $BUILDVERSION.zip $BUILDVERSION  > /dev/null && rm -rf $BUILDVERSION
			echo "Deployment package created!"
			;;
        *)
            BUILDVERSION=`sfcc-ci code:list | grep true | cut -d " " -f2`
            mkdir $BUILDVERSION && cp -R cartridges/* $BUILDVERSION && zip -r $BUILDVERSION.zip $BUILDVERSION  > /dev/null && rm -rf $BUILDVERSION
            echo "Deployment package created!"
            ;;
    esac
    cd $CHILD_BASE_FOLDER
    sfcc-ci code:deploy $BUILDVERSION.zip --activate
    #sfcc-ci code:activate $BUILDVERSION
    rm $BUILDVERSION.zip
}

deployBMCR()
{
    cd $CHILD_BASE_FOLDER/metadata
    zip -r metadata.zip *
    cd $CHILD_BASE_FOLDER
    sfcc-ci client:auth
    sfcc-ci instance:upload metadata/metadata.zip -D
    sfcc-ci instance:import metadata.zip -s -D
    sfcc-ci job:run Reindex
    rm metadata/metadata.zip
}


case $1 in
    'code')
        deployCode $1 $2
        ;;
    'BMCR')
        deployBMCR 
        ;;
    *)
    echo "Nothing to deploy! Please pass 'code|BMCR' in paramenter."
    ;;
esac



set -e