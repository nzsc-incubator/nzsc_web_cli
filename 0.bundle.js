(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./web-src/clownkit/Clownkit.js":
/*!**************************************!*\
  !*** ./web-src/clownkit/Clownkit.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./web-src/clownkit/list.js\");\n/* harmony import */ var _join__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./join */ \"./web-src/clownkit/join.js\");\n/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create */ \"./web-src/clownkit/create.js\");\n/* harmony import */ var _waitForRoomToBeFull__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./waitForRoomToBeFull */ \"./web-src/clownkit/waitForRoomToBeFull.js\");\n/* harmony import */ var _onTurnEnd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./onTurnEnd */ \"./web-src/clownkit/onTurnEnd.js\");\n/* harmony import */ var _acceptResults__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./acceptResults */ \"./web-src/clownkit/acceptResults.js\");\n/* harmony import */ var _deposit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./deposit */ \"./web-src/clownkit/deposit.js\");\n/* harmony import */ var _destroy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./destroy */ \"./web-src/clownkit/destroy.js\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login */ \"./web-src/clownkit/login.js\");\n\n\n\n\n\n\n\n\n\n\nclass Clownkit {\n  constructor(firebase) {\n    this.firebase = firebase;\n  }\n\n  list() {\n    return Object(_list__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.firebase);\n  }\n\n  join(roomName) {\n    return Object(_join__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.firebase, roomName);\n  }\n\n  create(roomName) {\n    return Object(_create__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.firebase, roomName);\n  }\n\n  waitForRoomToBeFull(roomName) {\n    return Object(_waitForRoomToBeFull__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this.firebase, roomName);\n  }\n\n  onTurnEnd(roomName, callback) {\n    return Object(_onTurnEnd__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this.firebase, roomName, callback);\n  }\n\n  acceptResults(roomName, aOrB) {\n    return Object(_acceptResults__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this.firebase, roomName, aOrB);\n  }\n\n  deposit(roomName, aOrB, payload) {\n    return Object(_deposit__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(this.firebase, roomName, aOrB, payload);\n  }\n\n  destroy(roomName, aOrB) {\n    return Object(_destroy__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(this.firebase, roomName, aOrB);\n  }\n\n  login() {\n    Object(_login__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(this.firebase);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Clownkit);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/Clownkit.js?");

/***/ }),

/***/ "./web-src/clownkit/acceptResults.js":
/*!*******************************************!*\
  !*** ./web-src/clownkit/acceptResults.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n\n\nconst acceptResults = async (firebase, roomName, aOrB) => {\n  if (![_helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"B\"]].includes(aOrB)) {\n    throw new TypeError('aOrB must be \"A\" or \"B\"');\n  }\n\n  const db = firebase.firestore();\n  const guardianRef = db.collection('guardians').doc(roomName);\n\n  try {\n    await guardianRef.update({\n      state: aOrB === _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A\"] ? _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A_VIEWED\"] : _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"B_VIEWED\"],\n    });\n  } catch {\n    try {\n      await guardianRef.update({\n        state: _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"NONE_SEALED\"],\n      });\n    } catch (e) {\n      throw {\n        isExpected: false,\n        raw: e,\n      };\n    }\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (acceptResults);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/acceptResults.js?");

/***/ }),

/***/ "./web-src/clownkit/create.js":
/*!************************************!*\
  !*** ./web-src/clownkit/create.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n/* harmony import */ var _helpers_getUid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/getUid */ \"./web-src/clownkit/helpers/getUid.js\");\n\n\n\nconst create = async (firebase, roomName) => {\n  const db = firebase.firestore();\n  const guardianRef = db.collection('guardians').doc(roomName);\n  const vaultRef = db.collection('aVaults').doc(roomName);\n\n  try {\n    await guardianRef.set({\n      state: _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"NONE_CREATED\"]\n    });\n  } catch (e) {\n    throw {\n      isExpected: true,\n      raw: e,\n    }\n  }\n\n  try {\n    await vaultRef.set({\n      owner: await Object(_helpers_getUid__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(firebase),\n      payload: ''\n    });\n    await guardianRef.update({\n      state: _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A_CREATED\"]\n    })\n  } catch (e) {\n    throw {\n      isExpected: false,\n      raw: e,\n    }\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (create);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/create.js?");

/***/ }),

