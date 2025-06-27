import { PromptOption } from '@/app/lib/definitions'

export type OptionProps = {
  option: PromptOption
  currentUserID: string
  slotSize: number
  handleOptionClick: (optionID: string) => void
}

export default function Option(props: OptionProps) {
  const { option, currentUserID, slotSize, handleOptionClick } = props
  const hasVoted = option.votes.filter((v) => v === currentUserID).length > 0 ? true : false
  const pathData = !hasVoted
    ? 'M 8.3 20.33 C 11.39,22.17 16.61,22.17 19.7 20.33'
    : 'M 8.3 21 C 11.39,21.95 16.61,21.95 19.7 21'

  return (
    <div
      style={{ marginLeft: slotSize * (option.votes.length + 0.35 - 1) }}
      className='flex transition-all duration-300'
    >
      <div className='h-12 w-8 pt-2'>
        <div className='h-7 w-7 my-2 rounded-xl -translate-x-1/3'>
          <svg
            onClick={() => handleOptionClick(option.id)}
            className='cursor-pointer rounded-full overflow-hidden'
            viewBox='0 0 28 28'
          >
            <circle className='fill-white stroke-black stroke-1' cx='14' cy='14' r='13.333' />
            <g style={{ transform: hasVoted ? 'translate(10.28px, 0)' : 'none' }} className=''>
              <circle className='' cy='14' r='2.35' cx='7' />
              <circle className='' cy='14' r='2.35' cx='21' />
              <path
                className='stroke-black stroke-1'
                d={pathData}
                style={{ transform: hasVoted ? 'translate(-4px, 0px)' : 'none' }}
              />
            </g>
          </svg>
        </div>
      </div>
      <div className='pt-4 text-shadow'>{option.title}</div>
    </div>
  )
}
