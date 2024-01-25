type ResponseData = {
    success: boolean,
    message?: string,
    payload?: any
};

type MockResponse = {
    data: ResponseData | null,
    loading: boolean,
    error: ResponseData | null
}

export type {
    MockResponse
};