/***/ "./web-src/clownkit/deposit.js":
/*!*************************************!*\
  !*** ./web-src/clownkit/deposit.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n\n\nconst deposit = async (firebase, roomName, aOrB, payload) => {\n  if (![_helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"B\"]].includes(aOrB)) {\n    throw new TypeError('aOrB must be \"A\" or \"B\"');\n  }\n\n  const db = firebase.firestore();\n  const guardianRef = db.collection('guardians').doc(roomName);\n  const vaultRef = aOrB === _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A\"]\n    ? db.collection('aVaults').doc(roomName)\n    : db.collection('bVaults').doc(roomName);\n\n  try {\n    await vaultRef.update({\n      payload,\n    });\n  } catch {\n    throw {\n      isExpected: true,\n    };\n  }\n\n  try {\n    try {\n      await guardianRef.update({\n        state: aOrB === _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A\"] ? _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A_SEALED\"] : _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"B_SEALED\"],\n      });\n    } catch {\n      await guardianRef.update({\n        state: _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"NONE_VIEWED\"],\n      });\n    }\n  } catch {\n    throw {\n      isExpected: false,\n    };\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (deposit);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/deposit.js?");

/***/ }),

/***/ "./web-src/clownkit/destroy.js":
/*!*************************************!*\
  !*** ./web-src/clownkit/destroy.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n\n\nconst destroy = async (firebase, roomName, aOrB) => {\n  if (![_helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"B\"]].includes(aOrB)) {\n    throw new TypeError('aOrB must be \"A\" or \"B\"');\n  }\n\n  const db = firebase.firestore();\n  const guardianRef = db.collection('guardians').doc(roomName);\n  const vaultRef = aOrB === _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A\"]\n    ? db.collection('aVaults').doc(roomName)\n    : db.collection('bVaults').doc(roomName);\n\n  try {\n    await vaultRef.delete();\n  } catch {\n    throw {\n      isExpected: false,\n    };\n  }\n\n  try {\n    await guardianRef.delete();\n  } catch {\n    throw {\n      isExpected: true,\n    };\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (destroy);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/destroy.js?");

/***/ }),

/***/ "./web-src/clownkit/helpers/consts.js":
/*!********************************************!*\
  !*** ./web-src/clownkit/helpers/consts.js ***!
  \********************************************/
/*! exports provided: A, B, NONE_CREATED, A_CREATED, B_CREATED, NONE_SEALED, A_SEALED, B_SEALED, NONE_VIEWED, A_VIEWED, B_VIEWED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"A\", function() { return A; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"B\", function() { return B; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NONE_CREATED\", function() { return NONE_CREATED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"A_CREATED\", function() { return A_CREATED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"B_CREATED\", function() { return B_CREATED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NONE_SEALED\", function() { return NONE_SEALED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"A_SEALED\", function() { return A_SEALED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"B_SEALED\", function() { return B_SEALED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NONE_VIEWED\", function() { return NONE_VIEWED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"A_VIEWED\", function() { return A_VIEWED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"B_VIEWED\", function() { return B_VIEWED; });\n// import firebase from '../../firebase';\n\n// export const db = firebase.firestore();\n\nconst A = 'A';\nconst B = 'B';\n\nconst NONE_CREATED = 0;\nconst A_CREATED = 1;\nconst B_CREATED = 2;\nconst NONE_SEALED = 3;\nconst A_SEALED = 4;\nconst B_SEALED = 5;\nconst NONE_VIEWED = 6;\nconst A_VIEWED = 7;\nconst B_VIEWED = 8;\n\n// export const ERROR = 'terminal-error';\n// export const SUCCESS = 'terminal-success';\n// export const PENDING = 'terminal-pending';\n\n\n//# sourceURL=webpack:///./web-src/clownkit/helpers/consts.js?");

/***/ }),

/***/ "./web-src/clownkit/helpers/getUid.js":
/*!********************************************!*\
  !*** ./web-src/clownkit/helpers/getUid.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst getUid = (firebase) => {\n  return new Promise((resolve) => {\n    firebase.auth().onAuthStateChanged((user) => {\n      if (user) {\n        resolve(user.uid);\n      }\n    });\n  })\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getUid);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/helpers/getUid.js?");

/***/ }),

/***/ "./web-src/clownkit/index.js":
/*!***********************************!*\
  !*** ./web-src/clownkit/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Clownkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clownkit */ \"./web-src/clownkit/Clownkit.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firebase */ \"./web-src/firebase.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new _Clownkit__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_firebase__WEBPACK_IMPORTED_MODULE_1__[\"default\"]));\n\n\n//# sourceURL=webpack:///./web-src/clownkit/index.js?");

/***/ }),

