import { OrderMenu } from 'Api/OrderInterface'
import React from 'react'
import styled from 'styled-components'

interface OwnProps {
  order_menus: OrderMenu[]
}

const RestaurantInfo: React.FC<OwnProps> = ({ order_menus }) => {
  return (
    <Container>
      <TitleContainer>
        <Title>주문내역</Title>
      </TitleContainer>
      <ContentsContainer>
        <ContentsContainer>
          {Object.values(order_menus).map((menu, index) => (
            <MenuContainer key={index}>
              <MainContainer>
                <div>
                  <NameQuantity>{menu.menu_name}</NameQuantity>
                  <NameQuantity> {menu.quantity}개</NameQuantity>
                </div>
                <Price>{(menu.price * menu.quantity).toLocaleString()}원</Price>
              </MainContainer>

              {menu.options.map((option) => (
                <OptionsContainer key={option.name}>
                  {Array.isArray(option.items) && option.items.length > 0 ? (
                    <>
                      {option.items.map((item) => (
                        <OptionContainer key={item.name}>
                          <div>
                            <ItemName>{option.name}</ItemName>
                            <ItemName>{item.name} </ItemName>
                          </div>
                          <ItemPrice>+{item.price.toLocaleString()}원</ItemPrice>
                        </OptionContainer>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </OptionsContainer>
              ))}
            </MenuContainer>
          ))}
        </ContentsContainer>
      </ContentsContainer>
    </Container>
  )
}

export default RestaurantInfo

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  width: 100%;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const TitleContainer = styled.div`
  display: flex;
  padding: 2rem 0 0 2rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const Title = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem;
`

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const MenuContainer = styled.div`
  display: flex;
  padding: 1.6rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  width: 100%;
`

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const NameQuantity = styled.span`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`

const Price = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  text-align: right;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`

const OptionsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
`
const OptionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const ItemName = styled.span`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
`

const ItemPrice = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  text-align: right;
  margin: 0;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
`
