const express = require('express');

const app = express();
const process = require('process');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    let nums = req.query.nums;
    if (nums == undefined || nums == '' || nums == null) {
        return res
            .status(400)
            .json('nums are required');
    }
    return next();
});

app.get('/mean', function(req, res) {
    let nums = req.query.nums;
    let numArr = nums.split(',');
    let total = 0;
    for (const num in numArr) {
        if (!/^(0|[1-9]\d*)$/.test(numArr[num])) {
            return res
                .status(400)
                .json(`${numArr[num]} is not a number`);
        }
        total = parseInt(numArr[num]) + total;
    }
    const sendStr = total/numArr.length;
    return res.json({operation: "mean", value: String(sendStr)});
})

app.get('/median', function(req, res) {
    let nums = req.query.nums;
    let numArr = nums.split(',');
    for (const num in numArr) {
        if (!/^(0|[1-9]\d*)$/.test(numArr[num])) {
            return res
                .status(400)
                .json(`${numArr[num]} is not a number`);
        }
    }
    numArr.sort(function(a,b) {
        return a-b;
    })
    const half = Math.floor(numArr.length / 2);

    if (numArr.length % 2) {
        return res.json({operation: "median", value: String(numArr[half])});
    }
    const sendStr = numArr[half - 1] + numArr[half] / 2.0;
    return res.json({operation: "median", value: String(sendStr)});
})

app.get('/mode', function(req, res) {
    let nums = req.query.nums;
    let numArr = nums.split(',');
    for (const num in numArr) {
        if (!/^(0|[1-9]\d*)$/.test(numArr[num])) {
            return res
                .status(400)
                .json(`${numArr[num]} is not a number`);
        }
    }
    const mode = numArr.sort((a,b) =>
        numArr.filter(v => v===a).length
      - numArr.filter(v => v===b).length
    ).pop();
    return res.json({operation: "mode", value: String(mode)});
})

// generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000 @ http://127.0.0.1:3000/")
});

module.exports = [app, process];