/***/ "./web-src/clownkit/join.js":
/*!**********************************!*\
  !*** ./web-src/clownkit/join.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n/* harmony import */ var _helpers_getUid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/getUid */ \"./web-src/clownkit/helpers/getUid.js\");\n\n\n\nconst join = async (firebase, roomName) => {\n  const db = firebase.firestore();\n  const guardianRef = db.collection('guardians').doc(roomName);\n  const vaultRef = db.collection('bVaults').doc(roomName);\n\n  try {\n    await vaultRef.set({\n      owner: await Object(_helpers_getUid__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(firebase),\n      payload: ''\n    });\n  } catch {\n    throw {\n      isExpected: true,\n    }\n  }\n\n  try {\n    await guardianRef.update({\n      state: _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"NONE_SEALED\"],\n    });\n  } catch {\n    throw {\n      isExpected: false,\n    }\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (join);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/join.js?");

/***/ }),

/***/ "./web-src/clownkit/list.js":
/*!**********************************!*\
  !*** ./web-src/clownkit/list.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n\n\nconst list = async (firebase) => {\n  const db = firebase.firestore();\n  const guardiansRef = db.collection('guardians');\n  \n  try {\n    const { docs } = await guardiansRef.where('state', '==', _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A_CREATED\"]).get();\n    const roomNames = docs.map(doc => doc.id);\n    return roomNames;\n  } catch {\n    throw {\n      isExpected: false,\n    };\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (list);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/list.js?");

/***/ }),

/***/ "./web-src/clownkit/login.js":
/*!***********************************!*\
  !*** ./web-src/clownkit/login.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst login = async (firebase) => {\n  await firebase.auth().signInAnonymously();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/login.js?");

/***/ }),

/***/ "./web-src/clownkit/onTurnEnd.js":
/*!***************************************!*\
  !*** ./web-src/clownkit/onTurnEnd.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n\n\nconst onTurnEnd = (firebase, roomName, callback) => {\n  const db = firebase.firestore();\n  const guardianRef = db.collection('guardians').doc(roomName);\n  const avRef = db.collection('aVaults').doc(roomName);\n  const bvRef = db.collection('bVaults').doc(roomName);\n\n  let cachedState = null;\n\n  const unsubscribe = guardianRef.onSnapshot(\n    {\n      includeMetadataChanges: true,\n    },\n\n    async (guardianDoc) => {\n      const { state } = guardianDoc.data();\n      if (guardianDoc.hasPendingWrites\n        || state === cachedState\n        || ![_helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"NONE_VIEWED\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A_VIEWED\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"B_VIEWED\"]].includes(state)\n      ) {\n        return;\n      }\n      const [aDoc, bDoc] = await Promise.all([avRef.get(), bvRef.get()]);\n\n\n      callback(aDoc.data().payload, bDoc.data().payload);\n    }\n  );\n\n  return unsubscribe;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (onTurnEnd);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/onTurnEnd.js?");

/***/ }),

/***/ "./web-src/clownkit/waitForRoomToBeFull.js":
/*!*************************************************!*\
  !*** ./web-src/clownkit/waitForRoomToBeFull.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/clownkit/helpers/consts.js\");\n\n\nconst waitForRoomToBeFull = (firebase, roomName) => {\n  const db = firebase.firestore();\n  const guardianRef = db.collection('guardians').doc(roomName);\n\n  return new Promise((resolve) => {\n    guardianRef.onSnapshot(\n      (guardianDoc) => {\n        const { state } = guardianDoc.data();\n        if (![_helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"NONE_CREATED\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"A_CREATED\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_0__[\"B_CREATED\"]].includes(state)) {\n          resolve();\n        }\n      }\n    );\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (waitForRoomToBeFull);\n\n\n//# sourceURL=webpack:///./web-src/clownkit/waitForRoomToBeFull.js?");

/***/ }),

