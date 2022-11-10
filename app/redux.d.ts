type UserSliceType = {
  isLoggedIn: boolean,
  isExist: boolean,
  userInfo: UserType,
  isLoading: boolean,
  errorMessage: string
}

type UserType = {
  token: string | null,
  email: string | null,
  name: string | null,
  photoUrl: string | null,
}

type UserInputType = {
  age: string,
  email: string | null,
  gender: string,
  phone_number: string,
}