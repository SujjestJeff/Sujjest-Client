import { Prompt, PromptOption, PromptUser } from '@/app/lib/definitions'

let prompts = [
  {
    id: 'fsad2id',
    title: 'Where should we eat?',
    createdBy: 'user1',
    options: [
      {
        id: 'option1',
        title: 'Jamba Juice',
        votes: ['user1', 'user2', 'user3'],
        createdBy: 'user1',
      },
      {
        id: 'option2',
        title: 'Red Robin',
        votes: ['user1'],
        createdBy: 'user1',
      },
      {
        id: 'option3',
        title: 'Five Guys',
        votes: ['user2', 'user3'],
        createdBy: 'user2',
      },
    ],
    users: [
      {
        id: 'user1',
        name: 'Jeff',
        picture:
          'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png',
      },
      {
        id: 'user2',
        name: 'Kjell',
        picture:
          'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2cwv92sJfw2rKgX5aBEfiFr7CnjNUrSgfputOmejKxaH84ItlU70TojjFMcqt0eGNSDWd3x_OB9Uiln4oYW_xs43cfYUVfTEej02WQV-Q20vslSCl3Ry2yTaqiO82Kz_4hxiEe_v5PLYD/s1600/new+funny+dp+%252Clatest+funny+image+%252C+funny+new+picture%252C+smily+%252C+cute+%252Clittle+cute+funny%252Cfacebook%252Cimage%252Cpicture%252Cwallpapers%252Cfacebook+profile+pic-facebook-dp+%25286%2529.jpg',
      },
      {
        id: 'user3',
        name: 'Sol',
        picture:
          'https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: 'user4',
        name: 'iLan',
        picture: 'https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg',
      },
      {
        id: 'user5',
        name: 'Joel',
        picture:
          'https://images.unsplash.com/photo-1649433658557-54cf58577c68?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbGUlMjBwcm9maWxlfGVufDB8fDB8fHww',
      },
    ],
    finishlineVotes: [],
  },
]

const getPrompt = (promptId: string): Prompt => {
  return prompts.filter((p) => p.id === promptId)[0]
}

const getPromptOption = (prompt: Prompt, optionId: string): PromptOption => {
  return prompt.options.filter((o) => o.id === optionId)[0]
}

const getPromptUser = (prompt: Prompt, userId: string): PromptUser => {
  return prompt.users.filter((u) => u.id === userId)[0]
}

export const getPrompts = (): Promise<Prompt[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(prompts)
    }, 500)
  })
}

export const voteOption = (promptId: string, optionId: string, userId: string): Promise<Prompt> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let prompt = getPrompt(promptId)
      let option = getPromptOption(prompt, optionId)
      if (option.votes.filter((v) => v === userId).length > 0) {
        option.votes = option.votes.filter((v) => v != userId)
      } else {
        option.votes.push(optionId)
      }
      resolve(prompt)
    }, 500)
  })
}
