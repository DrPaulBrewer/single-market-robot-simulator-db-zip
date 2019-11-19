"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StudyFolderForZip = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _singleMarketRobotSimulatorOpenzip = require("single-market-robot-simulator-openzip");

var _singleMarketRobotSimulatorOpenzip2 = _interopRequireDefault(_singleMarketRobotSimulatorOpenzip);

var _singleMarketRobotSimulatorDbStudyfolder = require("single-market-robot-simulator-db-studyfolder");

var _singleMarketRobotSimulatorDbStudyfolder2 = _interopRequireDefault(_singleMarketRobotSimulatorDbStudyfolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright 2019- Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

/* eslint-disable no-console */


var StudyFolderForZip = exports.StudyFolderForZip = function (_StudyFolder) {
  _inherits(StudyFolderForZip, _StudyFolder);

  function StudyFolderForZip(props) {
    _classCallCheck(this, StudyFolderForZip);

    var _this = _possibleConstructorReturn(this, (StudyFolderForZip.__proto__ || Object.getPrototypeOf(StudyFolderForZip)).call(this, props));

    if (!_this.zipPromise) throw new Error("StudyFolderForZip: zipPromise required");
    if (!_this.zipName) throw new Error("StudyFolderForZip: zipName required");
    _this.readOnly = true;
    if (!_this.name) _this.name = "External .zip file " + _this.zipName;
    if (!_this.description) _this.description = '';
    return _this;
  }

  _createClass(StudyFolderForZip, [{
    key: "getConfig",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var folder, data, config;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                folder = this;

                if (folder.config) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return (0, _singleMarketRobotSimulatorOpenzip2.default)(this.zipPromise);

              case 4:
                data = _context.sent;

                if (data.config) {
                  _context.next = 7;
                  break;
                }

                throw new Error("zip file does not contain config.json");

              case 7:
                folder.config = data.config;

              case 8:
                config = folder.config;
                return _context.abrupt("return", { folder: folder, config: config });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getConfig() {
        return _ref.apply(this, arguments);
      }

      return getConfig;
    }()
  }, {
    key: "setConfig",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error("cannot setConfig, zip-based study folder is read only");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setConfig() {
        return _ref2.apply(this, arguments);
      }

      return setConfig;
    }()
  }, {
    key: "search",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(name === this.zipName || name === undefined)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", [{
                  id: 1,
                  name: this.zipName,
                  mimeType: 'application/zip'
                }]);

              case 2:
                return _context3.abrupt("return", []);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function search(_x) {
        return _ref3.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "download",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
        var name = _ref4.name,
            id = _ref4.id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(name === this.zipName || id === 1)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", this.zipPromise);

              case 2:
                throw new Error("StudyFolderForZip: file not found");

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function download(_x2) {
        return _ref5.apply(this, arguments);
      }

      return download;
    }()
  }]);

  return StudyFolderForZip;
}(_singleMarketRobotSimulatorDbStudyfolder2.default);