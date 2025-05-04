
interface ProcessEnv {
    DB_URI: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    JWT_SECRET: string;
}
