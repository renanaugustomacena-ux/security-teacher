/**
 * Currency Service
 * Virtual currency (Knowledge Coins) system for rewarding learning progress.
 */
import { storageService } from './StorageService.js';

class CurrencyService {
  constructor() {
    this.balance = 0;
    this.totalEarned = 0;
    this.totalSpent = 0;
    this.transactions = [];
    this._saveTimer = null;
  }

  async init() {
    const data = await storageService.load('progress', 'currency');
    if (data) {
      this.balance = data.balance || 0;
      this.totalEarned = data.totalEarned || 0;
      this.totalSpent = data.totalSpent || 0;
      this.transactions = data.transactions || [];
    }
  }

  earn(amount, reason) {
    this.balance += amount;
    this.totalEarned += amount;
    this._logTransaction('earn', amount, reason);
    this._scheduleSave();
    return this.balance;
  }

  spend(amount, reason) {
    if (!this.canAfford(amount)) return false;
    this.balance -= amount;
    this.totalSpent += amount;
    this._logTransaction('spend', amount, reason);
    this._saveNow();
    return true;
  }

  canAfford(amount) {
    return this.balance >= amount;
  }

  getBalance() {
    return this.balance;
  }

  getStats() {
    return {
      balance: this.balance,
      totalEarned: this.totalEarned,
      totalSpent: this.totalSpent,
    };
  }

  _logTransaction(type, amount, reason) {
    this.transactions.push({
      type,
      amount,
      reason,
      timestamp: new Date().toISOString(),
    });
    if (this.transactions.length > 200) {
      this.transactions = this.transactions.slice(-200);
    }
  }

  _scheduleSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._persist(), 3000);
  }

  _saveNow() {
    if (this._saveTimer) {
      clearTimeout(this._saveTimer);
      this._saveTimer = null;
    }
    this._persist();
  }

  async _persist() {
    await storageService.save('progress', {
      userId: 'currency',
      balance: this.balance,
      totalEarned: this.totalEarned,
      totalSpent: this.totalSpent,
      transactions: this.transactions,
    });
  }
}

const currencyService = new CurrencyService();
export { CurrencyService, currencyService };
