<style lang="less" scoped>
	@import url("../assets/less/base");
	@paddingLeft: .25rem;
	@spaceRight: .3rem;
	@divHeight: 1rem;
	.base {
		.arrow(@path) when(isurl(@path)) {
			display: inline-block;
			width: .24rem;
			height: .12rem;
			background: @path no-repeat center center;
			background-size: .24rem .12rem;
		}
		.display-flex {
			display: -webkit-box;
			display: -moz-box;
			display: -o-box;
			display: box;
			display: -webkit-flex;
			display: -moz-flex;
			display: -o-flex;
			display: flex;
		}
		.flex(@arg: 1) {
			.compat(box-flex,@arg);
			.compat(flex,@arg);
		}
		.justify-content(center) {
			.compat(box-pack,center);
			.compat(justify-content,center);
		}
		.justify-content(space-between) {
			.compat(box-pack,justify);
			.compat(justify-content,space-between);
		}
		.align-items(center) {
			.compat(box-align,center);
			.compat(align-items,center);
		}
		.flex-wrap {
			.compat(box-lines,multiple);
			.compat(flex-wrap,wrap);
		}
	}

	.select-insurance {
		>div {
			background: #fff;
			margin-top: .25rem;
			padding-left: @paddingLeft;
			overflow: hidden;
			&:first-child {
				margin-top: 0;
			}
			>div {
				padding-right: @spaceRight;
			}
		}
		input {
			font-size: .3rem;
			color: #333;
		}
		label {
			white-space: nowrap;
			margin-right: @spaceRight;
		}
		.colorLump() {
			display: inline-block;
			width: .06rem;
			height: .3rem;
			background: #ff7e0f;
			vertical-align: middle;
			margin-right: .1rem;
			.base>.flex(0 0 .06rem);
		}
	}

	.user-info {
		padding: .1rem 0 .3rem @paddingLeft;
		>div {
			margin-top: .3rem;
			.base>.display-flex;
			.base>.align-items(center);
		}
		.user-id {
			>input {
				background: #EFF5F8;
				color: #bbb;
			}
		}
		.check-plate {
			>button {
				border: 1px solid #FF7E0F;
				border-radius: 6px;
				font-size: .24rem;
				color: #FF7E0F;
				background: transparent;
				padding: .08rem .09rem;
				&:last-child {
					margin-left: .25rem;
				}
			}
		}
		input {
			border: 1px solid fade(#8e8e8e, 40%);
			border-radius: 6px;
		}
	}

	.transfer {
		.isTransfer {
			.base>.display-flex;
			.base>.align-items(center);
			height: @divHeight;
			label {
				margin-right: 0;
			}
			i {
				.select-insurance>.colorLump;
			}
			input[type="checkbox"] {
				width: .72rem;
				height: 1rem;
				margin: 0;
				padding: 0;
				line-height: 1rem;
				vertical-align: middle;
				border: none;
				background: url(../assets/images/second-hand.png) no-repeat center center;
				background-size: .72rem .37rem;
				-webkit-appearance: none;
				order: 1;
			}
			input[type="checkbox"]:checked {
				background: url(../assets/images/second-hand-checked.png) no-repeat center center;
				background-size: .72rem .37rem;
				-webkit-appearance: none;
			}
			.flex1 {
				.base>.flex(1);
			}
		}
		.transferDate {
			height: 1rem;
			margin-left: .1rem;
			border-top: 1px solid #e5e5e5;
			overflow: hidden;
			box-sizing: border-box;
			.base>.display-flex;
			.base>.justify-content(space-between);
			.base>.align-items(center);
			.compat(transition,
			height .3s);
		}
	}

	.company {
		padding: .2rem @spaceRight .14rem @paddingLeft;
		.base>.display-flex;
		.base>.align-items(center);
		>i {
			.select-insurance>.colorLump;
		}
		>span {
			display: inline-block;
			width: 1.5rem;
			.base>.flex(0 0 1.5rem);
		}
		.company-list {
			padding-right: 0;
			.base>.display-flex;
			.base>.flex;
			.company-item {
				margin-right: 0;
				text-align: center;
				.base>.flex;
				img {
					display: block;
					width: .8rem;
					height: .8rem;
					margin: 0 auto;
				}
				.company-name {
					margin: 0 0 auto;
					>span {
						font-size: .2rem;
						margin-left: .1rem;
					}
					>input[type="checkbox"] {
						margin-top: .03rem;
						width: .18rem;
						height: .18rem;
						background: url(../assets/images/cb-normal.png) no-repeat center center;
						background-size: .18rem .18rem;
						.compat(appearance,none);
						&:checked {
							background: url(../assets/images/cb-checked.png) no-repeat center center;
							background-size: .18rem .18rem;
						}
					}
				}
			}
		}
	}



	/*投保人类型*/

	.user-type {
		height: 1rem;
		.base>.display-flex;
		.base>.align-items(center);
		>i {
			.select-insurance>.colorLump;
		}
	}



	/*被保人信息*/

	.insured-person {
		.insured-person-title {
			.base>.display-flex;
			.base>.align-items(center);
			height: @divHeight;
			>i {
				.select-insurance>.colorLump;
			}
			>.arrow-up {
				.base>.arrow(url(../assets/images/Path.png));
				.compat(transition,transform .3s);
				.compat(transform,rotate(180deg));
				margin-right: 0;
				.base>.flex(0 0 .24rem);
			}
			>span {
				.base>.flex;
			}
			.is-reverse {
				.compat(transform,rotate(0));
			}
		}
		.insured-person-info {
			padding-left: .1rem;
			padding-right: 0;
			.compat(transition,height .5s);
			>div {
				.base>.display-flex;
				.base>.align-items(center);
				border-top: 1px solid #e5e5e5;
				padding-right: @spaceRight;
				height: @divHeight;
				overflow: hidden;
				>input {
					display: block;
					border: none;
				}
			}
		}
	}



	/*商业险*/

	.business {
		max-height: 13rem;
		.compat(transition,max-height 1s);
	}



	/*上一年投保*/

	.last-year-insurance {
		.last-company-date {
			padding: .25rem 0;
			>div {
				height: .6rem;
				.display-flex;
				.align-items(center);
			}
		}
		.last-insurance-type {
			table {
				width: 100%;
				color: #8e8e8e;
				>tr:first-child {
					color: #333;
				}
				td {
					width: 50%;
					height: .8rem;
					line-height: .3rem;
					border: 1px solid #e5e5e5;
					vertical-align: middle;
					text-align: center;
					>span:last-child {
						font-size: .24rem;
					}
				}
			}
		}
	}

	.next {
		background: transparent;
		padding-right: @spaceRight;
		margin: .3rem 0;
		padding-top: .1rem;
	}
</style>
<style lang="less">
	.select {
		flex: 1;
		input {
			font-size: .3rem;
			padding-left: 0;
			border: none!important;
		}
		i {
			width: auto!important;
			&:before {
				content: "\E603";
			}
		}
	}

	.input {
		font-size: .3rem;
		color: #333;
		width: 60%!important;
	}

	#date-picker {
		width: auto!important;
		i {
			display: none;
		}
		input {
			font-size: .3rem;
			border: none;
			padding: 0;
			text-align: right;
		}
	}
