import { FunctionComponent, useCallback } from 'react'

const Cart: FunctionComponent = () => {
  const onButtonContainerClick = useCallback(() => {
    // Please sync "Checkout" to the project
  }, [])

  return (
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-[15.35px] text-gray-100 font-roboto">
      <div className="relative bg-white w-[393px] h-[96.96px] text-center text-[19.74px]">
        <div className="absolute top-[48.48px] left-[34.93px] leading-[26.32px] font-medium flex items-center justify-center w-[323.13px]">
          Cart
        </div>
        <img className="absolute top-[0px] left-[0px] w-[393px] h-[26.44px]" alt="" src="/top.svg" />
        <img
          className="absolute top-[calc(50%_-_0px)] right-[353.7px] w-[26.2px] h-[26.44px]"
          alt=""
          src="/icleft.svg"
        />
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col p-[13.160706520080566px] box-border items-center justify-start">
        <div className="self-stretch relative text-[17.55px] leading-[24.13px] font-medium text-gray-400">
          Your Cart
        </div>
        <div className="self-stretch hidden flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_15.43px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Title</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[2]">Subtitle</div>
          <div className="absolute my-0 mx-[!important] bottom-[-0.55px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_17.63px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[4]">
            😀
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_15.71px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Product A</div>
          <div className="relative text-[17.55px] tracking-[0.55px] leading-[26.32px] z-[2]">- 1 +</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[3]">$10.99</div>
          <div className="absolute my-0 mx-[!important] bottom-[0.26px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[4]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_17.91px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[5]">
            🍔
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_15.71px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Product B</div>
          <div className="relative text-[17.55px] tracking-[0.55px] leading-[26.32px] z-[2]">- 1 +</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[3]">$7.50</div>
          <div className="absolute my-0 mx-[!important] bottom-[0.26px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[4]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_17.91px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[5]">
            🍟
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_15.71px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Product C</div>
          <div className="relative text-[17.55px] tracking-[0.55px] leading-[26.32px] z-[2]">- 1 +</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[3]">$5.80</div>
          <div className="absolute my-0 mx-[!important] bottom-[0.26px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[4]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_17.91px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[5]">
            🥤
          </div>
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col p-[13.160706520080566px] box-border items-center justify-start">
        <div className="self-stretch relative text-[17.55px] leading-[24.13px] font-medium text-gray-400">
          Total Price
        </div>
        <div className="self-stretch hidden flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_15.42px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Title</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[2]">Subtitle</div>
          <div className="absolute my-0 mx-[!important] bottom-[-0.55px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_17.63px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[4]">
            😀
          </div>
        </div>
        <div className="self-stretch flex flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_18.48px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Subtotal</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[2]">$24.29</div>
          <div className="absolute my-0 mx-[!important] bottom-[0.83px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_20.68px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[4]" />
        </div>
        <div className="self-stretch flex flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_18.48px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Tax</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[2]">$2.03</div>
          <div className="absolute my-0 mx-[!important] bottom-[0.83px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_20.68px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[4]" />
        </div>
        <div className="self-stretch flex flex-col py-[8.773805618286133px] pr-0 pl-[43.869014739990234px] items-start justify-center relative">
          <div className="absolute my-0 mx-[!important] top-[calc(50%_-_18.48px)] left-[0px] rounded-[26.32px] bg-whitesmoke w-[34.93px] h-[35.26px] z-[0]" />
          <div className="self-stretch relative leading-[21.93px] z-[1]">Total</div>
          <div className="self-stretch relative text-[13.16px] leading-[17.55px] text-gray-200 z-[2]">$26.32</div>
          <div className="absolute my-0 mx-[!important] bottom-[0.83px] left-[0px] bg-gray-300 w-[366.8px] h-[1.1px] z-[3]" />
          <div className="self-stretch absolute my-0 mx-[!important] top-[calc(50%_-_20.68px)] left-[0px] text-[21.93px] leading-[35.1px] text-gray-400 text-center z-[4]" />
        </div>
      </div>
      <div className="w-[393px] overflow-hidden flex flex-col py-[17.547611236572266px] px-[13.160706520080566px] box-border items-start justify-start text-[17.55px] text-white">
        <div
          className="self-stretch rounded-[8.77px] bg-black flex flex-col py-[10.967253684997559px] px-[13.160706520080566px] items-center justify-center cursor-pointer"
          onClick={onButtonContainerClick}
        >
          <div className="relative leading-[24.13px] font-medium">주문하기</div>
        </div>
      </div>
    </div>
  )
}

export default Cart
