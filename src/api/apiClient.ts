import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // API 기본 URL
    timeout: 10000, // 요청 타임아웃 설정 (밀리초 단위)
});

// 공통 GET 함수
export const get = async <T>(url: string, config?: axios.AxiosRequestConfig<any>): Promise<T> => {
    try {
        const response = await axiosInstance.get<T>(url, config);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

// 공통 POST 함수
export const post = async <T, R>(url: string, data: T, config?: axios.AxiosRequestConfig<any>): Promise<R> => {
    try {
        const response = await axiosInstance.post<R>(url, data, config);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error; // 에러를 호출한 쪽으로 다시 던짐
    }
};

// 에러 처리 함수
const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error(`Axios Error: ${error.message}`);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    } else {
        console.error('Unknown Error:', error);
    }
};
