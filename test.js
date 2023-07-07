console.log("Testing the challenge.");

require("dotenv").config();

let accessKeyId = process.env.AWS_ACCESS_KEY_ID
    , secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    , regionName = process.env.AWS_BUCKET_REGION
    , bucketName = process.env.AWS_BUCKET_NAME
    , endpoint = process.env.S3_ENDPOINT
    , bucketRegion = process.env.AWS_BUCKET_REGION

let tester = require("greenlock-challenge-test");

let challenger = require("./index").create({
    accessKeyId
    , secretAccessKey
    , regionName
    , bucketName
    , endpoint
    , directory: "acme-challenge/"
    , debug: true
    , bucketRegion
});

let domain = "example.com";

// All of these tests can pass locally, standalone without any ACME integration.
tester.test("http-01", domain, challenger).then(() => {
    console.info("Test completed successfully.");
}).catch((err) => {
    console.error(err.message);
    throw err;
});
