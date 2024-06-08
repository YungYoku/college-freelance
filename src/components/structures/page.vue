<template>
	<div class="page">
		<slot/>
	</div>
</template>

<style scoped lang="scss">
.page {

	position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 10px 20px 0 20px;
    gap: 10px;

	@media (max-width: 768px) {
		padding: 5px 15px 0 15px;
	}
}
</style>