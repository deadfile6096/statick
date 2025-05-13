/**
 * API-клиент для работы с DexScreener и CoinGecko API
 */

// Базовые URL для API
const API_URLS = {
    dexscreener: 'https://api.dexscreener.com',
    coingecko: 'https://api.coingecko.com/api/v3'
};

/**
 * DexScreener API клиент
 */
const DexScreenerAPI = {
    /**
     * Получить последние профили токенов
     * @returns {Promise<Array>} Массив профилей токенов
     */
    getLatestProfiles: async function() {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/token-profiles/latest/v1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching latest profiles:', error);
            throw error;
        }
    },

    /**
     * Получить последние бустнутые токены
     * @returns {Promise<Array>} Массив бустнутых токенов
     */
    getLatestBoosts: async function() {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/token-boosts/latest/v1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching latest boosts:', error);
            throw error;
        }
    },

    /**
     * Получить топ бустнутых токенов
     * @returns {Promise<Array>} Массив топ бустнутых токенов
     */
    getTopBoosts: async function() {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/token-boosts/top/v1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching top boosts:', error);
            throw error;
        }
    },

    /**
     * Проверить статус заказов для токена
     * @param {string} chainId - ID блокчейна
     * @param {string} tokenAddress - Адрес токена
     * @returns {Promise<Array>} Массив заказов
     */
    checkOrders: async function(chainId, tokenAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/orders/v1/${chainId}/${tokenAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error checking orders:', error);
            throw error;
        }
    },

    /**
     * Получить информацию о паре токенов
     * @param {string} chainId - ID блокчейна
     * @param {string} pairAddress - Адрес пары токенов
     * @returns {Promise<Object>} Информация о паре токенов
     */
    getPairInfo: async function(chainId, pairAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/pairs/${chainId}/${pairAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching pair info:', error);
            throw error;
        }
    },

    /**
     * Поиск пар токенов
     * @param {string} query - Поисковый запрос
     * @returns {Promise<Object>} Результаты поиска
     */
    searchPairs: async function(query) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching pairs:', error);
            throw error;
        }
    },

    /**
     * Получить пулы для токена
     * @param {string} tokenAddress - Адрес токена
     * @returns {Promise<Object>} Информация о пулах
     */
    getTokenPools: async function(tokenAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/tokens/${tokenAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching token pools:', error);
            throw error;
        }
    },
    
    /**
     * Получить детальную информацию о токене
     * @param {string} chainId - ID блокчейна
     * @param {string} tokenAddress - Адрес токена
     * @returns {Promise<Object>} Детальная информация о токене
     */
    getTokenDetails: async function(chainId, tokenAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/tokens/${chainId}/${tokenAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching token details:', error);
            throw error;
        }
    }
};

/**
 * CoinGecko API клиент
 */
const CoinGeckoAPI = {
    /**
     * Получить цены для нескольких монет
     * @param {Array} ids - Массив ID монет
     * @param {Array} vsCurrencies - Массив валют для конвертации
     * @param {Object} options - Дополнительные опции
     * @returns {Promise<Object>} Цены монет
     */
    getPrice: async function(ids, vsCurrencies = ['usd'], options = {}) {
        try {
            const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
            const currenciesParam = Array.isArray(vsCurrencies) ? vsCurrencies.join(',') : vsCurrencies;
            
            let url = `${API_URLS.coingecko}/simple/price?ids=${encodeURIComponent(idsParam)}&vs_currencies=${encodeURIComponent(currenciesParam)}`;
            
            // Добавление опциональных параметров
            if (options.include_market_cap) url += '&include_market_cap=true';
            if (options.include_24hr_vol) url += '&include_24hr_vol=true';
            if (options.include_24hr_change) url += '&include_24hr_change=true';
            if (options.include_last_updated_at) url += '&include_last_updated_at=true';
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching prices:', error);
            throw error;
        }
    },

    /**
     * Получить цены по адресам токенов
     * @param {string} platform - ID платформы (например, ethereum, binance-smart-chain)
     * @param {Array} addresses - Массив адресов токенов
     * @param {Array} vsCurrencies - Массив валют для конвертации
     * @returns {Promise<Object>} Цены токенов
     */
    getTokenPrice: async function(platform, addresses, vsCurrencies = ['usd']) {
        try {
            const addressesParam = Array.isArray(addresses) ? addresses.join(',') : addresses;
            const currenciesParam = Array.isArray(vsCurrencies) ? vsCurrencies.join(',') : vsCurrencies;
            
            const url = `${API_URLS.coingecko}/simple/token_price/${encodeURIComponent(platform)}?contract_addresses=${encodeURIComponent(addressesParam)}&vs_currencies=${encodeURIComponent(currenciesParam)}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching token prices:', error);
            throw error;
        }
    },

    /**
     * Получить список поддерживаемых валют
     * @returns {Promise<Array>} Список валют
     */
    getSupportedCurrencies: async function() {
        try {
            const response = await fetch(`${API_URLS.coingecko}/simple/supported_vs_currencies`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching supported currencies:', error);
            throw error;
        }
    },

    /**
     * Получить список монет
     * @param {boolean} includeMarketData - Включать ли рыночные данные
     * @returns {Promise<Array>} Список монет
     */
    getCoinsList: async function(includeMarketData = false) {
        try {
            const url = includeMarketData 
                ? `${API_URLS.coingecko}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`
                : `${API_URLS.coingecko}/coins/list`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching coins list:', error);
            throw error;
        }
    },

    /**
     * Получить данные о монете по ID
     * @param {string} id - ID монеты
     * @param {Object} options - Дополнительные опции
     * @returns {Promise<Object>} Данные о монете
     */
    getCoinData: async function(id, options = {}) {
        try {
            let url = `${API_URLS.coingecko}/coins/${encodeURIComponent(id)}?localization=false`;
            
            if (options.tickers) url += '&tickers=true';
            if (options.market_data) url += '&market_data=true';
            if (options.community_data) url += '&community_data=true';
            if (options.developer_data) url += '&developer_data=true';
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching coin data:', error);
            throw error;
        }
    },

    /**
     * Получить исторические данные о монете
     * @param {string} id - ID монеты
     * @param {string} date - Дата в формате dd-mm-yyyy
     * @returns {Promise<Object>} Исторические данные
     */
    getCoinHistory: async function(id, date) {
        try {
            const url = `${API_URLS.coingecko}/coins/${encodeURIComponent(id)}/history?date=${date}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching coin history:', error);
            throw error;
        }
    },

    /**
     * Получить данные графика для монеты
     * @param {string} id - ID монеты
     * @param {string} days - Количество дней (1, 7, 14, 30, 90, 180, 365, max)
     * @param {string} currency - Валюта для конвертации
     * @returns {Promise<Object>} Данные графика
     */
    getCoinMarketChart: async function(id, days = '1', currency = 'usd') {
        try {
            const url = `${API_URLS.coingecko}/coins/${encodeURIComponent(id)}/market_chart?vs_currency=${currency}&days=${days}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching market chart:', error);
            throw error;
        }
    }
};

// Экспорт API клиентов
window.DexScreenerAPI = DexScreenerAPI;
window.CoinGeckoAPI = CoinGeckoAPI;