/***/ "./web-src/commands/create.js":
/*!************************************!*\
  !*** ./web-src/commands/create.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/commands/helpers/consts.js\");\n/* harmony import */ var _helpers_createTurnEndListenerFor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/createTurnEndListenerFor */ \"./web-src/commands/helpers/createTurnEndListenerFor.js\");\n/* harmony import */ var _clownkit_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../clownkit/index */ \"./web-src/clownkit/index.js\");\n\n\n\n\n\nconst create = async (args, state) => {\n  if (!state.isLoggedIn) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('Please login first.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    return;\n  }\n\n  const roomName = args[0];\n\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Creating game room ' + roomName + '...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    await _clownkit_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"].create(roomName);\n    state.roomName = roomName;\n    state.aOrB = _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"A\"];\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Created game room ' + roomName + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  } catch (e) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to create game room ' + roomName + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    if (e.isExpected) {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('This is probably because that name (' + roomName + ') is already taken.');\n    } else {\n      console.log('Unexpected create error: ', e.raw);\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n    }\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n    return;\n  }\n\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Adding listener...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    _clownkit_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"].onTurnEnd(roomName, Object(_helpers_createTurnEndListenerFor__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"A\"], state, roomName));\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Added listener.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  } catch (e) {\n    console.log('Unexpected create error: ', e.raw);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to add listener.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n    return;\n  }\n\n  _clownkit_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"].waitForRoomToBeFull(roomName).then(() => {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Somebody joined your game room!');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('You can now begin the game!');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (create);\n\n\n//# sourceURL=webpack:///./web-src/commands/create.js?");

/***/ }),

/***/ "./web-src/commands/deposit.js":
/*!*************************************!*\
  !*** ./web-src/commands/deposit.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/commands/helpers/consts.js\");\n/* harmony import */ var _clownkit_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clownkit/index */ \"./web-src/clownkit/index.js\");\n\n\n\n\nconst deposit = async ([payload], state) => {\n  const { roomName, aOrB } = state;\n\n  if (roomName === null || ![_helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"A\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"B\"]].includes(aOrB)) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('You are not in a game.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    return;\n  }\n\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Depositing ' + payload + '...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    await _clownkit_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].deposit(roomName, aOrB, payload);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Deposited ' + payload + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n  } catch (e) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to deposit ' + payload + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    if (e.isExpected) {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('This is probably because you have already deposited this turn.');\n    } else {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n    }\n  } finally {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (deposit);\n\n\n//# sourceURL=webpack:///./web-src/commands/deposit.js?");

/***/ }),

/***/ "./web-src/commands/destroy.js":
/*!*************************************!*\
  !*** ./web-src/commands/destroy.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/commands/helpers/consts.js\");\n/* harmony import */ var _clownkit_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clownkit/index */ \"./web-src/clownkit/index.js\");\n\n\n\n\nconst destroy = async (args, state) => {\n  let roomName = args[0];\n  const { aOrB } = state;\n\n  if (!roomName) {\n    if (state.roomName === null) {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('You are not in a game.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n      return;\n    } else {\n      roomName = state.roomName;\n    }\n  }\n\n  if (![_helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"A\"], _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"B\"]].includes(aOrB)) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('You are not in a game.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    return;\n  }\n\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Destroying game room ' + roomName + '...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    await _clownkit_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].destroy(roomName, aOrB);\n    state.roomName = null;\n    state.aOrB = null;\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Destroyed game room ' + roomName + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n  } catch (e) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to destroy game room ' + roomName + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    if (e.isExpected) {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('This is probably because somebody else is still in the room.');\n    } else {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n    }\n  } finally {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (destroy);\n\n\n//# sourceURL=webpack:///./web-src/commands/destroy.js?");

/***/ }),

/***/ "./web-src/commands/get.js":
/*!*********************************!*\
  !*** ./web-src/commands/get.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n\n\nconst get = async (args, state) => {\n  const key = args[0];\n  if (key === undefined) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeJson2Ln\"])(state);\n  } else {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])(state[key]);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (get);\n\n\n//# sourceURL=webpack:///./web-src/commands/get.js?");

/***/ }),

