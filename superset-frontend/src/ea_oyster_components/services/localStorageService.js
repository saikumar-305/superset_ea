const localStorageService = (function () {
  var _service;

  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  // ls = window.localStorage;

  // setItem(key, value) {
  //   value = JSON.stringify(value);
  //   this.ls.setItem(key, value);
  //   return true;
  // }

  // getItem(key) {
  //   let value = this.ls.getItem(key);
  //   try {
  //     return JSON.parse(value);
  //   } catch (e) {
  //     return null;
  //   }
  // }

  function _setToken(tokenObj) {
    localStorage.setItem("accessToken", tokenObj.jwt);
    if (tokenObj.refreshToken) {
      localStorage.setItem("refreshToken", tokenObj.refreshToken);
    }
  }

  function _getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  function _getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  function _clearToken() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  function _setItem(key, value) {
    localStorage.setItem(key, value);
  }

  function _getItem(key) {
    return localStorage.getItem(key);
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    setItem: _setItem,
    getItem: _getItem,
  };
})();

export default localStorageService;
