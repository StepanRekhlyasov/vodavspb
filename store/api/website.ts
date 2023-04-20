import axios from 'axios';
const baseUrl = 'https://old.vodavspb.ru';

const data = new FormData()
data.append("key", 'AMAKEYVERYSECRETKEY');

export default {
	fetchShop : async () => {
		const result = await axios.get(`${baseUrl}/api/posts/` )
		return result?.data
	}
}