/***/ "./web-src/commands/help.js":
/*!**********************************!*\
  !*** ./web-src/commands/help.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n\n\nconst helpWithCommand = (commandName) => {\n  switch (commandName) {\n    case 'list':\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Usage:');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('list');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('List the name of every game room you can join.');\n      break;\n    case 'create':\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Usage:');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('create <gameRoomName>');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('Create a game room with the given name.');\n      break;\n    case 'join':\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Usage:');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('join <gameRoomName>');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Join the game room that has the given name.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('Will throw an error if there exists no game room with the given gameId.');\n      break;\n    case 'destroy':\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Usage:');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('destroy');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Deletes the game room you are in.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('May fail if somebody else is still in the game room.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('You should ALWAYS type this command before closing the page.');\n      break;\n    case 'deposit':\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Usage:');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('deposit <item>');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Deposits the item in your vault.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('This is how you choose characters, boosters, and moves.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('<item> cannot contain spaces.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('So make sure to spell multi-word moves such as \"Shadow Fireball\" like \"ShadowFireball\"');\n      break;\n    case 'help':\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Usage:');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('help <commandName>');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('Learn more about the given command.');\n      break;\n\n    case 'login':\n    case 'set':\n    case 'get':\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('TODO: Enter man pages for plumbing commands.');\n      break;\n\n    default:\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('No entry for ' + commandName + '.');\n  }\n};\n\nconst listAllCommands = () => {\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('Syntax: <command> <arg0> <arg1> <arg2> ...<argN>');\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('\"Porcelain\" Commands:');\n\n  [\n    'list',\n    'create <gameRoomName>',\n    'join <gameRoomName>',\n    'destroy',\n    'deposit <item>',\n    'help <command>'\n  ].forEach((commandName) => {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('\\t' + commandName);\n  });\n\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('\"Plumbing\" Commands:');\n\n  [\n    'login',\n    'set <key> <value>',\n    'get <key>',\n  ].forEach((commandName) => {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('\\t' + commandName);\n  });\n\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('For more help with a specific command, type \"help <command>\".');\n};\n\nconst help = async (args) => {\n  const [commandName] = args;\n  if (commandName) {\n    helpWithCommand(commandName);\n  } else {\n    listAllCommands();\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (help);\n\n\n//# sourceURL=webpack:///./web-src/commands/help.js?");

/***/ }),

/***/ "./web-src/commands/helpers/consts.js":
/*!********************************************!*\
  !*** ./web-src/commands/helpers/consts.js ***!
  \********************************************/
/*! exports provided: db, A, B, ERROR, SUCCESS, PENDING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"db\", function() { return db; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"A\", function() { return A; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"B\", function() { return B; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ERROR\", function() { return ERROR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SUCCESS\", function() { return SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PENDING\", function() { return PENDING; });\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../firebase */ \"./web-src/firebase.js\");\n\n\nconst db = _firebase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].firestore();\n\nconst A = 'A';\nconst B = 'B';\n\n// export const NONE_CREATED = 0;\n// export const A_CREATED = 1;\n// export const B_CREATED = 2;\n// export const NONE_SEALED = 3;\n// export const A_SEALED = 4;\n// export const B_SEALED = 5;\n// export const NONE_VIEWED = 6;\n// export const A_VIEWED = 7;\n// export const B_VIEWED = 8;\n\nconst ERROR = 'terminal-error';\nconst SUCCESS = 'terminal-success';\nconst PENDING = 'terminal-pending';\n\n\n//# sourceURL=webpack:///./web-src/commands/helpers/consts.js?");

/***/ }),

/***/ "./web-src/commands/helpers/createTurnEndListenerFor.js":
/*!**************************************************************!*\
  !*** ./web-src/commands/helpers/createTurnEndListenerFor.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../io */ \"./web-src/io.js\");\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ \"./web-src/commands/helpers/consts.js\");\n/* harmony import */ var _clownkit_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../clownkit/index */ \"./web-src/clownkit/index.js\");\n\n\n\n\nconst createTurnEndListenerFor = (aOrB, state, roomName) => async (aPayload, bPayload) => {\n  if (![_consts__WEBPACK_IMPORTED_MODULE_1__[\"A\"], _consts__WEBPACK_IMPORTED_MODULE_1__[\"B\"]].includes(aOrB)) {\n    throw new TypeError('aOrB must be \"A\" or \"B\"');\n  }\n\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Results are in:');\n\n  if (aOrB === _consts__WEBPACK_IMPORTED_MODULE_1__[\"A\"]) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('You chose ' + aPayload + '.');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Your opponent chose ' + bPayload + '.');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Here is the current state of the game (You are A):');\n  } else {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('You chose ' + bPayload + '.');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Your opponent chose ' + aPayload + '.');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Here is the current state of the game (You are B):');\n  }\n\n  state.game.process_choice('A', aPayload);\n  state.game.process_choice('B', bPayload);\n  const result = JSON.parse(state.game.get_phase());\n\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeJsonLn\"])(result);\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Accepting results...', _consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    await _clownkit_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].acceptResults(roomName, aOrB);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Accepted results.', _consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n  } catch (e) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to accept results.', _consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    console.log('Unexpected acceptance error: ', e);\n  } finally {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTurnEndListenerFor);\n\n\n//# sourceURL=webpack:///./web-src/commands/helpers/createTurnEndListenerFor.js?");

/***/ }),

/***/ "./web-src/commands/index.js":
/*!***********************************!*\
  !*** ./web-src/commands/index.js ***!
  \***********************************/
