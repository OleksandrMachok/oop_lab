const fullArgs = process.argv;
const userArgs = fullArgs.slice(2);
userArgs.forEach(arg => {
    console.log(`ARG:${arg}`)
});