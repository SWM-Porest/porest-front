import Header from 'Component/Header'
import { Button, Col, Divider, Form, Input, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    // console.log(values)
    // 로그인
  }

  const handleFindID = () => {
    // 아이디 찾기
  }

  const handleFindPassword = () => {
    // 비밀번호 찾기
  }

  const handleSocialLogin = (provider: any) => {
    // 소셜 로그인
    // console.log(provider)
  }

  return (
    <div>
      <Header HeaderName="Login" Right={''} />
      <div style={{ padding: '24pt' }}>
        <Form onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: '사용자명을 입력해주세요.' }]}>
            <Input style={{ height: '64pt', fontSize: '2rem' }} placeholder="username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}>
            <Input.Password style={{ height: '64pt', fontSize: '2rem' }} placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                height: '64pt',
                fontSize: '2rem',
                backgroundColor: '#008937',
                boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.1)',
              }}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Button
              onClick={handleFindID}
              block
              style={{ height: '64pt', fontSize: '2rem', boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.1)' }}
            >
              아이디 찾기
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={handleFindPassword}
              block
              style={{ height: '64pt', fontSize: '2rem', boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.1)' }}
            >
              비밀번호 찾기
            </Button>
          </Col>
        </Row>

        <Divider style={{ fontSize: '1.5rem' }}>또는</Divider>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              onClick={() => handleSocialLogin('Google')}
              block
              style={{ height: '64pt', fontSize: '2rem', boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.1)' }}
            >
              Google 로그인
            </Button>
          </Col>
          <Col span={24}>
            <Button
              onClick={() => handleSocialLogin('Facebook')}
              block
              style={{ height: '64pt', fontSize: '2rem', boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.1)' }}
            >
              Facebook 로그인
            </Button>
          </Col>
        </Row>

        <Divider style={{ fontSize: '1.5rem' }} />

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={{ fontSize: '2rem', textAlign: 'center' }}>
              혹시, Porest가 처음이신가요?{' '}
              <Link to="/signup" style={{ color: '#008937' }}>
                회원가입
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LoginPage
