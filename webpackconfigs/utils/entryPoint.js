const path = require('path');
const glob = require('fast-glob');
const rimraf = require('rimraf');

const getEntries = function (params) {
    const {cartridgeList, srcExt, destExt, subFolder, exclude} = params;
    const entryObj = {};
    const localeRegex  = new RegExp(`client\/(.*?)\/${srcExt}`);

    cartridgeList.forEach(cartridge => {
        let srcPathList;
        const deleteOutFolder = glob.sync(`./cartridges/${cartridge}/cartridge/client/**/${srcExt}/`, { onlyDirectories: true });

        if(destExt === 'svg') {
            __webpack_public_path__ = `./cartridges/${cartridge}/cartridge/templates/default/${srcExt}/`;
            deleteOutFolder.push(__webpack_public_path__);
        }

        deleteOutFolder.forEach(function(item, index) {
            const outFolderToBeDeleted =  item.replace('client', 'static');

            rimraf(outFolderToBeDeleted, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`\x1b[46m Folder deleted: \x1b[44m ${outFolderToBeDeleted} \x1b[0m`);
                }
            });
        });

        if (subFolder) {
            srcPathList =  glob.sync(`./cartridges/${cartridge}/cartridge/client/**/${srcExt}/**/*.${srcExt}`);
        } else {
            srcPathList =  glob.sync(`./cartridges/${cartridge}/cartridge/client/**/${srcExt}/*.${srcExt}`);
        }

        if (exclude) {
            srcPathList = srcPathList.filter(item => !item.toString().match(exclude));
        }

        srcPathList.forEach(srcPath => {
            const locale = srcPath.match(localeRegex)[1];
            const srcFileName = path.basename(srcPath, `.${srcExt}`);
            let outPath = `${path.dirname(srcPath.replace(localeRegex, `static/${locale}/${destExt}`))}/${srcFileName}`;

            entryObj[outPath] = srcPath;
        });
    });

    return entryObj;
};

module.exports = getEntries;