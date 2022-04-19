import { Box, Button, IconButton, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BoldTypography from '../ui/BoldTypography'
import { UserPhoto, UserPhotoSchema } from '../../types/userTypes'
import { useState, useEffect, FormEvent, useContext } from 'react'
import { useAppStore } from '../../store/appStore'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { LoadingButton } from '@mui/lab'
import { ErrorContext } from '../../context/ErrorContext'
import { useMutation } from 'react-query'
import { updatePhoto } from '../../api/userAPI'

const PhotoSetting = () => {
	const { setAlertData, user, setUser } = useAppStore()
	const [image, setImage] = useState(user?.photo)
	const [validFile, setValidFile] = useState<File | null>(null)
	const [editing, setEditing] = useState(false)
	const { serverErrorHandler } = useContext(ErrorContext)

	const { mutate, isLoading } = useMutation(
		(data: File) => {
			return updatePhoto(data)
		},
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData('Photo updated!')
				setUser(data.data.user)
			}
		}
	)

	const {
		register,
		watch,
		formState: { errors, isValidating }
	} = useForm<UserPhoto>({
		resolver: zodResolver(UserPhotoSchema),
		mode: 'onChange'
	})

	const tempProfile: UserPhoto['profile'] = watch('profile')

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (validFile) {
			mutate(validFile)
		}
	}

	const cancelEdit = () => {
		setEditing(false)
		setImage(user?.photo)
	}

	useEffect(() => {
		cancelEdit()
	}, [user])

	useEffect(() => {
		if (isValidating) {
			return
		}

		if (errors?.profile?.message) {
			setAlertData(errors?.profile?.message, 'error')
			return
		}

		if (tempProfile?.length > 0) {
			setValidFile(tempProfile[0])
			setImage(URL.createObjectURL(tempProfile[0]))
		}
	}, [tempProfile, isValidating])

	return (
		<Box sx={{ mt: 3 }}>
			<BoldTypography variant="h6">Photo</BoldTypography>
			<Box
				onSubmit={onSubmit}
				component="form"
				sx={{
					display: 'flex',
					flexWrap: 'wrap'
				}}
				noValidate
				autoComplete="off">
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mr: 2,
						width: { xs: '100%', sm: '65%', md: '75%' }
					}}>
					<Box sx={{ mr: 2 }}>
						<Typography variant="body2" sx={{ mt: 2 }}>
							Your photo appears on your Profile page and with your stories
							across Medium.
						</Typography>
						<Typography variant="body2" sx={{ mt: 1 }}>
							File type should be image. Max allowed size is 1MB.
						</Typography>
					</Box>
					<Box
						sx={{
							height: 100,
							minWidth: 100,
							maxWidth: 100,
							borderRadius: '50%',
							border: '2px solid rgba(105,105,105, 0.2)',
							position: 'relative'
						}}>
						<img
							style={{
								height: '100%',
								width: '100%',
								objectFit: 'cover',
								borderRadius: '50%'
							}}
							src={image}
						/>
						{editing && (
							<Box
								sx={{
									position: 'absolute',
									top: '0',
									borderRadius: '50%'
								}}>
								<IconButton
									sx={{
										height: 100,
										width: 100,
										position: 'relative',
										color: 'grey.400'
									}}
									aria-label="delete">
									<CameraAltOutlinedIcon sx={{ fontSize: 64 }} />
									<input
										style={{
											height: '100%',
											width: '100%',
											position: 'absolute',
											opacity: 0
										}}
										accept="image/*"
										type="file"
										{...register('profile')}
									/>
								</IconButton>
							</Box>
						)}
					</Box>
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: { sm: 'flex-end' },
						alignItems: { sm: 'start' },
						mt: { xs: 1, sm: 0 }
					}}>
					{!editing ? (
						<Button variant="outlined" onClick={() => setEditing(true)}>
							Edit
						</Button>
					) : (
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 1,
								justifyContent: 'end'
							}}>
							<LoadingButton
								loading={isLoading}
								type="submit"
								variant="outlined"
								color="success">
								Save
							</LoadingButton>
							<Button variant="outlined" color="inherit" onClick={cancelEdit}>
								Cancel
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
}
export default PhotoSetting
