class MyAccountController {
	constructor() {
		this.name = 'myAccount';
		this.accountBaseInfo = {
			version: '免费',
			stores: [
				{
					id: 1,
					name: '徐汇区肇嘉浜路店'
				},{
					id: 2,
					name: '人民广场店'
				}
			],
			user: {
				name: '18098776787'
			}
		}
	}
}

export default MyAccountController;
