function dfs(node, fn, level = 0) {
    fn(node, level)
    if (node.children) {
        node.children.forEach(function(child) {
            dfs(child, fn, level + 1)
        })
    }
}

function bfs(root, fn) {
    function processLevel(nodes, level) {
        let nextLevelNodes = []
        nodes.forEach(node => {
            fn(node, level)
            if (node.children) {
                nextLevelNodes = nextLevelNodes.concat(node.children)
            }
        })
        if (nextLevelNodes.length > 0) {
            processLevel(nextLevelNodes, level + 1)
        }
    }
    fn(root, 0)
    processLevel(root.children, 1)
}

// example
const georgia = {
    name: 'Georgia',
    children: [
        {
            name: 'Cobb',
            children: [
                { name: 'Marietta' },
                { name: 'Smyrna' },
                { name: 'Kennesaw' }
            ]
        },
        {
            name: 'Gwinnett',
            children: [
                { name: 'Duluth' },
                { name: 'Lawrenceville' },
                { name: 'Norcross' },
                { name: 'Suwanee' }
            ]
        }
    ]
}

console.log('dfs:')
dfs(georgia, (area, level) => console.log(' '.repeat(level * 2), area.name))

console.log('bfs:')
bfs(georgia, (area, level) => console.log(' '.repeat(level * 2), area.name))
