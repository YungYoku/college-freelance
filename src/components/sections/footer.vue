<template>
	<footer class="footer">
		<div class="footer__content">
			<div class="footer__column">
				<div class="footer__column-title">
					Обратная связь
				</div>

				<a
					class="footer__link"
					href="mailto:onyxmetaverse@gmail.com"
					target="_blank"
				>
					onyxmetaverse@gmail.com
				</a>
				<a
					class="footer__link"
					href="mailto:onyxmetaverse@yandex.ru"
					target="_blank"
				>
					onyxmetaverse@yandex.ru
				</a>
			</div>

			<!--			<div class="footer__column">-->
			<!--				<div class="footer__column-title">-->
			<!--					Сообщество-->
			<!--				</div>-->

			<!--				<a-->
			<!--					href="https://vk.com"-->
			<!--					target="_blank"-->
			<!--				>-->
			<!--					Вконтакте-->
			<!--				</a>-->
			<!--				<a-->
			<!--					href="https://telegram.org"-->
			<!--					target="_blank"-->
			<!--				>-->
			<!--					Телеграм-->
			<!--				</a>-->
			<!--				<a-->
			<!--					href="https://instagram.com"-->
			<!--					target="_blank"-->
			<!--				>-->
			<!--					Инстаграм-->
			<!--				</a>-->
			<!--			</div>-->

			<!--			<div class="footer__column">-->
			<!--				<div class="footer__column-title">-->
			<!--					Наши продукты-->
			<!--				</div>-->
			<!--			</div>-->

			<div class="footer__column">
				<div class="footer__column-title">
					Информация
				</div>

				<span>Скоро...</span>

				<!--				<span>О нас</span>-->

				<!--				<span>Реферальная программа</span>-->

				<!--				<span>Политика конфиденциальности</span>-->
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.footer {
	width: 100%;
	margin-top: auto;

	background-color: hsl(var(--primary-foreground));

	&__content {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		max-width: 1024px;
		margin: 0 auto;
		padding: 10px;
		gap: 20px;

		@media (max-width: 1024px) {
			gap: 15px;
		}
	}

	&__column {
		display: flex;
		flex-direction: column;

		width: calc(25% - 15px);

		font-size: 13px;
		gap: 5px;

		@media (max-width: 1024px) {
			width: calc(50% - 10px);
		}

		@media (max-width: 768px) {
			width: 100%;
		}

		&-title {
			font-size: 16px;
		}
	}

	&__link {
		&:hover {
			text-decoration: underline;
		}
	}
}
</style>