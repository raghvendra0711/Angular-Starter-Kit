const path = require('path');

/**
 * Helper functions.
 */
const ROOT = path.resolve(__dirname, '..');

const root = path.join.bind(path, ROOT);

exports.root = root;
