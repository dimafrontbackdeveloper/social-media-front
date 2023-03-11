export function time2TimeAgo(date: string) {
	const initialUnix = Math.floor(new Date(date).getTime() / 1000)

	const d = new Date()
	const nowTs = Math.floor(d.getTime() / 1000)
	const seconds = nowTs - initialUnix

	if (seconds > 2 * 24 * 3600) {
		return 'несколько дней назад'
	}

	if (seconds > 24 * 3600) {
		return 'вчера'
	}

	if (seconds > 3600) {
		return 'несколько часов назад'
	}

	if (seconds > 1800) {
		return 'Полчаса назад'
	}

	if (seconds > 60) {
		return Math.floor(seconds / 60) + ' минут назад'
	}
}
