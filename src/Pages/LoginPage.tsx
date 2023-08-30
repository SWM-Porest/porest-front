import Header from 'Component/Header'

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <Header HeaderName="Login" Right={''} />
      <div style={{ padding: '24pt' }}>
        <a href="http://localhost:3001/auth/kakao">
          <img
            style={{ height: '48pt', alignContent: 'center', display: 'block', margin: 'auto' }}
            src="https://blog.kakaocdn.net/dn/bYZZHh/btrfibui4Cj/DofAXcdzmQGCKkhTNUUAHk/img.png"
            alt="kakao"
          />
        </a>
      </div>
    </div>
  )
}

export default LoginPage
