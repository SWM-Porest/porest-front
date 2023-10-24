import { styled } from 'styled-components'
interface ingre {
  ingre: string[]
}

const Categories = ({ ingre }: ingre) => {
  let ulelem
  if (ingre) {
    ulelem = ingre.map((elem: string) => {
      return (
        <LiContainer>
          <CategoryLi>{elem}</CategoryLi>
        </LiContainer>
      )
    })
  }

  return (
    <Container style={{ cursor: 'default' }}>
      <CategoryContainer>
        <Category style={{ margin: 0 }}>주요 재료</Category>
      </CategoryContainer>
      <Categoryul>{ulelem}</Categoryul>
    </Container>
  )
}

export default Categories

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  justify-content: space-between;
  align-items: flex-start;
`
const Category = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`
const Categoryul = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 0;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.8rem;
  flex-wrap: wrap;
  padding: 0 2rem;
`
const LiContainer = styled.div`
  display: flex;
  padding: 0.6rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.COLOR.common.gray[120]};
`
const CategoryLi = styled.li`
  color: ${({ theme }) => theme.COLOR.common.gray[30]};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
`
