export interface ApiResponse<T> {
    status:     boolean;
    path:       string;
    statusCode: number;
    error?:     string;
    message:    string | string[];
    result?:    T;
}