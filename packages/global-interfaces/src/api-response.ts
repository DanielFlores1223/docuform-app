export interface ApiResponse<T> {
    success: boolean,
    msg: string,
    result: T
}