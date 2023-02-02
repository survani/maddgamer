import BootstrapIcon from "@/components/BootstrapIcon";
import menu from "@/config/menus.json";
import siteConfig from "@/config/site.config.json";
import subscription from "@/config/subscription.json";
import { ArrowUpRight } from "@/utils/Icons";
import Link from "next/link";

const Footer = () => {
	const { copyright, socialLinks } = siteConfig;

	return (
		<footer className='bg-white'>
			<div className='line-bg'>
				<div className='newsletter-block border-bottom'>
					<div className='container'>
						<div className='row gy-5 align-items-center justify-content-center text-center text-md-start'>
							<div className='col-xl-5 col-lg-5 col-md-6 col-sm-10'>
								<div className='pe-0 pe-xl-4'>
									<h2 className='mb-3 lh-sm'>{subscription.title}</h2>
									<p className='mb-0'>{subscription.subtitle}</p>
								</div>
							</div>
							<div className='col-xl-4 col-lg-5 col-md-6'>
								<div className='ps-0 ps-xl-4'>
									<div id='mc_embed_signup'>
										<form
											action={subscription.mailChimpFormAction}
											method='post'
											id='mc-embedded-subscribe-form'
											name='mc-embedded-subscribe-form'
											target='_blank'
										>
											<div id='mc_embed_signup_scroll' className='input-group'>
												<input
													type='text'
													name='NAME'
													className='form-control w-100'
													id='mce-NAME'
													placeholder={subscription.formNamePlaceholder}
													aria-label='Name'
													autoComplete='new-name'
												/>
												<input
													type='email'
													name='EMAIL'
													className='form-control w-100 required email'
													id='mce-EMAIL'
													placeholder={subscription.formEmailPlaceholder}
													aria-label='Subscription'
													autoComplete='new-email'
													required
												/>
												<div id='mce-responses' className='clear'>
													<div
														className='response'
														id='mce-error-response'
														style={{ display: "none" }}
													></div>
													<div
														className='response'
														id='mce-success-response'
														style={{ display: "none" }}
													></div>
												</div>
												<div
													style={{ position: "absolute", left: "-5000px" }}
													aria-hidden='true'
												>
													<input
														type='text'
														name={subscription.mailChimpFormName}
														tabIndex='-1'
													/>
												</div>
												<div className='input-group-append w-100'>
													<button
														type='submit'
														name='subscribe'
														id='mc-embedded-subscribe'
														className='input-group-text w-100 mb-0'
														aria-label='Subscription Button'
													>
														{subscription.formButtonLabel}
														<ArrowUpRight className='ms-auto' />
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='footer-bottom'>
				<div className='container'>
					<div className='row gy-3 align-items-center'>
						<div className='col-lg-4 order-2 order-lg-1 text-center text-lg-start'>
							<p className='mb-0 copyright-text'>{copyright}</p>
						</div>
						<div className='col-lg-4 text-center order-1'>
							<ul className='list-unstyled'>
								{menu.footerMenu.map((menu, key) => (
									<li key={key} className='d-inline-block mx-3'>
										<Link href={menu.link} className='text-link'>
											{menu.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className='col-lg-4 order-0 order-lg-2'>
							<ul className='list-unstyled social-links d-flex align-items-center justify-content-center justify-content-lg-end'>
								<li className='me-2 fw-medium'>Follow Us:</li>
								{socialLinks.map((data, key) => (
									<li key={key} className='ms-1'>
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
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