</style>
<template>
	<div class="select-insurance">
		<div class="user-info">
			<div>
				<label for="plateNo">车牌号码:</label>
				<span>粤A123456</span>
			</div>
			<div>
				<label for="userName">车主姓名:</label>
				<el-input class="input" placeholder="请输入内容" value="王大大"></el-input>
			</div>
			<div class="user-id">
				<label for="userId">身份证号:</label>
				<el-input class="input" disabled="disabled" placeholder="请输入内容" value="125467199505062222"></el-input>
			</div>
			<div>
				<label for="brandModel">品牌型号:</label>
				<span>明锐svw7199HSG桥车</span>
			</div>
			<div class="check-plate">
				<label style="width:1.3rem;"></label>
				<el-button>校验车型</el-button>
				<el-button>已换车？点击修改</el-button>
			</div>
			<div>
				<label for="regDate">注册日期:</label>
				<span>2014-04-02</span>
			</div>
		</div>
		<!-- 个人信息结束 -->
		<div class="transfer">
			<div class="isTransfer">
				<i></i>
				<span class="flex1">是否过户车</span>
				<!-- <input type="checkbox" autocomplete="off"> -->
				<el-switch v-model="isTransfer" on-color="#ff7e0f" off-color="" on-text="" off-text="">
				</el-switch>
			</div>
			<div class="transferDate" :style="{height:isTransfer?'1rem':0,'border-top-width':isTransfer?'1px':0}">
				<label>请选择过户日期</label>
				<!-- <span>2017年4月4号</span> -->
				<el-date-picker id="date-picker" v-model="transferDate" type="date" format="yyyy年MM月dd号">
				</el-date-picker>
			</div>
		</div>
		<!-- 是否过户结束 -->
		<div class="company">
			<i></i>
			<span>报价公司:</span>
			<div class="company-list">
				<label class="company-item">
					<img src="../assets/images/pingan.png">
					<div class="company-name">
						<input type="checkbox" autocomplete="off">
						<span>平安</span>
					</div>
				</label>
				<label class="company-item">
					<img src="../assets/images/taipingyang.png">
					<div class="company-name">
						<input type="checkbox" autocomplete="off">
						<span>太平洋</span>
					</div>
				</label>
				<label class="company-item">
					<img src="../assets/images/renbao.png">
					<div class="company-name">
						<input type="checkbox" autocomplete="off">
						<span>人保</span>
					</div>
				</label>
				<label class="company-item">
					<img src="../assets/images/guoshou.png">
					<div class="company-name">
						<input type="checkbox" autocomplete="off">
						<span>国寿</span>
					</div>
				</label>
			</div>
		</div>
		<!-- 报价公司结束 -->
		<div class="user-type">
			<i></i>
			<label>投保人类型</label>
			<el-select class="select" v-model="value0" placeholder="选择投保人类型">
				<el-option v-for="item in userTypes" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<!-- 投保人类型结束-->
		<div class="insured-person">
			<div class="insured-person-title" @click="toggleInsured">
				<i></i>
				<span>被保险人信息</span>
				<i class="arrow-up" :class="{'is-reverse':!isInsured}"></i>
			</div>
			<div class="insured-person-info" :style="{height:isInsured?'5.1rem':0}">
				<div>
					<label>被保险人姓名</label>
					<input type="text" value="王大大">
				</div>
				<div>
					<label>被保险人证件类型</label>
					<!-- <div>
										<span>身份证</span>
										<i class="arrow-up"></i>
									</div> -->
					<el-select class="select" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div>
					<label>被保险人证件号码</label>
					<input type="text" value="439023199009099919">
				</div>
				<div>
					<label>被保险人电话</label>
					<input type="text" placeholder="请输入被保人电话">
				</div>
				<div>
					<label>被保险人邮箱</label>
					<input type="text" placeholder="请输入被保人邮箱">
				</div>
			</div>
		</div>
		<!-- 被保人类型结束-->
		<div class="transfer">
			<div class="isTransfer">
				<i></i>
				<span class="flex1">交强险/车船险</span>
				<!-- <input type="checkbox" autocomplete="off"> -->
				<el-switch v-model="isForce" on-color="#ff7e0f" off-color="" on-text="" off-text="">
				</el-switch>
			</div>
			<div class="transferDate" :style="{height:isForce?'1rem':0,'border-top-width':isForce?'1px':0}">
				<label>交强险起保时间</label>
				<!-- <span>2017年4月4号</span> -->
				<el-date-picker id="date-picker" v-model="forceDate" type="date" format="yyyy年MM月dd号">
				</el-date-picker>
			</div>
		</div>
		<!-- 交强险结束 -->
		<div class="transfer">
			<div class="isTransfer">
				<i></i>
				<span class="flex1">商业险</span>
				<!-- <input type="checkbox" autocomplete="off"> -->
				<el-switch v-model="isBusiness" on-color="#ff7e0f" off-color="" on-text="" off-text="">
				</el-switch>
			</div>
			<div class="business" :style="{'max-height':isBusiness?'13rem':0,'border-top-width':isBusiness?'1px':0}">
				<div class="transferDate">
					<label>商业险起保时间</label>
					<!-- <span>2017年4月4号</span> -->
					<el-date-picker id="date-picker" v-model="businessDate" type="date" format="yyyy年MM月dd号">
					</el-date-picker>
				</div>
				<business-option v-for="item in list" :data="item"></business-option>
			</div>
		</div>
		<!-- 商业险结束 -->
		<div class="last-year-insurance">
			<div class="last-company-date">
				<div>
					<label>上年投保公司：</label>
					<span>平安车险</span>
				</div>
				<div>
					<label>交强险到期时间：</label>
					<span>2017-2-15</span>
				</div>
				<div>
					<label>商业险到期时间：</label>
					<span>2017-2-15</span>
				</div>
			</div>
			<div class="last-insurance-type">
				<!-- <el-table
								    :data="tableData"
								    border
								    style="width: 100%"
								    fit="isFit">
								    <el-table-column
								      prop="insuranceType"
								      label="险种"
								      width="180"
								      fit="isFit">
								    </el-table-column>
								    <el-table-column
								      prop="insuranceLines"
								      label="保额"
								      width="180">
								    </el-table-column>
								</el-table> -->
				<table cellpadding="0" cellspacing="0">
					<tr>
						<td>险种</td>
						<td>保额</td>
						<!-- <th>险种</th>
										<th>保额</th> -->
					</tr>
					<tr v-for="item in tableData">
						<td>{{item.insuranceType}}</td>
						<td>
							<span>{{item.insuranceLines}}</span>
							<br v-if="item.insuranceLines.indexOf('¥') != -1">
							<span>{{item.insuranceDeductible}}</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- 上一年投保 -->

		<div class="next">
			<el-button type="primary" size="large" style="width:100%;height:1rem;">下一步</el-button>
		</div>
	</div>
