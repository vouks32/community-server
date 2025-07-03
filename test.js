let timetilNext10s = 10 - ((new Date()).getSeconds() % 10)

console.log('Waiting for', timetilNext10s)

setTimeout(() => {
    setInterval(() => {
        console.log('10 secs when by')
    }, 10000)
}, timetilNext10s * 1000)