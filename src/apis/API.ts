import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const API = axios.create({ baseURL: process.env.API_SERVER_URL });

/**
 * GET 요청을 처리하는 API 유틸 함수 getAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공 시 T 객체, 요청 실패 시 에러 throw
 */
export async function getAsync<T, D>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await API.get<T, AxiosResponse<T, D>, D>(url, {
    responseType: 'json',
    ...config,
  });
  return response.data;
}

/**
 * POST HTTP 요청을 처리하는 API 유틸 함수 postAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param data body 에 넣어 보낼 데이터
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공 시 T 객체, 요청 실패 시 에러 throw
 */
export async function postAsync<T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await API.post<T, AxiosResponse<T, D>, D>(url, data, {
    responseType: 'json',
    ...config,
  });
  return response.data;
}

/**
 * DELETE HTTP 요청을 처리하는 API 유틸 함수 deleteAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공 시 T 객체, 요청 실패 시 에러 throw
 */
export async function deleteAsync<T, D>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await API.delete<T, AxiosResponse<T, D>, D>(url, {
    responseType: 'json',
    ...config,
  });
  return response.data;
}

/**
 * PATCH HTTP 요청을 처리하는 API 유틸 함수 postAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param data body 에 넣어 보낼 데이터
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공 시 T 객체, 요청 실패 시 에러 throw
 */
export async function patchAsync<T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await API.patch<T, AxiosResponse<T, D>, D>(url, data, {
    responseType: 'json',
    ...config,
  });
  return response.data;
}