</template>
<script type="text/babel">
	import businessOption from "../components/BusinessOption"
	export default {
		data() {
			return {
				options: [
					{
						value: '身份证',
						label: '身份证'
					}, {
						value: '驾驶证',
						label: '驾驶证'
					}, {
						value: '护照',
						label: '护照'
					}],
				userTypes: [{
					value: '类型一',
					label: '类型一'
				}, {
					value: '类型二',
					label: '类型二'
				}, {
					value: '类型三',
					label: '类型三'
				}
				],
				list: [
					{
						title: '车辆损失险',
						isCheck: true,
						isSwitch: true
					},
					{
						title: '第三者责任险',
						isCheck: true,
						isSwitch: false
					},
					{
						title: '司机座位险',
						isCheck: true,
						isSwitch: false
					},
					{
						title: '乘客座位险',
						isCheck: true,
						isSwitch: false
					},
					{
						title: '全车盗抢险',
						isCheck: true,
						isSwitch: true
					},
					{
						title: '划痕险',
						isCheck: false,
						isSwitch: false
					},
					{
						title: '玻璃单独破碎险',
						isCheck: false,
						isSwitch: false
					},
					{
						title: '自燃损失险',
						isCheck: false,
						isSwitch: true
					},
					{
						title: '涉水行驶损失险',
						isCheck: false,
						isSwitch: true
					},
					{
						title: '车损无法找到第三方险',
						isCheck: false,
						isSwitch: true
					},
					{
						title: '指定修理厂险',
						isCheck: false,
						isSwitch: false
					}
				],
				tableData: [
					{
						insuranceType: '交强险/车船税',
						insuranceLines: '投保',
						insuranceDeductible: '',
					},
					{
						insuranceType: '车辆损失险',
						insuranceLines: '投保',
						insuranceDeductible: '（不计免赔）',
					},
					{
						insuranceType: '第三者责任险',
						insuranceLines: '¥200,000',
						insuranceDeductible: '（不计免赔）',
					},
					{
						insuranceType: '司机座位责任险',
						insuranceLines: '¥200,000',
						insuranceDeductible: '（不计免赔）',
					},
					{
						insuranceType: '乘客座位责任险',
						insuranceLines: '¥200,000',
						insuranceDeductible: '（不计免赔）',
					},
					{
						insuranceType: '划痕险',
						insuranceLines: '¥200,000',
						insuranceDeductible: '（不计免赔）',
					},
				],
				value: '身份证',
				value0: '类型一',
				isTransfer: true,
				forceDate: new Date(),
				businessDate: new Date(),
				transferDate: new Date(),
				disabled: true,
				isInsured: true,
				isForce: true,
				isBusiness: true,
				isFit: false,
			}
		},
		components: {
			businessOption
		},
		methods: {
			toggleInsured() {
				this.isInsured = !this.isInsured;
			}
		}
	}
</script>
