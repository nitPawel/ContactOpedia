import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";

class ContactIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contactList: [
				{
					id: 1,
					name: "Ben Parker",
					phone: "666-666-7770",
					email: "ben@dotnet.com",
					isFavorite: false,
				},
				{
					id: 2,
					name: "Karol Okrasa",
					phone: "111-222-7770",
					email: "karol@okrasa.pl",
					isFavorite: true,
				},
				{
					id: 3,
					name: "Robert Makłowicz",
					phone: "666-444-6780",
					email: "r.maklowicz@dotnet.com",
					isFavorite: true,
				},
			],
			selectedContact: undefined,
			isUpdating: false,
		};
	}

	handleAddContact = newContact => {
		if (newContact.name == "") {
			return { status: "failure", msg: "Please enter a valid Name" };
		} else if (newContact.phone == "") {
			return { status: "failure", msg: "please enter a valid Phone" };
		}
		const duplicateRecord = this.state.contactList.filter(x => {
			if (x.name == newContact.name && x.phone == newContact.phone) {
				return true;
			}
		});
		if (duplicateRecord.length > 0) {
			return { status: "failure", msg: "Duplicate Record" };
		} else {
			const newFinalContact = {
				...newContact,
				id: this.state.contactList[this.state.contactList.length - 1].id + 1,
				isFavorite: false,
			};
			this.setState(prevState => {
				return {
					contactList: prevState.contactList.concat([newFinalContact]),
				};
			});

			return { status: "success", msg: "contact was added successfully" };
		}
	};

	handleUpdateContact = updatedContact => {
		if (updatedContact.name == "") {
			return { status: "failure", msg: "Please enter a valid Name" };
		} else if (updatedContact.phone == "") {
			return { status: "failure", msg: "please enter a valid Phone" };
		}

		this.setState(prevState => {
			return {
				contactList: prevState.contactList.map(obj => {
					if (obj.id == updatedContact.id) {
						return {
							...obj,
							name: updatedContact.name,
							email: updatedContact.email,
							phone: updatedContact.phone,
						};
					}
					return obj;
				}),
				isUpdating: false,
				selectedContact: undefined,
			};
		});
		return { status: "success", msg: "contact was added successfully" };
	};

	handleToggleFavorites = contact => {
		this.setState(prevState => {
			return {
				contactList: prevState.contactList.map(obj => {
					if (obj.id == contact.id) {
						return { ...obj, isFavorite: !obj.isFavorite };
					}
					return obj;
				}),
			};
		});
	};

	handleDeleteContact = contactId => {
		this.setState(prevState => {
			return {
				contactList: prevState.contactList.filter(obj => {
					return obj.id !== contactId;
				}),
			};
		});
	};

	handleAddRandomContact = newContact => {
		const newFinalContact = {
			...newContact,
			id: this.state.contactList[this.state.contactList.length - 1].id + 1,
			isFavorite: false,
		};
		this.setState(prevState => {
			return {
				contactList: prevState.contactList.concat([newFinalContact]),
			};
		});
	};

	handleDeleteAllContacts = () => {
		this.setState(prevState => {
			return {
				contactList: [],
			};
		});
	};

	handleUpdateClick = contact => {
		console.log(contact);
		this.setState(prevState => {
			return {
				selectedContact: contact,
				isUpdating: true,
			};
		});
	};

	handleCancelUpdateContact = contact => {
		this.setState(prevState => {
			return {
				selectedContact: undefined,
				isUpdating: false,
			};
		});
	};

	render() {
		return (
			<div>
				<Header />
				<div className='container' style={{ minHeight: "85vh" }}>
					<div className='row py-3'>
						<div className='col-4 offset-2 row'>
							<AddRandomContact
								handleAddRandomContact={this.handleAddRandomContact}
							/>
						</div>
						<div className='col-4 row'>
							<RemoveAllContact
								handleDeleteAllContacts={this.handleDeleteAllContacts}
							/>
						</div>
						<div className='row py-2'>
							<div className='col-8 offset-2 row'>
								<AddContact
									handleAddContact={this.handleAddContact}
									isUpdating={this.state.isUpdating}
									selectedContact={this.state.selectedContact}
									cancelUpdateContact={this.handleCancelUpdateContact}
									handleUpdateContact={this.handleUpdateContact}
								/>
							</div>
						</div>
						<div className='row py-2'>
							<div className='col-8 offset-2 row'>
								<FavoriteContacts
									contacts={this.state.contactList.filter(
										u => u.isFavorite == true
									)}
									favoriteClick={this.handleToggleFavorites}
									deleteClick={this.handleDeleteContact}
									editClick={this.handleUpdateClick}
								/>
							</div>
						</div>
						<div className='row py-2'>
							<div className='col-8 offset-2 row'>
								<GeneralContacts
									contacts={this.state.contactList.filter(
										u => u.isFavorite == false
									)}
									favoriteClick={this.handleToggleFavorites}
									deleteClick={this.handleDeleteContact}
									editClick={this.handleUpdateClick}
								/>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default ContactIndex;
