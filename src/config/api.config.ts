const API_CONFIG = {
    BASE_URL: 'https://indian-festivals-api.onrender.com',
    ENDPOINTS: {
        HEALTH: '/health',
        FESTIVALS_YEAR: '/api/v1/festivals',
        FESTIVALS_MONTH: '/api/v1/festivals/{year}/month/{month}',
        RELIGIOUS_FESTIVALS: '/api/v1/festivals/{year}/religious',
        RELIGIOUS_FESTIVALS_MONTH: '/api/v1/festivals/{year}/religious/month/{month}'
    },
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
};

export default API_CONFIG;