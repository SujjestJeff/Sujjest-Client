// This file contains type definitions for project data.

export type PromptUser = {
  id: string
  name: string
  picture: string
}

export type PromptOption = {
  id: string
  title: string
  createdBy: string
  votes: Array<string>
}

export type Prompt = {
  id: string
  title: string
  createdBy: string
  users: Array<PromptUser>
  options: Array<PromptOption>
  finishlineVotes: Array<string>
}
