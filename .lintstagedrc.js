const path = require('path')

const buildEslintCommand = (filenames) => {
    return `next lint --dir src/* --fix --file ${filenames
        .map((file) => path.relative(process.cwd(), file))
        .join(' --file ')}`
}

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand, "pretty-quick --write", "git add ."],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
        "pretty-quick --write--parser json"
        , "git add ."
    ],
    "package.json": [
        "pretty-quick --write"
        , "git add ."
    ],
    "*.md": [
        "pretty-quick --write"
        , "git add ."
    ]
}