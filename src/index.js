/* eslint-disable no-console */
import g2js from 'gradle-to-js/lib/parser'
import compareVersion from 'compare-version'

import mavenSearch from './maven-central'
import update from './update'

const { argv } = require('yargs')
    .usage('Usage: $0 -f [path]')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Gradle file to parse')
    .default('f', 'example.gradle')
    .demandOption(['f'])

g2js.parseFile(argv.file).then((representation) => {
    for (let i = 0; i < representation.dependencies.length; i += 1) {
        const dep = representation.dependencies[i]
        mavenSearch(dep.group, dep.name)
            .then((res) => {
                if (res !== null) {
                    if (compareVersion(res.latestVersion, dep.version) === 1) {
                        console.log(`[+] New version of ${dep.name}: ${dep.version} -> ${res.latestVersion}`)

                        const u = {
                            group: dep.group,
                            name: dep.name,
                            currentVersion: dep.version,
                            newVersion: res.latestVersion,
                        }

                        update(argv.file, u)
                    }
                } else {
                    console.log(`No results for ${dep.name}`)
                }
            })
            .catch((err) => {
                console.log(`${dep.name}:${dep.version}`)
                console.error(err)
            })
    }
})
