/* global require */

const _          = require('lodash');
const NodeHelper = require('node_helper');
const bodyParser = require('body-parser');

var ajv = require('ajv')({
    allErrors: true,
    format:'full',
    coerceTypes: true
});

module.exports = NodeHelper.create({

    /**
     * The JSON Validation schema that a notification is checked against.
     */
    notificationSchema: {
        $schema: 'http://json-schema.org/draft-04/schema#',
        id: 'notification',
        required: ['message'],
        properties: {
            message: {
                type: 'string',
                minLength: 1
            },
            displaySeconds: {
                type: 'integer',
                minimum: 1
            },
            size: {
                type: 'string'
            },
            fadeSpeed: {
                type: 'integer',
                minimum: 1
            },
            lightSequence: {
                type: 'string',
                minLength: 1,
                maxLength: 255
            }
        }
    },

    /**
     * node_helper start method
     */
    start: function() {
        console.log('[IFTTT] Starting node_helper');

        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: true}));

        this.expressApp.post('/IFTTT', (req, res) => {
            console.error('[IFTTT] Incoming:', req.body);

            this.validateNotification(req.body)
                .then((data) => {
                    this.sendSocketNotification('IFTTT_NOTIFICATION', data);

                    res.status(200)
                        .send({
                            status: 200
                        });
                })
                .catch((err) => {
                    console.error('[IFTTT] Validation Error: ' + err.message);

                    res.status(400)
                        .send({
                            status: 400,
                            error:  err.message
                        });
                });
        });
    },

    /**
     * Checks the incoming notification against the validation schema
     *
     * @param   {Object} payload
     * @returns {Promise}
     */
    validateNotification: function (payload) {
        return new Promise((resolve, reject) => {
            if (!payload) {
                reject(new Error('Payload is falsy'));
            } else {
                try {
                    var validate = ajv.compile(this.notificationSchema);
                } catch (err) {
                    reject(err);
                }

                var valid = validate(payload);
                if (valid && !validate.errors) {
                    resolve(_.cloneDeep(payload));
                } else {
                    var message = ajv.errorsText(validate.errors);
                    var final_error = new Error(message);
                    reject(final_error);
                }
            }
        });
    }
});
