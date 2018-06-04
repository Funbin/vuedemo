<template>
	<div class="business-option">
		<label>{{data.title}}</label>
		<el-checkbox v-model="isCheck" class="checkbox" v-if="data.isCheck">不计免赔</el-checkbox>
		<span class="space" v-if="!data.isCheck"></span>
		<el-switch class="switch" v-model="isBusiness" on-color="#ff7e0f" off-color="" on-text="" off-text="" v-if="data.isSwitch">
		</el-switch>
		<el-select id="select-money" v-model="value" placeholder="请选择" v-if="!data.isSwitch">
			<el-option v-for="item in options" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
	</div>
</template>
<script type="text/babel">
	export default {
		name: "business-option",
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				options: [
					{
						value: '1万',
						label: '1万'
					}, {
						value: '10万',
						label: '10万'
					}, {
						value: '50万',
						label: '50万'
					}
				],
				isBusiness: true,
				isCheck: true,
				value: "50万"
			}
		}
	}
</script>
<style lang="less" scoped>
	@import url("../../assets/less/base");
	.business-option {
		.display-flex;
		.align-items(center);
		height: 1rem;
		margin-left: .1rem;
		border-top: 1px solid #e5e5e5;
		>.space {
			.flex;
		}
	}
</style>
<style lang="less">
	@import url("../../assets/less/base");
	#select-money {
		input {
			width: 1rem;
			font-size: .3rem;
			padding-left: 0;
			border: none!important;
			text-align: right;
			padding-right: .3rem;
			margin-right: 0;
		}
		i {
			width: auto!important;
			&:before {
				content: "\E603";
			}
		}
	}

	.switch {
		width: 1rem!important;
		text-align: right;
	}

	.checkbox {
		.flex;
		padding-right: .89rem;
		margin-right: 0;
		text-align: right;
		>span {
			>span {
				.compat(border-radius,
				9px)
			}
		}
	}
</style>