/*! exports provided: list, create, join, destroy, deposit, help, login, get, set */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./web-src/commands/list.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"list\", function() { return _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create */ \"./web-src/commands/create.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return _create__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _join__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./join */ \"./web-src/commands/join.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"join\", function() { return _join__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _destroy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./destroy */ \"./web-src/commands/destroy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"destroy\", function() { return _destroy__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _deposit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deposit */ \"./web-src/commands/deposit.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deposit\", function() { return _deposit__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./help */ \"./web-src/commands/help.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"help\", function() { return _help__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login */ \"./web-src/commands/login.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return _login__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./get */ \"./web-src/commands/get.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return _get__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./set */ \"./web-src/commands/set.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return _set__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./web-src/commands/index.js?");

/***/ }),

/***/ "./web-src/commands/join.js":
/*!**********************************!*\
  !*** ./web-src/commands/join.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/commands/helpers/consts.js\");\n/* harmony import */ var _helpers_createTurnEndListenerFor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/createTurnEndListenerFor */ \"./web-src/commands/helpers/createTurnEndListenerFor.js\");\n/* harmony import */ var _clownkit_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../clownkit/index */ \"./web-src/clownkit/index.js\");\n\n\n\n\n\nconst join = async (args, state) => {\n  if (!state.isLoggedIn) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Please login first.');\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n    return;\n  }\n\n  const roomName = args[0];\n\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Joining ' + roomName + '...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    await _clownkit_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"].join(roomName);\n    state.roomName = roomName;\n    state.aOrB = _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"B\"];\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Joined ' + roomName + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  } catch (e) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to join ' + roomName + '.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    if (e.isExpected) {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('This is probably because the game room does not exist.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('It is also possible that the game room exists, but is full.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('You can create your own game room with \"create <gameRoomName>\".');\n    } else {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n    }\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n    return;\n  }\n\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Adding listener...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    _clownkit_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"].onTurnEnd(roomName, Object(_helpers_createTurnEndListenerFor__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"B\"], state, roomName));\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Added listener.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n  } catch (e) {\n    console.log('Unexpected create error: ', e.raw);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to add listener.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n  } finally {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (join);\n\n\n//# sourceURL=webpack:///./web-src/commands/join.js?");

/***/ }),

/***/ "./web-src/commands/list.js":
/*!**********************************!*\
  !*** ./web-src/commands/list.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/commands/helpers/consts.js\");\n/* harmony import */ var _clownkit_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clownkit/index */ \"./web-src/clownkit/index.js\");\n\n\n\n\nconst list = async () => {\n  try {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Fetching open game rooms...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n    const gameRoomNames = await _clownkit_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].list();\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Fetched open game rooms.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n\n    if (gameRoomNames.length > 0) {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Open game room names:');\n      gameRoomNames.forEach((name) => {\n        Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('\\t' + name);\n      });\n    } else {\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('There are no open game rooms right now.');\n      Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('You can create your own game room by typing \"create <gameRoomName>\".');\n    }\n  } catch {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to fetch open game rooms.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n  } finally {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (list);\n\n\n//# sourceURL=webpack:///./web-src/commands/list.js?");

/***/ }),

/***/ "./web-src/commands/login.js":
/*!***********************************!*\
  !*** ./web-src/commands/login.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/commands/helpers/consts.js\");\n/* harmony import */ var _clownkit_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clownkit/index */ \"./web-src/clownkit/index.js\");\n\n\n\n\nconst login = async (args, state) => {\n  const isSuccessSilent = args[0] === 'silent-success';\n\n  if (!isSuccessSilent) {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Logging in...', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"PENDING\"]);\n  }\n\n  try {\n    await _clownkit_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].login();\n    state.isLoggedIn = true;\n  } catch {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('Failed to login.', _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"ERROR\"]);\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('We don\\'t know what happened. Sorry.');\n  } finally {\n    Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"writeLn\"])('');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n\n//# sourceURL=webpack:///./web-src/commands/login.js?");

/***/ }),

/***/ "./web-src/commands/set.js":
/*!*********************************!*\
  !*** ./web-src/commands/set.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io */ \"./web-src/io.js\");\n/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/consts */ \"./web-src/commands/helpers/consts.js\");\n\n\n\nconst set = async (args, state) => {\n  const [key, val] = args;\n  state[key] = val;\n  Object(_io__WEBPACK_IMPORTED_MODULE_0__[\"write2Ln\"])('Assignment succeeded! state.' + key + ' = ' + val, _helpers_consts__WEBPACK_IMPORTED_MODULE_1__[\"SUCCESS\"]);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (set);\n\n\n//# sourceURL=webpack:///./web-src/commands/set.js?");

