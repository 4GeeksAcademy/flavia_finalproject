import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			users: [],
			navbar_button: false,
			freelances: [],
			appointment: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			registerUser: async (newUser) => {
				try {
					const options = {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newUser)
					}
					const response = await fetch(`${process.env.BACKEND_URL}/signup`, options)
					const data = await response.json()
					if (response.ok) {
						console.log(data.msg)
						return true
					} else {
						toast.error(`${data.msg}`, {
							position: "bottom-center",
							autoClose: 2000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
							style: {
								backgroundColor: "rgb(205, 92, 8)",
							},
						});
						return false
					}
				} catch (err) {
					console.log(err)
				}
			},
			logInUser: async (user) => {
				try {
					const options = {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(user)
					}
					const response = await fetch(`${process.env.BACKEND_URL}/login`, options)
					const data = await response.json()
					if (response.ok) {
						console.log(data.access_token)
						sessionStorage.setItem('accessToken', data.access_token);
						return true
					} else {
						toast.error(`Try again! ${data.msg}`, {
							position: "bottom-center",
							autoClose: 2000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
							style: {
								backgroundColor: "rgb(205, 92, 8)",
							},
						});
						return false
					}
				} catch (err) {
					console.log(err)
				}
			},
			myAccount: async (token) => {
				try {
					const options = {
						method: 'GET',
						headers: { 'Authorization': `Bearer ${token}` }
					}
					const response = await fetch(`${process.env.BACKEND_URL}/my-account`, options)
					const data = await response.json()
					if (response.ok) {
						return data
					}
				} catch (err) {
					console.log(err)
				}
			},
			showForm: () => {
				const store = getStore();
				setStore({ navbar_button: !store.navbar_button })
			},
			allFreelancesActives: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/freelance`);
					const data = await response.json();
					setStore({
						freelances: data
					});
				} catch (err) {
					console.log(err);
				}
			},
			scheduleAppointment: async (appointment) => {
				try {
					const accessToken = sessionStorage.getItem('accessToken');
					const options = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
						body: JSON.stringify(appointment)
					}
					const response = await fetch(`${process.env.BACKEND_URL}/appointment`, options)
					const data = await response.json()
					if (response.ok) {
						toast.success(`Great! ${data.message}`, {
							position: "bottom-center",
							autoClose: 2000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
							style: {
								backgroundColor: "rgb(122, 157, 84)",
							},
						});
					} else {
						toast.error(`Try again! ${data.msg}`, {
							position: "bottom-center",
							autoClose: 2000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
							style: {
								backgroundColor: "rgb(205, 92, 8)",
							},
						});
					}
				} catch (err) {
					console.log(err)
				}
			},
			myAppointment: async (token) => {
				try {
					const options = {
						method: 'GET',
						headers: { 'Authorization': `Bearer ${token}` }
					}
					const response = await fetch(`${process.env.BACKEND_URL}/appointment`, options)
					const data = await response.json()
					if (response.ok) {
						return data
					}
				} catch (err) {
					console.log(err)
				}
			},
			confirmedAppointment: (freelanceId, day, hour) => {
				setStore({appointment: {
					"freelance_id": freelanceId,
					"day": day,
					"time": hour
				}})
			}
		}
	};
};

export default getState;
