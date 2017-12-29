'use strict';

var _parser = require('gradle-to-js/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _compareVersion = require('compare-version');

var _compareVersion2 = _interopRequireDefault(_compareVersion);

var _mavenCentral = require('./maven-central');

var _mavenCentral2 = _interopRequireDefault(_mavenCentral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$usage$alias$ = require('yargs').usage('Usage: $0 -f [path]').alias('f', 'file').nargs('f', 1).describe('f', 'Gradle file to parse').demandOption(['f']),
    argv = _require$usage$alias$.argv; /* eslint-disable no-console */


_parser2.default.parseFile(argv.file).then(function (representation) {
    var _loop = function _loop(i) {
        var dep = representation.dependencies[i];
        (0, _mavenCentral2.default)(dep.group, dep.name).then(function (res) {
            if (res !== null) {
                if ((0, _compareVersion2.default)(res.latestVersion, dep.version) === 1) {
                    console.log('[+] New version of ' + dep.name + ': ' + dep.version + ' -> ' + res.latestVersion);
                }
            } else {
                console.log('No results for ' + dep.name);
            }
        }).catch(function (err) {
            console.log(dep.name + ':' + dep.version);
            console.error(err);
        });
    };

    for (var i = 0; i < representation.dependencies.length; i += 1) {
        _loop(i);
    }
});