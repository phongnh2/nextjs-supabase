export interface IMessage {
  id: number
  content: string
  nickname: string
  user_id: string
  created_at: string
}

export interface IUser {
  userId: string
  nickname: string
}