import { FunctionComponent, useCallback } from 'react'

const MenuBoard: FunctionComponent = () => {
  const onProductCardContainer1Click = useCallback(() => {
    // Please sync "menu" to the project
  }, [])

  const onButtonContainerClick = useCallback(() => {
    // Please sync "chat" to the project
  }, [])

  const onTitleText8Click = useCallback(() => {
    // Please sync "login" to the project
  }, [])

  const onButtonContainer1Click = useCallback(() => {
    // Please sync "Cart" to the project
  }, [])

  return (
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-[17.47px] text-gray-700 font-m3-body-large">
      <div className="relative bg-white w-[393px] h-[96.07px] z-[0] text-[19.65px]">
        <div className="absolute top-[48.03px] left-[34.93px] leading-[26.2px] font-medium flex items-center justify-center w-[323.13px]">
          Restaurant Name
        </div>
        <img className="absolute top-[0px] left-[0px] w-[393px] h-[26.2px]" alt="" src="/top.svg" />
        <img
          className="absolute top-[48.03px] left-[353.7px] w-[21.83px] h-[21.83px] object-cover"
          alt=""
          src="/freeiconshoppingbasket4570078-1@2x.png"
        />
        <img
          className="absolute top-[calc(50%_-_0px)] right-[353.7px] w-[26.2px] h-[26.2px] hidden"
          alt=""
          src="/icleft.svg"
        />
      </div>
      <div className="relative w-[393px] h-[393px] overflow-hidden shrink-0 z-[1] text-black">
        <div className="absolute top-[13.1px] left-[13.1px] rounded-[6.55px] bg-gainsboro w-[366.8px] h-[366.8px]" />
        <div className="absolute top-[calc(50%_-_23.42px)] left-[calc(50%_-_152.83px)] rounded-[8.73px] w-[305.67px] flex flex-row p-[10.916666984558105px] box-border items-start justify-start">
          <b className="flex-1 relative leading-[24.02px]">Restaurant Image</b>
        </div>
        <div className="absolute bottom-[21.83px] left-[calc(50%_-_24.02px)] flex flex-row items-start justify-start gap-[4.37px]">
          <div className="relative rounded-[109.17px] bg-white w-[21.83px] h-[4.37px]" />
          <div className="relative rounded-[109.17px] bg-gray-400 w-[4.37px] h-[4.37px]" />
          <div className="relative rounded-[109.17px] bg-gray-400 w-[4.37px] h-[4.37px]" />
          <div className="relative rounded-[109.17px] bg-gray-400 w-[4.37px] h-[4.37px]" />
        </div>
      </div>
      <div className="rounded-[14px] bg-gainsboro w-[351px] h-[49px] overflow-hidden shrink-0 flex flex-row items-center justify-start z-[2] text-left text-base text-m3-sys-light-on-surface-variant">
        <div className="self-stretch flex-1 flex flex-row p-1 items-center justify-start gap-[4px]">
          <div className="w-12 h-12 flex flex-col items-center justify-center">
            <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center">
              <div className="flex flex-row p-2 items-center justify-center">
                <img className="relative w-6 h-6" alt="" src="/icon.svg" />
              </div>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-row items-center justify-start">
            <div className="relative tracking-[0.5px] leading-[24px]">AI 점원에게 질문하기</div>
          </div>
          <div className="flex flex-row items-center justify-end">
            <div className="w-12 h-12 flex flex-col items-center justify-center">
              <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center">
                <div className="flex flex-row p-2 items-center justify-center">
                  <img className="relative w-6 h-6" alt="" src="/icon1.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-row py-[8.7333345413208px] px-[13.100001335144043px] box-border items-start justify-start gap-[8.73px] z-[3] text-[34.93px] text-gray-500">
        <div className="flex-1 rounded-[6.55px] hidden flex-col p-[4.3666672706604px] items-center justify-start relative gap-[4.37px] border-[1.1px] border-solid border-gray-900">
          <div className="absolute my-0 mx-[!important] top-[4.37px] left-[calc(50%_-_26.56px)] rounded-7xl-2 bg-whitesmoke-200 w-[52.4px] h-[52.4px] z-[0]" />
          <div className="relative leading-[52.4px] flex items-center justify-center w-[52.4px] z-[1]">😀</div>
          <div className="self-stretch relative text-[10.92px] leading-[15.28px] [display:-webkit-inline-box] items-center justify-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] z-[2]">
            Text
          </div>
        </div>
        <div className="flex-1 rounded-[6.55px] flex flex-col p-[4.3666672706604px] items-center justify-start relative gap-[4.37px] border-[1.1px] border-solid border-gray-900">
          <div className="absolute my-0 mx-[!important] top-[4.37px] left-[calc(50%_-_26.56px)] rounded-7xl-2 bg-whitesmoke-200 w-[52.4px] h-[52.4px] z-[0]" />
          <div className="relative leading-[52.4px] flex items-center justify-center w-[52.4px] z-[1]">🍔</div>
          <div className="self-stretch relative text-[10.92px] leading-[15.28px] [display:-webkit-inline-box] items-center justify-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] z-[2]">
            Main Course
          </div>
        </div>
        <div className="flex-1 rounded-[6.55px] flex flex-col p-[4.3666672706604px] items-center justify-start relative gap-[4.37px] border-[1.1px] border-solid border-gray-900">
          <div className="absolute my-0 mx-[!important] top-[4.37px] left-[calc(50%_-_26.56px)] rounded-7xl-2 bg-whitesmoke-200 w-[52.4px] h-[52.4px] z-[0]" />
          <div className="relative leading-[52.4px] flex items-center justify-center w-[52.4px] z-[1]">🍹</div>
          <div className="self-stretch relative text-[10.92px] leading-[15.28px] [display:-webkit-inline-box] items-center justify-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] z-[2]">
            Beverages
          </div>
        </div>
        <div className="flex-1 rounded-[6.55px] flex flex-col p-[4.3666672706604px] items-center justify-start relative gap-[4.37px] border-[1.1px] border-solid border-gray-900">
          <div className="absolute my-0 mx-[!important] top-[4.37px] left-[calc(50%_-_26.56px)] rounded-7xl-2 bg-whitesmoke-200 w-[52.4px] h-[52.4px] z-[0]" />
          <div className="relative leading-[52.4px] flex items-center justify-center w-[52.4px] z-[1]">🍮</div>
          <div className="self-stretch relative text-[10.92px] leading-[15.28px] [display:-webkit-inline-box] items-center justify-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] z-[2]">
            Desserts
          </div>
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col p-[13.100001335144043px] box-border items-center justify-start gap-[8.73px] z-[4] text-left">
        <div className="self-stretch relative leading-[24.02px] font-medium">Main Course</div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[8.73px] text-[15.28px]">
          <div className="rounded-[6.55px] bg-whitesmoke-100 hidden flex-col p-[8.7333345413208px] items-center justify-center">
            <div className="relative leading-[21.83px]">Chip Text Long</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.7333345413208px] items-center justify-center">
            <div className="relative leading-[21.83px]">Burger</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.7333345413208px] items-center justify-center">
            <div className="relative leading-[21.83px]">Pasta</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.7333345413208px] items-center justify-center">
            <div className="relative leading-[21.83px]">Pizza</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.7333345413208px] items-center justify-center">
            <div className="relative leading-[21.83px]">Salad</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.7333345413208px] items-center justify-center">
            <div className="relative leading-[21.83px]">Steak</div>
          </div>
        </div>
      </div>
      <div className="rounded-[8.73px] w-[393px] overflow-hidden flex flex-col items-start justify-start z-[5] text-left text-gray-500">
        <div className="self-stretch flex flex-col py-[13.100001335144043px] pr-[98.25000762939453px] pl-[13.100001335144043px] items-start justify-center">
          <div className="self-stretch relative leading-[24.02px] font-medium">Pizza</div>
          <div className="self-stretch relative text-sm-1 leading-[17.47px] text-gray-600">Cheese Margherita</div>
        </div>
        <div className="self-stretch overflow-x-auto flex flex-row pt-0 px-[13.100001335144043px] pb-[13.100001335144043px] items-start justify-start gap-[8.73px] text-sm-1 text-gray-300">
          <div className="rounded-[6.55px] w-[139.73px] overflow-hidden shrink-0 hidden flex-col items-start justify-center">
            <div className="self-stretch relative rounded-[6.55px] bg-gainsboro h-[139.73px]" />
            <div className="self-stretch flex flex-col p-[4.3666672706604px] items-start justify-start gap-[4.37px]">
              <div className="relative leading-[17.47px] inline-block overflow-hidden text-ellipsis whitespace-nowrap w-[131px] h-[17.47px] shrink-0">
                Women's 1950's Vintage V Neck Ruche...
              </div>
              <div className="self-stretch flex flex-row items-baseline justify-start gap-[4.37px] text-[15.28px] text-gray-700">
                <b className="relative leading-[21.83px]">$12,200</b>
                <div className="relative text-[10.92px] [text-decoration:line-through] leading-[15.28px] text-gray-100 inline-block w-[66.41px] shrink-0">
                  $16,449
                </div>
              </div>
              <div className="rounded-[2.18px] bg-whitesmoke-100 overflow-hidden flex flex-row py-[1.0916668176651px] px-[4.3666672706604px] items-center justify-start text-[10.92px] text-gray-800 border-[0.5px] border-solid border-gray-900">
                <div className="relative leading-[15.28px]">20% Off</div>
              </div>
            </div>
          </div>
          <div
            className="rounded-[6.55px] w-[139.73px] overflow-hidden shrink-0 flex flex-col items-start justify-center cursor-pointer"
            onClick={onProductCardContainer1Click}
          >
            <div className="self-stretch relative rounded-[6.55px] bg-gainsboro h-[139.73px]" />
            <div className="self-stretch flex flex-col p-[4.3666672706604px] items-start justify-start gap-[4.37px]">
              <div className="relative leading-[17.47px] inline-block overflow-hidden text-ellipsis whitespace-nowrap w-[131px] h-[17.47px] shrink-0">
                포테이토 피자
              </div>
              <div className="self-stretch flex flex-row items-baseline justify-start gap-[4.37px] text-[15.28px] text-gray-700">
                <b className="relative leading-[21.83px]">$12,200</b>
                <div className="relative text-[10.92px] [text-decoration:line-through] leading-[15.28px] text-gray-100 inline-block w-[66.41px] shrink-0">
                  $16,449
                </div>
              </div>
              <div className="rounded-[2.18px] bg-whitesmoke-100 overflow-hidden flex flex-row py-[1.0916668176651px] px-[4.3666672706604px] items-center justify-start text-[10.92px] text-gray-800 border-[0.5px] border-solid border-gray-900">
                <div className="relative leading-[15.28px]">20% Off</div>
              </div>
            </div>
          </div>
          <div className="rounded-[6.55px] w-[139.73px] overflow-hidden shrink-0 flex flex-col items-start justify-center">
            <div className="self-stretch relative rounded-[6.55px] bg-gainsboro h-[139.73px]" />
            <div className="self-stretch flex flex-col p-[4.3666672706604px] items-start justify-start gap-[4.37px]">
              <div className="relative leading-[17.47px] inline-block overflow-hidden text-ellipsis whitespace-nowrap w-[131px] h-[17.47px] shrink-0">
                콤비네이션
              </div>
              <div className="self-stretch flex flex-row items-baseline justify-start gap-[4.37px] text-[15.28px] text-gray-700">
                <b className="relative leading-[21.83px]">$12,200</b>
                <div className="relative text-[10.92px] [text-decoration:line-through] leading-[15.28px] text-gray-100 inline-block w-[66.41px] shrink-0">
                  $16,449
                </div>
              </div>
              <div className="rounded-[2.18px] bg-whitesmoke-100 overflow-hidden flex flex-row py-[1.0916668176651px] px-[4.3666672706604px] items-center justify-start text-[10.92px] text-gray-800 border-[0.5px] border-solid border-gray-900">
                <div className="relative leading-[15.28px]">20% Off</div>
              </div>
            </div>
          </div>
          <div className="rounded-[6.55px] w-[139.73px] overflow-hidden shrink-0 flex flex-col items-start justify-center">
            <div className="self-stretch relative rounded-[6.55px] bg-gainsboro h-[139.73px]" />
            <div className="self-stretch flex flex-col p-[4.3666672706604px] items-start justify-start gap-[4.37px]">
              <div className="relative leading-[17.47px] inline-block overflow-hidden text-ellipsis whitespace-nowrap w-[131px] h-[17.47px] shrink-0">
                페퍼로니 피자
              </div>
              <div className="self-stretch flex flex-row items-baseline justify-start gap-[4.37px] text-[15.28px] text-gray-700">
                <b className="relative leading-[21.83px]">$12,200</b>
                <div className="relative text-[10.92px] [text-decoration:line-through] leading-[15.28px] text-gray-100 inline-block w-[66.41px] shrink-0">
                  $16,449
                </div>
              </div>
              <div className="rounded-[2.18px] bg-whitesmoke-100 overflow-hidden flex flex-row py-[1.0916668176651px] px-[4.3666672706604px] items-center justify-start text-[10.92px] text-gray-800 border-[0.5px] border-solid border-gray-900">
                <div className="relative leading-[15.28px]">20% Off</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute my-0 mx-[!important] top-[1023px] left-[326.5px] w-[53.49px] h-[53.49px] cursor-pointer z-[6]"
        onClick={onButtonContainerClick}
      >
        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-gainsboro w-[53.49px] h-[53.49px]" />
        <img
          className="absolute bottom-[13.1px] left-[calc(50%_-_13.65px)] w-[27.29px] h-[27.29px] object-cover"
          alt=""
          src="/freeiconchatbot2068998-3@2x.png"
        />
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col py-[17.4666690826416px] px-[13.100001335144043px] box-border items-start justify-start gap-[10.92px] z-[7] text-[13.47px] text-gray-200">
        <div className="self-stretch relative leading-[24.02px] font-medium cursor-pointer" onClick={onTitleText8Click}>
          로그인하기
        </div>
        <div
          className="self-stretch rounded-[8.73px] bg-black flex flex-col py-[10.916666984558105px] px-[13.100001335144043px] items-center justify-center cursor-pointer text-left text-[17.47px] text-white"
          onClick={onButtonContainer1Click}
        >
          <div className="relative leading-[24.02px] font-medium">장바구니 보기</div>
        </div>
      </div>
    </div>
  )
}

export default MenuBoard
