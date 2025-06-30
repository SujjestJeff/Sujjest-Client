'use client'
import PromptComponent from '@/app/ui/prompt'
import { getPrompts } from '@/app/services/prompt'
import { Prompt } from '@/app/lib/definitions'
import { useState, useEffect } from 'react'

export default function PromptsComponent() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  useEffect(() => {
    getPrompts().then((prompts) => setPrompts(prompts))
  }, [])

  return prompts.map((prompt, _) => (
    <PromptComponent key={prompt.id} prompt={prompt} currentUserID={'user1'} />
  ))
}
