'use client'
import Option from '@/app/ui/option'
import { OptionRemovalModal } from '@/app/ui/modal'
import { Prompt, PromptOption } from '@/app/lib/definitions'
import React, { useState } from 'react'

export type PromptProps = {
  currentUserID: string
  prompt: Prompt
}

export default function PromptComponent(props: PromptProps) {
  const { currentUserID, prompt } = props
  const slotSize = 512 / prompt.users.length
  const [sujjestPrompt, setSujjestPrompt] = useState<Prompt>(prompt)
  const [addOptionVisible, setAddOptionVisible] = useState<boolean>(false)
  const [addOptionValue, setAddOptionValue] = useState<string>('')
  const [optionToRemove, setOptionToRemove] = useState<PromptOption | void>()

  const handleAddOptionClick = () => {
    if (addOptionVisible) {
      addNewOption(addOptionValue)
      setAddOptionValue('')
    }
    setAddOptionVisible(!addOptionVisible)
  }

  const handleAddOptionValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddOptionValue(event.target.value)
  }

  const handleNewOption = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const elementTarget = e.currentTarget as HTMLInputElement
      addNewOption(elementTarget.value)
      setAddOptionValue('')
      setAddOptionVisible(false)
    }
  }

  const addNewOption = (optionName: string) => {
    if (optionName === '') {
      return
    }
    const newOption = {
      id: 'option_' + optionName,
      title: optionName,
      createdBy: currentUserID,
      votes: [currentUserID],
    }
    setSujjestPrompt((prompt) => ({
      ...prompt,
      options: [...prompt.options, newOption],
    }))
  }

  const handleOptionClick = (optionID: string) => {
    const option = sujjestPrompt.options.filter((o) => o.id === optionID)[0]
    const hasVoted = option.votes.filter((v) => v === currentUserID).length > 0 ? true : false
    const updatedOptions = sujjestPrompt.options.map((option) => {
      if (option.id === optionID) {
        if (hasVoted) {
          const newVotes = option.votes.filter((v) => v != currentUserID)
          if (newVotes.length == 0) {
            // Removing last vote, pop modal
            setOptionToRemove(option)
            return option
          } else {
            return { ...option, votes: newVotes }
          }
        } else {
          return { ...option, votes: [...option.votes, currentUserID] }
        }
      }
      return option
    })
    setSujjestPrompt((prompt) => ({
      ...prompt,
      options: updatedOptions,
    }))
  }

  const handleModalClose = () => {
    setOptionToRemove()
  }

  const handleRemoveOption = () => {
    if (!optionToRemove) {
      return
    }
    const updatedOptions = sujjestPrompt.options.filter((o) => o.id != optionToRemove.id)
    setSujjestPrompt((prompt) => ({
      ...prompt,
      options: updatedOptions,
    }))
    setOptionToRemove()
  }

  const handleFinishlineClick = () => {
    if (sujjestPrompt.finishlineVotes.filter((u) => u === currentUserID).length > 0) {
      setSujjestPrompt((sujjestPrompt) => ({
        ...sujjestPrompt,
        finishlineVotes: sujjestPrompt.finishlineVotes.filter((u) => u != currentUserID),
      }))
    } else {
      setSujjestPrompt((sujjestPrompt) => ({
        ...sujjestPrompt,
        finishlineVotes: [...sujjestPrompt.finishlineVotes, currentUserID],
      }))
    }
  }

  return (
    <>
      <div className='text-xl break-words ml-2'>{sujjestPrompt.title}</div>
      {/* Track */}
      <div className='relative -mt-5 w-lg py-4 px-6'>
        {/* Steps */}
        <div
          className='rounded-xl absolute h-full w-full -mx-4 -my-2'
          style={{ background: 'linear-gradient(90deg, #E1E9EB, #FFF)' }}
        >
          <div className='absolute flex h-full w-full py-3 px-1'>
            {sujjestPrompt.users.map((user, _index) => (
              <div
                key={user.id}
                style={{
                  width: slotSize + 'px',
                  borderTop: '1px solid rgba(49,51,51,0.06)',
                  borderLeft: '3px solid rgba(49,51,51,0.06)',
                  borderBottom: '3px solid rgba(49,51,51,0.06)',
                  borderRight: '0px solid rgba(49,51,51,0.06)',
                  transitionTimingFunction: 'ease',
                  transitionDuration: '0.5s',
                }}
                className='h-full rounded-xl'
              ></div>
            ))}
          </div>
        </div>
        <div>
          <div onClick={handleAddOptionClick} className='option-plus cursor-pointer'></div>
          <div style={{ visibility: addOptionVisible ? 'visible' : 'hidden' }} className='addition'>
            <input
              onKeyUp={handleNewOption}
              value={addOptionValue}
              onChange={handleAddOptionValueChange}
              className='add '
              type='text'
              name='option'
              placeholder='Suggest an option'
            />
          </div>
        </div>
        {/* Options */}
        <div className='relative w-full'>
          {sujjestPrompt.options.map((option, _) => (
            <Option
              key={option.id}
              option={option}
              slotSize={slotSize}
              currentUserID={currentUserID}
              handleOptionClick={handleOptionClick}
            />
          ))}
        </div>
        {/* Finish line */}
        <div>
          <div
            onClick={handleFinishlineClick}
            style={{
              marginLeft:
                (slotSize - 5) *
                (sujjestPrompt.users.length - 1 - sujjestPrompt.finishlineVotes.length),
            }}
            className='finishline cursor-pointer transition-all duration-300'
          ></div>
        </div>
      </div>
      {optionToRemove && (
        <OptionRemovalModal
          isOpen={true}
          onClose={handleModalClose}
          onRemoveOption={handleRemoveOption}
          option={optionToRemove}
        />
      )}
      <div className='flex -mt-5'>
        {sujjestPrompt.users.map((user, _) => (
          <div key={user.id}>
            <div
              style={{
                backgroundImage: 'url(' + user.picture + ')',
              }}
              key={user.id}
              className='bg-cover m-2 rounded-full w-12 h-12 overflow-hidden'
            ></div>
            <div className='text-center'>{user.name}</div>
          </div>
        ))}
        <div>
          <div
            style={{ border: '2px dashed #949899' }}
            className='m-2 rounded-full w-12 h-12 overflow-hidden cursor-pointer 
                        before:content-["+"] before:text-5xl before:-translate-x-1/2 
                        before:absolute before:ml-[22px] before:block before:text-gray-400'
          ></div>
        </div>
      </div>
    </>
  )
}
