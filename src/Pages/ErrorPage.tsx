import { Result } from 'antd'
import React from 'react'

interface ErrorProps {
  errorCode: number
}

interface ErrorInfo {
  title: string
  subTitle: string
  status: '403' | '404' | '500' | 'error'
}

const errorMessages: { [key: number]: ErrorInfo } = {
  400: { title: '400', subTitle: '잘못된 요청입니다.', status: 'error' },
  401: { title: '401', subTitle: '인증되지 않은 요청입니다.', status: 'error' },
  403: { title: '403', subTitle: '접근이 금지되었습니다.', status: '403' },
  404: { title: '404', subTitle: '페이지를 찾을 수 없습니다.', status: '404' },
  500: { title: '500', subTitle: '알 수 없는 에러가 발생했습니다.', status: '500' },
}

const ErrorPage: React.FC<ErrorProps> = ({ errorCode }) => {
  const errorInfo = errorMessages[errorCode] || {
    title: '클라이언트 에러',
    subTitle: '클라이언트에서 에러가 발생했습니다.',
    status: 'error', // 기본 값 error
  }

  return <Result status={errorInfo.status} title={errorInfo.title} subTitle={errorInfo.subTitle} />
}

export default ErrorPage
