<template>
	<div class="page">
		<slot/>
	</div>
</template>

<style scoped lang="scss">
.page {
    display: flex;
    flex-direction: column;
    align-items: center;

	position: relative;

    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 10px 20px 0;
    gap: 10px;
}
</style>