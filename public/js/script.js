import { showAlert } from './alert';

export const deleteOne = async (id) => {
	try {
		const res = await axios(
			{
				method: 'DELETE',
				url: `${window.location.protocol}//${window.location.host}/api/v1/bookings/${id}`,
			},
			{
				withCredentials: true,
			}
		);
		if (res.status === 204) {
			showAlert('success', 'Reservation deleted successfully');
			window.setTimeout(() => {
				location.assign('/bookings');
			}, 1000);
		}
	} catch (error) {
		console.log(error);
		alert('Reservation could not be deleted');
	}
};

export const getBookings = async () => {
	try {
		const res = await axios(
			{
				method: 'GET',
				url: `${location.protocol}//${location.host}/api/v1/bookings`,
			},
			{ withCredentials: true }
		);

		const data = res.data;
		return data;
	} catch (error) {
		console.log(error);
		showAlert('error', error.response.data.error);
	}
};

export const logoutFunc = async () => {
	try {
		const res = await axios(
			{
				method: 'POST',
				url: `${window.location.protocol}//${window.location.host}/api/v1/auth/logout`,
			},
			{
				withCredentials: true,
			}
		);
		if (res.status === 204) {
			showAlert('success', 'Logout successful, redirecting');
			window.setTimeout(() => {
				location.assign('/login');
			}, 1000);
		}
		showAlert('error', 'Already logged out, redirecting');
		window.setTimeout(() => {
			location.assign('/login');
		}, 1000);
	} catch (error) {
		showAlert('error', error.response.data.message);
		console.log(error);
	}
};
export const updateOne = async (id, options) => {
	try {
		const res = await axios(
			{
				method: 'PATCH',
				url: `${window.location.protocol}//${window.location.host}/api/v1/bookings/${id}`,
				data: { ...options },
			},
			{
				withCredentials: true,
			}
		);
		if (res.status === 201) {
			showAlert('success', 'Booking updated successfully');
			window.setTimeout(() => {
				location.assign('/bookings');
			}, 1000);
		}
	} catch (error) {
		if (error.response.status === 11000) {
			showAlert('error', error.response.data.message);
		}
		console.log(error);
		showAlert('error', 'Update unsuccessful');
		location.assign('/bookings');
	}
};

export const createOne = async (options) => {
	try {
		const res = await axios(
			{
				method: 'POST',
				url: `${window.location.protocol}//${window.location.host}/api/v1/bookings`,
				data: { ...options },
			},
			{
				withCredentials: true,
			}
		);
		if (res.data.status === 'success') {
			showAlert('success', 'Booking successful');
			window.setTimeout(() => {
				location.reload();
			}, 500);
		}
	} catch (error) {
		if (error.response.status === 11000) {
			showAlert('error', error.response.data.error);
		} else {
			showAlert('error', error.response.data.error);
			console.log(error);
		}
	}
};

export const exportOpt = async () => {
	try {
		const res = await axios({
			method: 'GET',
			url: `${window.location.protocol}//${window.location.host}/api/v1/bookings-download`,
		});
		if (res.status === 200) {
			window.open(
				`${window.location.protocol}//${window.location.host}/bookings.csv`
			);
		}
	} catch (error) {
		showAlert('error', 'File not downloaded');
		console.log(error);
	}
};

export const availableDates = async (hallname, from, to) => {
	try {
		const res = await axios({
			method: 'GET',
			url: `${window.location.protocol}//${window.location.host}/api/v1/bookings/getavailability/hallname/${hallname}/from/${from}/to=${to}`,
		});
		return res;
	} catch (error) {
		showAlert('error', error.response.data.message);
		console.log(error);
	}
};
