const axios = require('axios');
const querystring = require('querystring')

async function publicCall(path, data, method = 'GET') {
    try {
        // console.log(new URLSearchParams.toString(data), '---------------')
        // console.log(new URLSearchParams(data).toString(), '---------------2')
        const qs = data ? `?${new URLSearchParams(data).toString()}` :  '';
        // const qs = new URLSearchParams(data);
        // console.log(qs.toString(), '-----------')
        const result = await axios({
            method,
            url: `${process.env.API_URL}${path}${qs}`
        })
        return result.data
    } catch (error) {
        console.log(error)
    }
}

async function time() {
    return publicCall('/v3/time');
}

module.exports = { time }