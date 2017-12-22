import { AsyncStorage } from 'react-native';
const STORAGE_NAME = 'moneta_storage';

class Storage {

  constructor() {
    this.data = null;

    this.getAll();
  }

  async getItem(key) {
    await this.getAll();
    return this.data[key];
  }

  async setItem(key, val) {
    try {
      this.data[key] = val;
      const _raw = JSON.stringify(this.data);
      await AsyncStorage.setItem(STORAGE_NAME, _raw);
      return true;
    } catch (err) {
    }
  }

  async getAll() {
    try {
      const _raw = await AsyncStorage.getItem(STORAGE_NAME) || '{}';
      const data = JSON.parse(_raw);
      this.data = data;
      return data;
    } catch(err) {
    }
  }

  async setAll(val) {
    try {
      this.data = val;
      const _raw = JSON.stringify(this.data);
      await AsyncStorage.setItem(STORAGE_NAME, _raw);
      return true;
    } catch (err) {
    }
  }


}

const storage = new Storage();

export default storage;
