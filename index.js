require('dotenv').config()
const { Bot, GrammyError, HttpError, Keyboard } = require('grammy')

const bot = new Bot(process.env.BOT_API_KEY)

bot.api.setMyCommands([
	{ command: 'start', description: 'Что умеет бот' },
	{ command: 'help', description: 'Основный команды' },
	{ command: 'privacy', description: 'Пользовательское соглашение' },
])

bot.command('start', ctx => {
	ctx.reply('Добро пожаловать! Выберите услугу:')
})

bot.command('help', ctx => {
	ctx.reply('Добро пожаловать! Выберите услугу:')
})

bot.command('privacy', ctx => {
	ctx.reply('Добро пожаловать! Выберите услугу:')
})

bot.command('services', ctx => {
	ctx.reply(
		'Доступные услуги:\n1. Установка крана - 1000₽\n2. Чистка труб - 1500₽'
	)
})

bot.command('mood', ctx => {
	// const moodKeyboard = new Keyboard()
	// 	.text('Хорошо')
	// 	.row()
	// 	.text('Норм')
	// 	.row()
	// 	.text('Плохо')
	const moodLabels = ['Хорошо', 'Норм', 'Плохо']
	const rows = moodLabels.map(label => {
		return [Keyboard.text(label)]
	})
	const moodKeyboard2 = Keyboard.from(rows).resized()
	// .oneTime()
	ctx.reply('Как настроение?', {
		// reply_markup: moodKeyboard,
		reply_markup: moodKeyboard2,
	})
})

bot.hears('Хорошо', ctx => {
	ctx.reply('Класс!', {
		reply_markup: { remove_keyboard: true },
	})
})

bot.on(':text', ctx => {
	ctx.react('👍')
	ctx.reply('Спасибо за ваше сообщение!')
})

bot.catch(err => {
	const ctx = err.ctx
	console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`)
	const e = err.error
	if (e instanceof GrammyError) {
		console.error('Ошибка в запросе:', e.description)
	} else if (e instanceof HttpError) {
		console.error('Не удалось связаться с Telegram:', e)
	} else {
		console.error('Неизвестная ошибка:', e)
	}
})

bot.start()
