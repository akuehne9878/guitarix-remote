class GuitarixModel {
  constructor() {
    this.baseUrl = "https://freewheeling-ape-4267.dataplicity.io/api/";
  }

  getVersion() {
    return this.performGET("getversion");
  }

  getBanks() {
    return this.performGET("banks");
  }

  getRackUnitOrder() {
    return this.performGET("get_rack_unit_order?params=0");
  }

  queryUnit(unit) {
    return this.performGET("queryunit?params=" + unit);
  }

  set(paramname, value) {
    return this.performGET("set?params=" + paramname + "," + value);
  }

  get(paramname) {
    return this.performGET("get?params=" + paramname);
  }

  getPlugins() {
    return this.get("sys.visible_mono_plugins");
  }

  getCurrentBank() {
    return this.get("system.current_bank");
  }

  getCurrentPreset() {
    return this.get("system.current_preset");
  }

  insertRackUnit(unit, param, is_stereo) {
    return this.performGET("insert_rack_unit?params=" + unit + "," + param + "," + is_stereo);
  }

  remove_rack_unit(unit, is_stereo) {
    return this.performGET("remove_rack_unit?params=" + unit + "," + is_stereo);
  }

  /*


	RestModel.prototype.get_bank = function(bank) {
		return RestModel.prototype.doit("get_bank", bank);
	};

	RestModel.prototype.setpreset = function(bank, preset) {
		return RestModel.prototype.doit("setpreset", bank + "," + preset);
	};

	RestModel.prototype.save_preset = function(bankName, presetName) {
		return RestModel.prototype.doit("save_preset", bankName + "," + presetName);
	};

	RestModel.prototype.get = function(param) {
		return RestModel.prototype.doit("get", param);
  };
  
	RestModel.prototype.erase_preset = function(bankName, presetName) {
		return RestModel.prototype.doit("erase_preset", bankName + "," + presetName);
	};

	RestModel.prototype.bank_remove = function(bankName) {
		return RestModel.prototype.doit("bank_remove", bankName);
	};

	RestModel.prototype.bank_insert_new = function(bankName) {
		return RestModel.prototype.doit("bank_insert_new", bankName);
	};

	RestModel.prototype.rename_bank = function(bankName, newName) {
		return RestModel.prototype.doit("rename_bank", bankName + "," + newName);
	};

	RestModel.prototype.rename_preset = function(bankName, presetName, newName) {
		return RestModel.prototype.doit("rename_bank", bankName + "," + presetName + "," + newName);
	};


  */

  performGET(api) {
    return fetch(this.baseUrl + api, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }
}

export default GuitarixModel;
