import { CursusUser, ProjectUser } from "next-auth/providers/42-school"

export interface UserData {
	id: number
	email: string
	login: string
	first_name: string
	last_name: string
	usual_full_name: null | string
	usual_first_name: null | string
	url: string
	phone: "hidden" | string | null
	displayname: string
	image_url: string | null
	"staff?": boolean
	correction_point: number
	pool_month: string | null
	pool_year: string | null
	location: string | null
	wallet: number
	anonymize_date: string
	created_at: string
	updated_at: string | null
	alumni: boolean
	"is_launched?": boolean
	cursus_users: CursusUser[]
	projects_users: ProjectUser[];
  }
  