const Exports = require("./app.js");
const app = Exports[0];
const process = Exports[1];
const axios = require('axios');

test('when no value is passed for nums the app should raise an error', async function() {
    try {
        await axios.get('http://127.0.0.1:3000/mean')
    } catch (error) {
        expect(error.response.status).toEqual(400)
        expect(error.response.data).toEqual("nums are required")
    }
})

test('passing a value that is not a number into nums should raise the correct error', async function() {
    try {
        await axios.get('http://127.0.0.1:3000/mean?nums=something')
    } catch (error) {
        expect(error.response.status).toEqual(400)
        expect(error.response.data).toEqual("something is not a number")
    }
})

test('test the mean route with valid nums', async function() {
    const response = await axios.get('http://127.0.0.1:3000/mean?nums=1,2,3,4,5')
    expect(response.status).toEqual(200)
    expect(response.data['operation']).toEqual("mean")
    expect(response.data['value']).toEqual("3")
})

test('test the median route with valid nums', async function() {
    const response = await axios.get('http://127.0.0.1:3000/median?nums=1,2,3,4,5,10,100')
    expect(response.status).toEqual(200)
    expect(response.data['operation']).toEqual("median")
    expect(response.data['value']).toEqual("4")
})

test('test the mode route with valid nums', async function() {
    const response = await axios.get('http://127.0.0.1:3000/mode?nums=1,42,2,42,3,42,4,42,5,42')
    expect(response.status).toEqual(200)
    expect(response.data['operation']).toEqual("mode")
    expect(response.data['value']).toEqual("42")
})
