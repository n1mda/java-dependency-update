'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

var API_URL = 'http://search.maven.org';

var search = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(group, artifact) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _superagent2.default.get(API_URL + '/solrsearch/select').query({
                            q: group + ' ' + artifact,
                            rows: 1,
                            wt: 'json'
                        });

                    case 2:
                        response = _context.sent;

                        if (!(response.body.response.docs.length === 0)) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt('return', null);

                    case 5:
                        return _context.abrupt('return', response.body.response.docs[0]);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function search(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = search;