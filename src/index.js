/* eslint-disable no-console */
import g2js from 'gradle-to-js/lib/parser'
import compareVersion from 'compare-version'

import mavenSearch from './maven-central'

g2js.parseFile('./example.gradle').then((representation) => {
    for (let i = 0; i < representation.dependencies.length; i += 1) {
        const dep = representation.dependencies[i]
        mavenSearch(dep.group, dep.name)
            .then((res) => {
                if (res !== null) {
                    if (compareVersion(res.latestVersion, dep.version) === 1) {
                        console.log(`[+] New version of ${dep.name}: ${dep.version} -> ${res.latestVersion}`)
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
