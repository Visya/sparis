module.exports = {
  getCsrfChallenge: function(userAgent, url, table) {
    var CsrfGuard = {};
    /**
     * @return {?}
     */
    CsrfGuard["Ajax"] = function() {
      if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest;
      } else {
        var msxml2 = "MSXML2.XmlHttp.";
        /** @type {!Array} */
        var activeXids = [msxml2 + "6.0", msxml2 + "5.0", msxml2 + "4.0", msxml2 + "3.0", msxml2 + "2.0", "Microsoft.XmlHttp"];
        /** @type {number} */
        var i = 0;
        for (; i < activeXids["length"]; i++) {
          try {
            return new ActiveXObject(activeXids[i]);
          } catch (ex) {
          }
        }
      }
      return null;
    };
    CsrfGuard["Authorize"] = function(url) {
      var myFunction6 = CsrfGuard.Ajax();
      if (!myFunction6) {
        return;
      }
      /** @type {string} */
      url = url + "&userAgent=" + encodeURIComponent(userAgent); myFunction6["open"]("POST", url, true); myFunction6["setRequestHeader"]("Content-Type", "application/json;charset=utf-8"); myFunction6["setRequestHeader"]("CSRF-GUARD-AUTH", CsrfGuard.Authorization); myFunction6["setRequestHeader"]("CSRF-GUARD-CHALLENGE", CsrfGuard.GetChallenge()); myFunction6["setRequestHeader"]("CSRF-GUARD-URL", url);
        /**
         * @return {undefined}
         */
        myFunction6["onreadystatechange"] = function() {
          if (this["readyState"] === 4) {
            if (this["status"] === 200) {
              eval(myFunction6["responseText"]);
            } else {
              if (!myFunction6["getAllResponseHeaders"]()) {
                return;
              }
              setTimeout(function() {
                CsrfGuard.Authorize(url);
              }, 5 * 60 * 1000);
            }
          }
        }; myFunction6["send"]("{}");
      };
      /**
       * @param {?} mmCoreSplitViewBlock
       * @param {?} receiveFunc
       * @param {?} $super
       * @return {undefined}
       */
      CsrfGuard["Get"] = function(mmCoreSplitViewBlock, receiveFunc, $super) {
        var connector = CsrfGuard.Ajax();
        if (!connector) {
          return;
        }
        connector["open"]("GET", mmCoreSplitViewBlock, true);
        connector["setRequestHeader"]("CSRF-GUARD-AUTH", CsrfGuard.Authorization);
        connector["setRequestHeader"]("CSRF-GUARD-CHALLENGE", CsrfGuard.GetChallenge());
        connector["setRequestHeader"]("CSRF-GUARD-URL", url);
        /**
         * @return {undefined}
         */
        connector["onreadystatechange"] = function() {
          if (this["readyState"] === 4) {
            if (this["status"] === 200) {
              if (receiveFunc) {
                receiveFunc(connector);
              }
            } else {
              if (!connector["getAllResponseHeaders"]()) {
                return;
              }
              if ($super) {
                $super(connector);
              }
            }
          }
        };
        connector["send"]();
      };
      /**
       * @param {?} mmCoreSplitViewBlock
       * @param {?} data
       * @param {?} getConnectorTestFilePath
       * @param {?} $super
       * @return {undefined}
       */
      CsrfGuard["PostJson"] = function(mmCoreSplitViewBlock, data, getConnectorTestFilePath, $super) {
        var connector = CsrfGuard.Ajax();
        if (!connector) {
          return;
        }
        connector["open"]("POST", mmCoreSplitViewBlock, true);
        connector["setRequestHeader"]("Content-Type", "application/json;charset=utf-8");
        connector["setRequestHeader"]("CSRF-GUARD-AUTH", CsrfGuard.Authorization);
        connector["setRequestHeader"]("CSRF-GUARD-CHALLENGE", CsrfGuard.GetChallenge());
        connector["setRequestHeader"]("CSRF-GUARD-URL", url);
        /**
         * @return {undefined}
         */
        connector["onreadystatechange"] = function() {
          if (this["readyState"] === 4) {
            if (this["status"] === 200) {
              if (getConnectorTestFilePath) {
                getConnectorTestFilePath(connector);
              }
            } else {
              if (!connector["getAllResponseHeaders"]()) {
                return;
              }
              if ($super) {
                $super(connector);
              }
            }
          }
        };
        connector["send"](JSON["stringify"](data));
      };
      CsrfGuard["UserAgent"] = userAgent;
      /**
       * @return {?}
       */
      CsrfGuard["GetChallenge"] = function() {
        var challengeData = new CsrfGuardCrc32;
        challengeData.UpdateValue(CsrfGuard.UserAgent);
        return challengeData.GetCheckSum();
      };
      /**
       * @return {?}
       */
      CsrfGuard["GetHeaders"] = function() {
        var csrf = {};
        csrf["CSRF-GUARD-AUTH"] = CsrfGuard["Authorization"];
        csrf["CSRF-GUARD-CHALLENGE"] = url;
        csrf["CSRF-GUARD-URL"] = CsrfGuard.GetChallenge();
        return csrf;
      };
      /**
       * @return {undefined}
       */
      /*window["onbeforeunload"] = function() {};
      /**
       * @param {?} canCreateDiscussions
       * @return {undefined}
       */
      /*window["onpageshow"] = function(canCreateDiscussions) {
        if (canCreateDiscussions["persisted"]) {
          window["location"]["reload"]();
        }
      };*/
      /**
       * @return {undefined}
       */
      CsrfGuardCrc32 = function() {
        /** @type {number} */
        this["CheckSum"] = 4294967295;
      };
      CsrfGuardCrc32["prototype"]["Crc32Table"] = {};
      /** @type {number} */
      CsrfGuardCrc32["prototype"]["CheckSum"] = 0;
      /**
       * @param {?} userAgent
       * @return {undefined}
       */
      CsrfGuardCrc32["prototype"]["Update"] = function(userAgent) {
        /** @type {number} */
        var tempChecksum = 0;
        for (; tempChecksum < userAgent["length"]; tempChecksum++) {
          /** @type {number} */
          this["CheckSum"] = ((this["CheckSum"] >>> 8 ^ this["Crc32Table"][(this["CheckSum"] ^ userAgent["charCodeAt"](tempChecksum)) & 255]) & 4294967295) >>> 0;
        }
      };
      /**
       * @param {string} pingErr
       * @return {undefined}
       */
      CsrfGuardCrc32["prototype"]["UpdateValue"] = function(pingErr) {
        if (pingErr == null) {
          return;
        }
        this.Update(pingErr.toString());
      };
      /**
       * @param {!Object} cobra_reactions
       * @return {undefined}
       */
      CsrfGuardCrc32["prototype"]["UpdateModelRecursive"] = function(cobra_reactions) {
        var bigg_id;
        for (bigg_id in cobra_reactions) {
          if (cobra_reactions[usefulFunctions[8]](bigg_id)) {
            this.UpdateValue(bigg_id);
            var reaction = cobra_reactions[bigg_id];
            if (reaction === undefined) {
              continue;
            } else {
              if (typeof reaction === "object") {
                this.UpdateModelRecursive(reaction);
              } else {
                this.UpdateValue(reaction);
              }
            }
          }
        }
      };
      /**
       * @return {?}
       */
      CsrfGuardCrc32["prototype"]["GetCheckSum"] = function() {
        return (this["CheckSum"] ^ 4294967295) >>> 0;
      };

      /** @type {!Array} */
    CsrfGuardCrc32.prototype.Crc32Table = table

    return CsrfGuard.GetChallenge()
  }
}
