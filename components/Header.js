import Search from "@/components/Search";
import { AppContext } from "@/components/UseContext";
import Menu from "@/config/menus.json";
import siteConfig from "@/config/site.config.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BootstrapIcon from "./BootstrapIcon";
import TopHeader from "./TopHeader";

const Header = () => {
	const { logo, logoText, socialLinks, headerSubline } = siteConfig;

	const { toggleSearch } = useContext(AppContext);
	const [searchOpen, setSearchOpen] = toggleSearch;
	const router = useRouter();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		// search close using Escape key
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				setSearchOpen(false);
				setIsMenuOpen(false);
			}
		});

		// add class to body
		if ((isMenuOpen || searchOpen) === true) {
			document.body.classList.add("noScroll");
		} else {
			document.body.classList.remove("noScroll");
		}

		// sticky header
		let nav = document.querySelector("header");
		var lastKnownScrollY = 0;
		var currentScrollY = 0;
		const classes = {
			pinned: "header-nav-pinned",
			unpinned: "header-nav-unpinned",
		};
		let navbarPinUnpin = () => {
			currentScrollY = window.pageYOffset;
			if (currentScrollY < lastKnownScrollY) {
				pin();
			} else if (currentScrollY > lastKnownScrollY) {
				if (window.scrollY >= 300) {
					unpin();
				}
			}
			lastKnownScrollY = currentScrollY;
		};
		let pin = () => {
			if (nav.classList.contains(classes.unpinned)) {
				nav.classList.remove(classes.unpinned);
				nav.classList.add(classes.pinned);
			}
		};
		let unpin = () => {
			if (
				nav.classList.contains(classes.pinned) ||
				!nav.classList.contains(classes.unpinned)
			) {
				nav.classList.remove(classes.pinned);
				nav.classList.add(classes.unpinned);
			}
		};
		// navbar interactions
		window.onscroll = () => {
			navbarPinUnpin();
		};
	}, [setSearchOpen, setIsMenuOpen, isMenuOpen, searchOpen]);

	return (
		<>
			<TopHeader />
			<header className={`header-nav ${isMenuOpen ? "nav-open" : ""}`}>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<nav className='navbar navbar-expand-lg navbar-light p-0'>
								<button
									className='navbar-toggler d-inline-flex d-lg-none'
									type='button'
									aria-label='Toggle navigation'
									onClick={() => setIsMenuOpen(!isMenuOpen)}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='32'
										height='32'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
										<line x1='4' y1='6' x2='20' y2='6'></line>
										<line x1='4' y1='12' x2='14' y2='12'></line>
										<line x1='4' y1='18' x2='18' y2='18'></line>
									</svg>
								</button>

								<Link href='/' className='navbar-brand d-flex mb-0 me-0'>
									<Image
										src={logo}
										alt={logoText}
										className='img-fluid'
										width='110'
										height='43'
										priority
									/>
								</Link>

								<p className='mx-5 text-white my-2 d-none d-lg-block fw-bold'>
									{headerSubline}
								</p>

								<div className='d-block d-lg-none '>
									<button
										className='search-toggle'
										aria-label='Search Toggle'
										onClick={() => setSearchOpen(!searchOpen)}
									>
										<svg
											width='28'
											height='28'
											strokeWidth='1.5'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M15.5 15.5L19 19'
												stroke='currentColor'
												strokeLinecap='square'
												strokeLinejoin='square'
											/>
											<path
												d='M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z'
												stroke='currentColor'
												strokeLinecap='square'
												strokeLinejoin='square'
											/>
										</svg>
									</button>
								</div>

								<div className='collapse navbar-collapse ' id='navHeader'>
									<div
										className={`w-100 d-block d-lg-none mb-4 ms-1 sticky-top animate`}
									>
										<button
											className='navbar-toggler opacity-50'
											type='button'
											aria-label='Toggle navigation'
											onClick={() => setIsMenuOpen(!isMenuOpen)}
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='menu-close'
												width='32'
												height='32'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path
													stroke='none'
													d='M0 0h24v24H0z'
													fill='none'
												></path>
												<line x1='18' y1='6' x2='6' y2='18'></line>
												<line x1='6' y1='6' x2='18' y2='18'></line>
											</svg>
										</button>
									</div>
									<ul className={`navbar-nav ms-auto animate `}>
										{Menu.mainMenu.map((n, i) =>
											n.submenu ? (
												<li
													key={i}
													className={`nav-item dropdown
                          ${n.submenu
														.map((n) =>
															router.pathname == `${n.link}` ? `active` : ""
														)
														.join("")}
                        `}
												>
													<a
														className='nav-link dropdown-toggle'
														href={n.link}
														role='button'
														data-bs-toggle='dropdown'
														aria-haspopup='true'
														aria-expanded='false'
													>
														{n.name}
													</a>
													<ul className='dropdown-menu'>
														{n.submenu.map((n, i) => (
															<li key={i}>
																<Link
																	href={n.link}
																	className={`dropdown-item ${
																		router.pathname == `${n.link}`
																			? `active`
																			: ""
																	}`}
																>
																	{n.name}
																</Link>
															</li>
														))}
													</ul>
												</li>
											) : (
												<li
													key={i}
													className={`nav-item ${
														router.pathname == `${n.link}` ? `active` : ""
													}`}
												>
													<Link href={n.link} className='nav-link'>
														{n.name}
													</Link>
												</li>
											)
										)}
									</ul>

									<ul
										className={`list-unstyled social-links d-flex flex-wrap d-lg-none align-items-center mt-auto w-100 animate`}
									>
										<li
											className='fw-medium flex-grow-1 flex-shrink-1 mb-1 text-white '
											style={{ flexBasis: "100%", marginLeft: "12px" }}
										>
											Social links:
										</li>
										{socialLinks.map((data, key) => (
											<li key={key}>
												<a
													className='is-hoverable'
													href={data.link}
													title={data.name}
													target='_blank'
													rel='noreferrer'
												>
													<BootstrapIcon icon={data.icon} size={16} />
												</a>
											</li>
										))}
									</ul>

									<div className='navbar-right d-none d-lg-block'>
										<button
											className='search-toggle ms-2'
											aria-label='Search Toggle'
											onClick={() => setSearchOpen(!searchOpen)}
										>
											<svg
												width='30'
												height='30'
												strokeWidth='1.5'
												viewBox='0 0 24 24'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M15.5 15.5L19 19'
													stroke='currentColor'
													strokeLinecap='square'
													strokeLinejoin='square'
												/>
												<path
													d='M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z'
													stroke='currentColor'
													strokeLinecap='square'
													strokeLinejoin='square'
												/>
											</svg>
										</button>
									</div>
								</div>
							</nav>
						</div>
					</div>
				</div>

				<div
					className={`menu-overlay ${isMenuOpen ? `is-visible` : ``}`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				></div>

				<Search />
			</header>
		</>
	);
};
export default Header;
