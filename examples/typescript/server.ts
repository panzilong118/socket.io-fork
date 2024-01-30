import { Server } from "socket.io";

// const io = new Server(8080);
const io = new Server(8080, {
    cors: {
        origin: "http://localhost:3333"
      }
});

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    // socket.on("ping", (cb) => {
    //     console.log("ping");
    //     console.log(cb, '<----cb');
    //     cb();
    // });

    const os = require("os");

    /**
     * returns the percentage of free memory on the running machine
     * @return {double}
     */
    function available_memory() {
        const percentageMemUsed = (os.freemem() / os.totalmem()) * 100.0;
        return percentageMemUsed;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    setInterval(() => {
        const start = Date.now();
        const obj = {
            randomIntA: getRandomInt(100),
            randomIntB: getRandomInt(100),
            randomIntC: getRandomInt(100),
        };
        socket.emit("ping", obj, (res) => {
            console.log(`pong (latency: ${Date.now() - start} ms)`);
            console.log(res, '<-----res');
        });
    }, 1000);

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});
