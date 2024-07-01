set +e
WORKING_FOLDER=`pwd`
SFCC_REPO_CACHE=$ACCEL_BASE_FOLDER/.sfccRepo
BASE_FOLDER=$WORKING_FOLDER
CHILD_BASE_FOLDER=`pwd`
ACCEL_PARENT_BASE=''
ACCEL_PARENT_TYPE=''

#Checking node version if >=18.16.0 then exit, the tools were successfully tested with 18.19.0
checkNodeVersion() {
    
    NODE_VERSION=`node -v`
    if [ $NODE_VERSION \> v18.16.0 ]
    then
        echo "Node Version Check Passed!"
   else
        echo "accel tools are compatible with only Node.js version 18.19.0. Please install a Node.js version <18.19.0 before running accel build!"
    fi
}

#Clone gow and add to ENV for windows
setUpGowForWindows() {

    if [[ "$OSTYPE" == "msys" ]]
    then
		if [ ! -d "$ACCEL_BASE_FOLDER/.sfccRepo/gow" ]
		then
			SFRA_BASE_VERSION_URL=https://github.com/bmatzelle/gow.git
			cd $ACCEL_BASE_FOLDER/.sfccRepo
			git clone --single-branch $SFRA_BASE_VERSION_URL
		fi

		setx PATH "%PATH%;$ACCEL_BASE_FOLDER/.sfccRepo/gow/bin"
    fi
}

checkBuildDependencies()
{
    checkNodeVersion
	setUpGowForWindows
}
set -e