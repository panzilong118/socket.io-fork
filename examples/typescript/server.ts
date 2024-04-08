import { Server } from "socket.io";
import { tankCar } from './tankCar'

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
        const lowPumpTableData = [
            {
              lowPumpName: 'TK-P-0401A',
              runStatus: '启动',
              pumpSwitch: '启动',
              output: getRandomInt(50),
              flow: getRandomInt(500),
            },
            {
              lowPumpName: 'TK-P-0401B',
              runStatus: '停止',
              pumpSwitch: '停止',
              output: getRandomInt(10),
              flow: getRandomInt(10),
            },
            {
              lowPumpName: 'TK-P-0401C',
              runStatus: '停止',
              pumpSwitch: '停止',
              output: getRandomInt(10),
              flow: getRandomInt(10),
            },
            {
              lowPumpName: 'TK-P-0401D',
              runStatus: '启动',
              pumpSwitch: '启动',
              output: getRandomInt(50),
              flow: getRandomInt(500),
            },
            {
              lowPumpName: 'TK-P-0401E',
              runStatus: '停止',
              pumpSwitch: '停止',
              output: getRandomInt(10),
              flow: getRandomInt(10),
            },
            {
              lowPumpName: 'TK-P-0401F',
              runStatus: '启动',
              pumpSwitch: '启动',
              output: getRandomInt(50),
              flow: getRandomInt(500),
            },
            {
              lowPumpName: 'TK-P-0401H',
              runStatus: '停止',
              pumpSwitch: '停止',
              output: getRandomInt(10),
              flow: getRandomInt(10),
            },
            {
              lowPumpName: 'TK-P-0401J',
              runStatus: '停止',
              pumpSwitch: '停止',
              output: getRandomInt(10),
              flow: getRandomInt(10),
            },
            {
              lowPumpName: 'TK-P-0401K',
              runStatus: '停止',
              pumpSwitch: '停止',
              output: getRandomInt(10),
              flow: getRandomInt(10),
            }
          ];
        const obj = {
            a: getRandomInt(10),
            b: getRandomInt(10),
        };
        socket.emit("lowPump", lowPumpTableData, (res) => {
            console.log(`pong (latency: ${Date.now() - start} ms)`);
            console.log(res, '<-----res');
        });
        socket.emit("recommendTime", obj, (res) => {
            console.log(`tankCarTable (latency: ${Date.now() - start} ms)`);
            console.log(res, '<-----res');
        });
        socket.emit("tankCar", tankCar, (res) => {
          console.log(`tankCar (latency: ${Date.now() - start} ms)`);
          console.log(res, '<-----res');
      });
    }, 1000 * 10);

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});
