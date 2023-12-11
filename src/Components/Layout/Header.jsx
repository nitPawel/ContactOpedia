import logo from "../../images/logo192.png";

function Header() {
	return (
		<div className='py-2 pl-2 border-bottom'>
			<div className=''>
				<img
					src={logo}
					alt='logo'
					style={{ height: "35px", verticalAlign: "top" }}
				/>
				<span className='h2 pt4 text-white-50'>Contactopedia</span>
			</div>
		</div>
	);
}

export default Header;