/***/ }),

/***/ "./web-src/firebase.js":
/*!*****************************!*\
  !*** ./web-src/firebase.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.cjs.js\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/index.esm.js\");\n\n\n\n\nconst config = {\n  apiKey: \"AIzaSyDf4-lOD9WulQ28HGLIIibkmVcr-hnjDC4\",\n  authDomain: \"nzsc2p.firebaseapp.com\",\n  databaseURL: \"https://nzsc2p.firebaseio.com\",\n  projectId: \"nzsc2p\",\n  storageBucket: \"nzsc2p.appspot.com\",\n  messagingSenderId: \"736929435180\"\n};\n\nfirebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp(config);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n\n//# sourceURL=webpack:///./web-src/firebase.js?");

/***/ }),

/***/ "./web-src/index.js":
/*!**************************!*\
  !*** ./web-src/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wasm_nzsc_web_cli__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm/nzsc_web_cli */ \"./web-src/wasm/nzsc_web_cli.js\");\n/* harmony import */ var _commands_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/index */ \"./web-src/commands/index.js\");\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./io */ \"./web-src/io.js\");\n\n\n\n\n\nconst ERROR = 'terminal-error';\n\nObject(_io__WEBPACK_IMPORTED_MODULE_2__[\"write2Ln\"])('Welcome to NZSC Two-player!');\n\nconst main = async () => {\n  const state = {\n    isLoggedIn: false,\n    aOrB: null,\n    roomName: null,\n    game: _wasm_nzsc_web_cli__WEBPACK_IMPORTED_MODULE_0__[\"NZSCTwoPlayerGameWebInterface\"].new(),\n  };\n\n  // Since we're using anonymous auth, we might as well automate it.\n  _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"login\"](['silent-success'], state);\n\n  while (true) {\n    const input = await Object(_io__WEBPACK_IMPORTED_MODULE_2__[\"read\"])();\n    const [commandName, ...args] = input.split(' ');\n    Object(_io__WEBPACK_IMPORTED_MODULE_2__[\"write2Ln\"])(input);\n\n    switch (commandName) {\n      case '':\n        break;\n\n      // Porcelain\n      case 'list':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"list\"](args, state);\n        break;\n      case 'create':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"create\"](args, state);\n        break;\n      case 'join':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"join\"](args, state);\n        break;\n      case 'destroy':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"destroy\"](args, state);\n        break;\n      case 'deposit':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"deposit\"](args, state);\n        break;\n      case 'help':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"help\"](args, state);\n        break;\n\n      // Plumbing\n      case 'login':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"login\"](args, state);\n        break;\n      case 'set':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"set\"](args, state);\n        break;\n      case 'get':\n        await _commands_index__WEBPACK_IMPORTED_MODULE_1__[\"get\"](args, state);\n        break;\n\n      default:\n        Object(_io__WEBPACK_IMPORTED_MODULE_2__[\"writeLn\"])(commandName + ' is not a command.', ERROR);\n        Object(_io__WEBPACK_IMPORTED_MODULE_2__[\"write2Ln\"])('For help, type \"help\".');\n    }\n  }\n};\n\nmain();\n\nwindow.addEventListener('load', () => {\n  if('serviceWorker' in navigator) {\n    navigator.serviceWorker.register('./service-worker.js');\n  }\n});\n\n\n//# sourceURL=webpack:///./web-src/index.js?");

/***/ }),

/***/ "./web-src/io.js":
/*!***********************!*\
  !*** ./web-src/io.js ***!
  \***********************/
/*! exports provided: write, writeLn, write2Ln, writeJson, writeJsonLn, writeJson2Ln, read, clear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"write\", function() { return write; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeLn\", function() { return writeLn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"write2Ln\", function() { return write2Ln; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeJson\", function() { return writeJson; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeJsonLn\", function() { return writeJsonLn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeJson2Ln\", function() { return writeJson2Ln; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"read\", function() { return read; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clear\", function() { return clear; });\nconst ENTER_KEY = 13;\n\nconst input = document.getElementById('terminal-input');\nconst output = document.getElementById('terminal-output');\n\nconst write = (content, className) => {\n  content = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');\n  if (className) {\n    content = '<span class=\"' + className + '\">' + content + '</span>';\n  }\n  output.innerHTML += content;\n};\nconst writeLn = (content, className) => {\n  write(content + '\\n', className);\n};\nconst write2Ln = (content, className) => {\n  write(content + '\\n\\n', className);\n};\nconst writeJson = (json, className) => {\n  write(JSON.stringify(json, null, 4), className);\n};\nconst writeJsonLn = (json, className) => {\n  writeLn(JSON.stringify(json, null, 4), className);\n};\nconst writeJson2Ln = (json, className) => {\n  write2Ln(JSON.stringify(json, null, 4), className);\n};\n\nconst clear = () => {\n  input.value = '';\n};\n\nconst read = () => {\n  clear();\n  input.focus();\n\n  return new Promise((resolve) => {\n    const listener = (e) => {\n      if (e.keyCode !== ENTER_KEY) {\n        return;\n      }\n\n      input.blur();\n      window.removeEventListener('keypress', listener);\n      resolve(input.value);\n      clear();\n    };\n\n    window.addEventListener('keypress', listener);\n  });\n};\n\n\n\n\n//# sourceURL=webpack:///./web-src/io.js?");

/***/ }),

