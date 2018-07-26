var noPromise = [
    'pauseVoice',
    'stopVoice',
    'clearStorage',
    'hideToast',
    'hideLoading',
    'showNavigationBarLoading',
    'hideNavigationBarLoading',
    'navigateTo',
    'redirecTo',
    'stopPullDownRefresh',
    'setNavigationBarTitle',
    'setStorage',
];
/**
 * 忽略返回值的方法
 */
var hasUselessReturn = ['request', 'showModal'];
var apis = Object.keys(wx).reduce(function (api, functionName) {
    if (functionName.slice(0, 2) === 'on' ||
        functionName.indexOf('Sync') > -1 ||
        functionName.indexOf('create') > -1 ||
        noPromise.indexOf(functionName) > -1) {
        api[functionName] = wx[functionName];
    }
    else {
        api[functionName] = function (options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve, reject) {
                if (!options.success) {
                    options.success = function (data) {
                        resolve(data);
                    };
                }
                if (!options.fail) {
                    options.fail = function (data) {
                        reject(data);
                    };
                }
                if (!options.complete) {
                    options.complete = function (data) {
                        resolve(data);
                    };
                }
                var ret = wx[functionName](options);
                /**
                 * 有的promise方法会返回一些没用的值
                 */
                if (ret && hasUselessReturn.indexOf(functionName) === -1) {
                    resolve(ret);
                }
            });
        };
    }
    return api;
}, {});
export default apis;
