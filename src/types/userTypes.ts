import { object, string, preprocess, TypeOf, z } from 'zod'
import { trimString } from '../utils/helper'

export const SignupSchema = object({
	name: preprocess(
		trimString,
		string()
			.nonempty({ message: 'Name is required' })
			.min(3, {
				message: 'Name must be 3 or more characters long'
			})
			.max(50, {
				message: 'Name must be less than 50 characters long'
			})
	),
	email: string().nonempty({ message: 'Email is required' }).email({
		message: 'Invalid email address'
	}),
	password: string().nonempty({ message: 'Password is required' }).min(6, {
		message: 'Password must be 6 or more characters long'
	}),
	confirmPassword: string()
		.nonempty({ message: 'Confirm password is required' })
		.min(6, {
			message: 'ConfirmPassword must be 6 or more characters long'
		})
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
	message: "Passwords don't match",
	path: ['confirmPassword']
})

export const LoginSchema = object({
	email: string().nonempty({ message: 'Email is required' }).email({
		message: 'Invalid email address'
	}),
	password: string().nonempty({ message: 'Password is required' }).min(6, {
		message: 'Password must be 6 or more characters long'
	})
})

export const NameSchema = object({
	name: preprocess(
		trimString,
		string()
			.nonempty({ message: 'Name is required' })
			.min(3, {
				message: 'Name must be 3 or more characters long'
			})
			.max(50, {
				message: 'Name must be less than 50 characters long'
			})
	)
})

export const UserNameSchema = object({
	name: preprocess(
		trimString,
		string()
			.nonempty({ message: 'Name is required' })
			.min(3, {
				message: 'Name must be 3 or more characters long'
			})
			.max(50, {
				message: 'Name must be less than 50 characters long'
			})
	)
})

export const BioSchema = object({
	bio: preprocess(
		trimString,
		string().max(160, {
			message: 'Bio must be less than 160 characters long'
		})
	)
})

export const UserPhotoSchema = object({
	profile: z.instanceof(File)
})

export type UserSignupData = TypeOf<typeof SignupSchema>
export type UserLoginData = TypeOf<typeof LoginSchema>
export type UserName = TypeOf<typeof UserNameSchema>
export type Name = TypeOf<typeof NameSchema>
export type Bio = TypeOf<typeof BioSchema>
export type UserPhoto = TypeOf<typeof UserPhotoSchema>

export interface User {
	_id: string
	name: string
	userName: string
	photo: string
	followerCount: number
	followingCount: number
	bookmarks: string[]
}
