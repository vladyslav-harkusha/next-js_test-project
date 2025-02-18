import {axiosInstance} from "@/services/api.auth.service";

export type urlParamsType = {
    endpoint: string;
    search: string
    page: number;
    limit: number;
}

export const getEntitiesByUrlParams = async <T>(urlParams: urlParamsType) => {
    try {
        const { endpoint, search, page, limit } = urlParams;
        const skip = (page - 1) * limit;
        const response = await axiosInstance.get<T>(`${endpoint + search}skip=${skip}&limit=${limit}`);
        return response.data as T;
    } catch (error: any) {
        console.log(`Get auth data error: ${error.status}, ${error.message}`);
    }
};

export const getEntityById = async <T>(endpoint: string, id: string) => {
    const response = await axiosInstance.get<T>(`${endpoint}/${id}`);
    return response.data as T;
};