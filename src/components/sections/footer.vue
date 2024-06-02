<template>
	<footer class="footer bg-primary-foreground">
		<div class="footer__content">
			<div class="footer__column">
				<div class="footer__column-title">
					Обратная связь
				</div>

				<a
					href="mailto:onyxmetaverse@gmail.com"
					target="_blank"
				>
					onyxmetaverse@gmail.com
				</a>
				<a
					href="mailto:onyxmetaverse@yandex.ru"
					target="_blank"
				>
					onyxmetaverse@yandex.ru
				</a>
			</div>

			<div class="footer__column">
				<div class="footer__column-title">
					Сообщество
				</div>

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
			</div>

			<div class="footer__column">
				<div class="footer__column-title">
					Наши продукты
				</div>
			</div>

			<div class="footer__column">
				<div class="footer__column-title">
					Информация
				</div>

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

	&__content {
		display: flex;
		justify-content: center;
		gap: 50px;

		max-width: 1920px;
		margin: 0 auto;
		padding: 10px;
	}

	&__column {
		display: flex;
		flex-direction: column;
		gap: 5px;

		font-size: 13px;

		&-title {
			font-size: 16px;
		}
	}
}
</style>