module.exports = {
    apps: [
        {
            name: "dbasana",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
            }
        }
    ]
}