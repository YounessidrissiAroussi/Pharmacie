import React, { useState } from "react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";
const SideNavBar = (props) => {
	const [isExpanded, setExpendState] = useState(false)
	const menuItems = [
		{

			id : 1,
			text: "Accueil",
			icon: "icons/grid.svg",
			to : "/"
		},
		{
			id : 2,
			text: "Produits",
			icon: "icons/shopping-cart.svg",
			to : "/Produit"		
		},
		{
			id : 3,
			text: "Patients",
			icon: "icons/user.svg",
			to : "/Patient"
		},
		{
			id : 4,
			text: "Ordonnance",
			icon: "icons/pie-chart.svg",
			to : "/Ordonnance"	
			
		},
		// {
		// 	id : 5,
		// 	text: "Type medicament",
		// 	icon: "icons/folder.svg",
		// 	to : "/TypeMedicament"		
		// },
		
		{
			id : 5,
			text: "Parametre",
			icon: "icons/settings.svg",
			to : "/Parametre"		
		},
	];
	return(
		
	
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/logo.svg" alt="img" />
							<h2>Pharmacie</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon  , to , id}) => (
						<Link key={id}
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							to={to}
						>
							<img className="menu-item-icon" src={icon} alt="" />
							{isExpanded && <p>{text}</p>}
						</Link>
					))} 
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt="img"
						/>
								<div className="nav-footer-info">
							<p className="nav-footer-user-name">{props.user.NomUtilisateur}</p>
							<p className="nav-footer-user-position" style={{color : "white"}}>Pharmacie Admin</p>
						</div>
						
					</div>
				)}
				<a href="http://localhost:3000">
					<img className="logout-icon"  src="icons/logout.svg" alt="img" />
					</a>
		</div>
		</div>
		

	
	)
};

export default SideNavBar;
