import { FunctionComponent, useCallback } from 'react'

const Menu: FunctionComponent = () => {
  const onButtonContainerClick = useCallback(() => {
    // Please sync "menu board" to the project
  }, [])

  return (
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-[17.47px] text-gray-300 font-roboto">
      <div className="relative bg-white w-[393px] h-[96.07px] text-center text-[19.65px]">
        <div className="absolute top-[48.03px] left-[34.93px] leading-[26.2px] font-medium flex items-center justify-center w-[323.13px]">
          Menu Name
        </div>
        <img className="absolute top-[0px] left-[0px] w-[393px] h-[26.2px]" alt="" src="/top.svg" />
        <img
          className="absolute top-[calc(50%_-_0px)] right-[353.7px] w-[26.2px] h-[26.2px]"
          alt=""
          src="/icleft.svg"
        />
      </div>
      <div className="relative w-[393px] h-[393px] overflow-hidden shrink-0 text-center text-black">
        <div className="absolute top-[13.1px] left-[13.1px] rounded-[6.55px] bg-gainsboro w-[366.8px] h-[366.8px]" />
        <div className="absolute top-[calc(50%_-_23.42px)] left-[calc(50%_-_152.83px)] rounded-[8.73px] w-[305.67px] flex flex-row p-[10.916666984558105px] box-border items-start justify-start">
          <b className="flex-1 relative leading-[24.02px]">Photo of Menu Item</b>
        </div>
        <div className="absolute bottom-[21.83px] left-[calc(50%_-_24.02px)] flex flex-row items-start justify-start gap-[4.37px]">
          <div className="relative rounded-[109.17px] bg-white w-[21.83px] h-[4.37px]" />
          <div className="relative rounded-[109.17px] bg-gray-400 w-[4.37px] h-[4.37px]" />
          <div className="relative rounded-[109.17px] bg-gray-400 w-[4.37px] h-[4.37px]" />
          <div className="relative rounded-[109.17px] bg-gray-400 w-[4.37px] h-[4.37px]" />
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col p-[13.099998474121094px] box-border items-center justify-start text-gray-200">
        <div className="self-stretch relative leading-[24.02px] font-medium">Description</div>
        <div className="flex flex-col py-[8.733332633972168px] px-0 items-start justify-center text-sm-1 text-gray-100">
          <div className="relative leading-[17.47px] inline-block w-[323.13px]">
            설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
          </div>
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col p-[13.099998474121094px] box-border items-center justify-start gap-[8.73px]">
        <div className="self-stretch relative leading-[24.02px] font-medium">Choose your spice level</div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[8.73px] text-[15.28px]">
          <div className="rounded-[6.55px] bg-whitesmoke-100 hidden flex-col p-[8.733332633972168px] items-center justify-center">
            <div className="relative leading-[21.83px]">Chip Text Long</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.733332633972168px] items-center justify-center">
            <div className="relative leading-[21.83px]">Mild</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.733332633972168px] items-center justify-center">
            <div className="relative leading-[21.83px]">Medium</div>
          </div>
          <div className="rounded-[6.55px] bg-whitesmoke-100 flex flex-col p-[8.733332633972168px] items-center justify-center">
            <div className="relative leading-[21.83px]">Spicy</div>
          </div>
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col p-[13.099998474121094px] box-border items-center justify-start text-[15.28px]">
        <div className="self-stretch relative text-[17.47px] leading-[24.02px] font-medium text-gray-200">
          Pizza Ingredients
        </div>
        <div className="self-stretch hidden flex-col py-[8.733332633972168px] pr-0 pl-[43.66666793823242px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_15.28px)] left-[0px] rounded-7xl-2 bg-whitesmoke-200 w-[34.93px] h-[34.93px] z-[0]" />
          <div className="self-stretch relative leading-[21.83px] z-[1]">Title</div>
          <div className="self-stretch relative text-sm-1 leading-[17.47px] text-gray-100 z-[2]">Subtitle</div>
          <div className="absolute my-0 mx-[!important] bottom-[-0.55px] left-[0px] bg-gray-500 w-[366.8px] h-[1.09px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_17.47px)] left-[0px] text-[21.83px] leading-[34.93px] text-gray-200 text-center z-[4]">
            😀
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.733332633972168px] pr-0 pl-[43.66666793823242px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_14.61px)] left-[0px] rounded-7xl-2 bg-whitesmoke-200 w-[34.93px] h-[34.93px] z-[0]" />
          <div className="self-stretch relative leading-[21.83px] z-[1]">Flour</div>
          <div className="self-stretch relative text-sm-1 leading-[17.47px] text-gray-100 z-[2]">200g</div>
          <div className="absolute my-0 mx-[!important] bottom-[1.13px] left-[0px] bg-gray-500 w-[366.8px] h-[1.09px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_16.79px)] left-[0px] text-[21.83px] leading-[34.93px] text-gray-200 text-center z-[4]">
            🌾
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.733332633972168px] pr-0 pl-[43.66666793823242px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_14.61px)] left-[0px] rounded-7xl-2 bg-whitesmoke-200 w-[34.93px] h-[34.93px] z-[0]" />
          <div className="self-stretch relative leading-[21.83px] z-[1]">Cheese</div>
          <div className="self-stretch relative text-sm-1 leading-[17.47px] text-gray-100 z-[2]">100g</div>
          <div className="absolute my-0 mx-[!important] bottom-[1.13px] left-[0px] bg-gray-500 w-[366.8px] h-[1.09px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_16.79px)] left-[0px] text-[21.83px] leading-[34.93px] text-gray-200 text-center z-[4]">
            🧀
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.733332633972168px] pr-0 pl-[43.66666793823242px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_14.61px)] left-[0px] rounded-7xl-2 bg-whitesmoke-200 w-[34.93px] h-[34.93px] z-[0]" />
          <div className="self-stretch relative leading-[21.83px] z-[1]">Tomatoes</div>
          <div className="self-stretch relative text-sm-1 leading-[17.47px] text-gray-100 z-[2]">2</div>
          <div className="absolute my-0 mx-[!important] bottom-[1.13px] left-[0px] bg-gray-500 w-[366.8px] h-[1.09px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_16.79px)] left-[0px] text-[21.83px] leading-[34.93px] text-gray-200 text-center z-[4]">
            🍅
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.733332633972168px] pr-0 pl-[43.66666793823242px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_14.61px)] left-[0px] rounded-7xl-2 bg-whitesmoke-200 w-[34.93px] h-[34.93px] z-[0]" />
          <div className="self-stretch relative leading-[21.83px] z-[1]">Basil</div>
          <div className="self-stretch relative text-sm-1 leading-[17.47px] text-gray-100 z-[2]">1 tsp</div>
          <div className="absolute my-0 mx-[!important] bottom-[1.13px] left-[0px] bg-gray-500 w-[366.8px] h-[1.09px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_16.79px)] left-[0px] text-[21.83px] leading-[34.93px] text-gray-200 text-center z-[4]">
            🌿
          </div>
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col p-[13.099998474121094px] box-border items-start justify-center gap-[4.37px]">
        <div className="self-stretch relative leading-[24.02px] font-medium">Special Instructions</div>
        <div className="self-stretch rounded-[6.55px] flex flex-row p-[8.733332633972168px] items-center justify-start text-[15.28px] text-gray-400 border-[1.1px] border-solid border-gray-500">
          <div className="flex-1 relative leading-[21.83px]">Please Enter</div>
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col py-[17.466665267944336px] px-[13.099998474121094px] box-border items-start justify-start text-white">
        <div
          className="self-stretch rounded-[8.73px] bg-black flex flex-col py-[10.916666984558105px] px-[13.099998474121094px] items-center justify-center cursor-pointer"
          onClick={onButtonContainerClick}
        >
          <div className="relative leading-[24.02px] font-medium">장바구니에 담기</div>
        </div>
      </div>
    </div>
  )
}

export default Menu
