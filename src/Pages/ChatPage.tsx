import React, { useEffect, useState } from 'react'
import { Layout, Input, Button, Avatar, Space, Row, Col } from 'antd'
import { styled } from 'styled-components'
const { Content } = Layout

interface Message {
  text: string
  user: string
}

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, user: 'You' }])
      setMessage('')
    }
  }

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([...messages, { text: '안녕하세요', user: '챗봇' }])
    }
  })

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '16px' }}>
        {messages.map((message, key) => {
          if (message.user === 'You') {
            return (
              <Row justify="end" key={key} wrap={false}>
                <Col style={{ padding: '8pt' }}>
                  <Row justify="end">{message.user}</Row>
                  <div>{message.text}</div>
                </Col>
                <Col style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                  <Avatar>{message.user[0]}</Avatar>
                </Col>
              </Row>
            )
          } else {
            return (
              <Row key={key}>
                <Col style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                  <Avatar>{message.user[0]}</Avatar>
                </Col>
                <Space direction="vertical" style={{ padding: 2 }}>
                  <Row>{message.user}</Row>
                  <div>{message.text}</div>
                </Space>
              </Row>
            )
          }
        })}
      </Content>
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        style={{ position: 'fixed', bottom: 0, left: 0, width: 'calc(100% - 100px)' }}
      />
      <Button type="primary" style={{ position: 'fixed', bottom: 0, right: 0 }} onClick={handleSendMessage}>
        Send
      </Button>
    </Layout>
  )
}

export default ChatPage
