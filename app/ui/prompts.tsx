'use client'
import PromptComponent from '@/app/ui/prompt'
import {
  getPrompts,
  voteOption,
  addNewOption,
  removeOption,
  finishlineVote,
} from '@/app/services/prompt'
import { Prompt } from '@/app/lib/definitions'
import { useState, useEffect } from 'react'

export default function PromptsComponent() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  useEffect(() => {
    getPrompts().then((prompts) => setPrompts(prompts))
  })

  const onOptionVote = (promptID: string, optionID: string, currentUserID: string) => {
    voteOption(promptID, optionID, currentUserID).then((prompt) => {
      setPrompts((prevPrompts) => prevPrompts.map((p) => (p.id === prompt.id ? prompt : p)))
    })
  }

  const onAddOption = (promptID: string, userID: string, optionName: string) => {
    addNewOption(promptID, userID, optionName).then((prompt) => {
      setPrompts((prevPrompts) => prevPrompts.map((p) => (p.id === prompt.id ? prompt : p)))
    })
  }

  const onRemoveOption = (promptID: string, optionID: string) => {
    removeOption(promptID, optionID).then((prompt) => {
      setPrompts((prevPrompts) => prevPrompts.map((p) => (p.id === prompt.id ? prompt : p)))
    })
  }

  const onFinishlineVote = (promptID: string, userID: string) => {
    finishlineVote(promptID, userID).then((prompt) => {
      setPrompts((prevPrompts) => prevPrompts.map((p) => (p.id === prompt.id ? prompt : p)))
    })
  }

  return prompts.map((prompt, _) => (
    <PromptComponent
      key={prompt.id}
      prompt={prompt}
      currentUserID={'user1'}
      onOptionVote={onOptionVote}
      onAddOption={onAddOption}
      onRemoveOption={onRemoveOption}
      onFinishlineVote={onFinishlineVote}
    />
  ))
}
