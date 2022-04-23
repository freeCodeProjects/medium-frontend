import { object, string, preprocess, TypeOf, z } from 'zod'
import { trimString, isFileImage, validateFileSize } from '../utils/helper'

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
	userName: string()
		.nonempty({ message: 'User name is required' })
		.min(3, {
			message: 'User name must be 3 or more characters long'
		})
		.max(50, {
			message: 'User name must be less than 50 characters long'
		})
		.regex(/^[a-zA-Z0-9_.!@#$%]*$/, {
			message: 'Allowed chars are "a-zA-Z0-9!@#$%._"'
		})
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
	profile: preprocess(
		(value: any) => {
			return value.length > 0 ? value : false
		},
		z
			.instanceof(FileList)
			.refine((value) => value && isFileImage(value[0]), {
				message: 'Selected file is not an image.'
			})
			.refine((value) => value && validateFileSize(value[0], 1), {
				message: 'File size is more than 1 MB.'
			})
	)
})

export const ResetPasswordMailSchema = object({
	email: string().nonempty({ message: 'Email is required' }).email({
		message: 'Invalid email address'
	})
})

export type UserSignupData = TypeOf<typeof SignupSchema>
export type UserLoginData = TypeOf<typeof LoginSchema>
export type ResetPasswordMailData = TypeOf<typeof ResetPasswordMailSchema>
export type UserName = TypeOf<typeof UserNameSchema>
export type Name = TypeOf<typeof NameSchema>
export type Bio = TypeOf<typeof BioSchema>
export type UserPhoto = TypeOf<typeof UserPhotoSchema>

export interface User {
	_id: string
	name: string
	userName: string
	bio: string
	photo: string
	followerCount: number
	followingCount: number
	bookmarks: string[]
}
