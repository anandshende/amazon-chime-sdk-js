
const AWS = require('aws-sdk');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const AWS_CONFIG = {
    accessKeyId: 'AKIAYD5OC6FIFY2BJCOY',
    secretAccessKey: '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',
    // region: 'ap-southeast-1'
    region: 'us-east-1'
};

const MeetingController = {
    createMeeting: async (req, res) => {
        AWS.config = new AWS.Config(AWS_CONFIG)
        const chime = new AWS.Chime();
        chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

        const ExternalMeetingId = Math.floor(Math.random() * Math.pow(10, 10)) + '';

        console.log('Meeting\'s ExternalMeetingId to ', ExternalMeetingId);
        console.log('Meeting\'s region to ', AWS_CONFIG.region);

        const request = {
            ClientRequestToken: uuidv4(),
            MediaRegion: AWS_CONFIG.region,
            // NotificationsConfiguration: useSqsInsteadOfEventBridge ? { SqsQueueArn: sqsQueueArn } : {},
            ExternalMeetingId,
            // Tags associated with the meeting. They can be used in cost allocation console
            Tags: [
                { Key: 'Department', Value: 'RND' }
            ]
        };
        console.info('Creating new meeting: ' + JSON.stringify(request));
        meeting = await chime.createMeeting(request).promise();

        console.log('\n\n\nMeeting Created');
        console.log(meeting);

        res.send({ meeting });
    }
};

module.exports = MeetingController;