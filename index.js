const AWS = require("aws-sdk");

const defaultOptions = {
    accessKeyId: null
    , secretAccessKey: null
    , bucketName: null
    , bucketRegion: null
    , directory: "acme-challenge/"
    , endpoint: null
};

let handlers = null

module.exports.create = (createOptions) => {
    if (handlers) return handlers

    const options = Object.assign({}, defaultOptions, createOptions);
    const s3 = new AWS.S3({ apiVersion: "2006-03-01", endpoint: options.endpoint, region: options.bucketRegion
        , credentials: new AWS.Credentials({
            accessKeyId: options.accessKeyId
            , secretAccessKey: options.secretAccessKey
        })
    });

    handlers = {

        set: (opts) => {
            return require("./lib/set").set(opts, options, s3);
        },

        get: (opts) => {
            return require("./lib/get").get(opts, options, s3);
        },

        remove: (opts) => {
            return require("./lib/remove").remove(opts, options, s3);
        }
    };

    return handlers;
};
