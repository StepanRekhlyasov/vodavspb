import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import api from '../api/website'

function* fetchShop() : any {
	try {
		const shop = yield call(api.fetchShop)
		yield put({ type: 'SHOP_FETCH_SUCCEEDED', payload : shop })
	} catch (e : any) {
		yield put({ type: 'SHOP_FETCH_FAILED', message: e.message })
	}
}
function* mySaga() {
	yield takeLatest('SHOP_FETCH_REQUESTED', fetchShop)
}

export default mySaga