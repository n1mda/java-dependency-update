import fs from 'fs'

const options = {
    encoding: 'utf-8',
}

const update = (file, dependency) => {
    let content = fs.readFileSync(file, options).toString()

    const original = `${dependency.group}:${dependency.name}`
    const updated = `${original}:${dependency.newVersion}`

    content = content.replace(`${original}:${dependency.currentVersion}`, updated)

    fs.writeFileSync(file, content, options)
}

export { update as default }