/***/ "./web-src/wasm/nzsc_web_cli.js":
/*!**************************************!*\
  !*** ./web-src/wasm/nzsc_web_cli.js ***!
  \**************************************/
/*! exports provided: NZSCTwoPlayerGameWebInterface, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NZSCTwoPlayerGameWebInterface\", function() { return NZSCTwoPlayerGameWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nzsc_web_cli_bg */ \"./web-src/wasm/nzsc_web_cli_bg.wasm\");\n/* tslint:disable */\n\n\nconst TextEncoder = typeof self === 'object' && self.TextEncoder\n    ? self.TextEncoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextEncoder;\n\nlet cachedEncoder = new TextEncoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null ||\n        cachegetUint8Memory.buffer !== _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint8Memory = new Uint8Array(_nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint8Memory;\n}\n\nfunction passStringToWasm(arg) {\n\n    const buf = cachedEncoder.encode(arg);\n    const ptr = _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](buf.length);\n    getUint8Memory().set(buf, ptr);\n    return [ptr, buf.length];\n}\n\nconst TextDecoder = typeof self === 'object' && self.TextDecoder\n    ? self.TextDecoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextDecoder;\n\nlet cachedDecoder = new TextDecoder('utf-8');\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nlet cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null)\n        cachedGlobalArgumentPtr = _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_global_argument_ptr\"]();\n    return cachedGlobalArgumentPtr;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null ||\n        cachegetUint32Memory.buffer !== _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint32Memory = new Uint32Array(_nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint32Memory;\n}\n\nclass NZSCTwoPlayerGameWebInterface {\n\n                static __construct(ptr) {\n                    return new NZSCTwoPlayerGameWebInterface(ptr);\n                }\n\n                constructor(ptr) {\n                    this.ptr = ptr;\n                }\n\n            free() {\n                const ptr = this.ptr;\n                this.ptr = 0;\n                _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_nzsctwoplayergamewebinterface_free\"](ptr);\n            }\n        static new() {\n    return NZSCTwoPlayerGameWebInterface.__construct(_nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"nzsctwoplayergamewebinterface_new\"]());\n}\nprocess_choice(arg0, arg1) {\n    const [ptr0, len0] = passStringToWasm(arg0);\n    const [ptr1, len1] = passStringToWasm(arg1);\n    return _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"nzsctwoplayergamewebinterface_process_choice\"](this.ptr, ptr0, len0, ptr1, len1);\n}\nget_phase() {\n    const retptr = globalArgumentPtr();\n    _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"nzsctwoplayergamewebinterface_get_phase\"](retptr, this.ptr);\n    const mem = getUint32Memory();\n    const ptr = mem[retptr / 4];\n    const len = mem[retptr / 4 + 1];\n    const realRet = getStringFromWasm(ptr, len).slice();\n    _nzsc_web_cli_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n    return realRet;\n}\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///./web-src/wasm/nzsc_web_cli.js?");

/***/ }),

/***/ "./web-src/wasm/nzsc_web_cli_bg.wasm":
/*!*******************************************!*\
  !*** ./web-src/wasm/nzsc_web_cli_bg.wasm ***!
  \*******************************************/
/*! exports provided: memory, __wbg_nzsctwoplayergamewebinterface_free, nzsctwoplayergamewebinterface_new, nzsctwoplayergamewebinterface_process_choice, nzsctwoplayergamewebinterface_get_phase, __wbindgen_malloc, __wbindgen_free, __wbindgen_global_argument_ptr */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./nzsc_web_cli */ \"./web-src/wasm/nzsc_web_cli.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./web-src/wasm/nzsc_web_cli_bg.wasm?");

/***/ })

}]);