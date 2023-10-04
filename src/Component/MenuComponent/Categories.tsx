import { styled } from 'styled-components'
interface ingre {
  ingre: string[]
}

const Categories = ({ ingre }: ingre) => {
  let ulelem
  if (ingre) {
    ulelem = ingre.map((elem: string) => {
      return <Categoryli>{elem}</Categoryli>
    })
  }

  return (
    <div style={{ cursor: 'default' }}>
      <h2 style={{ fontSize: '2rem', margin: '16pt' }}>주요 재료</h2>
      <Categoryul>{ulelem}</Categoryul>
    </div>
  )
}

export default Categories

const Categoryul = styled.ul`
  margin: 8pt;
  display: flex;
  padding: 0;
`

const Categoryli = styled.li`
  display: inline;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 14.5px;
  color: ${({ theme }) => theme.COLOR.common.white};
  position: realtive;
  padding: 8pt 16pt;
  margin: 8pt;
  letter-spacing: -0.3px;
  text-align: center;
  background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.4);
`
