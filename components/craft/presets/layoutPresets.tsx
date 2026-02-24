'use client';

import React from 'react';
import { Element } from '@craftjs/core';
import { Brand, Button, IconButton, LinkList, Nav, SocialLinks, Text } from '@/components/craft/nodes/primitives';
import { FlexSlot, Footer, Header } from '@/components/craft/nodes/layout';

export const headerPresets = [
  { label: 'Header: Simple', element: <Header><Element is={FlexSlot} canvas><Brand /></Element><Element is={FlexSlot} canvas /><Element is={FlexSlot} canvas justify="end"><Nav /></Element></Header> },
  { label: 'Header: Centered', element: <Header desktopLayout="column" tabletLayout="column" mobileLayout="column"><Element is={FlexSlot} canvas justify="center"><Brand /></Element><Element is={FlexSlot} canvas justify="center"><Nav /></Element><Element is={FlexSlot} canvas /></Header> },
  { label: 'Header: Split', element: <Header><Element is={FlexSlot} canvas><Brand /></Element><Element is={FlexSlot} canvas justify="center"><Nav /></Element><Element is={FlexSlot} canvas justify="end"><Button text="Get Started" /></Element></Header> },
  { label: 'Header: Sticky', element: <Header sticky shadow><Element is={FlexSlot} canvas><Brand /></Element><Element is={FlexSlot} canvas /><Element is={FlexSlot} canvas justify="end"><Nav /></Element></Header> },
  { label: 'Header: Transparent', element: <Header transparent textColor="#ffffff" borderColor="#ffffff"><Element is={FlexSlot} canvas><Brand color="#ffffff" /></Element><Element is={FlexSlot} canvas /><Element is={FlexSlot} canvas justify="end"><Nav color="#ffffff" /></Element></Header> },
  { label: 'Header: Hamburger', element: <Header><Element is={FlexSlot} canvas><IconButton icon="☰" /><Brand /></Element><Element is={FlexSlot} canvas /><Element is={FlexSlot} canvas justify="end"><IconButton icon="🔍" /></Element></Header> },
  { label: 'Header: Utility + Main', element: <Header desktopLayout="column" tabletLayout="column" mobileLayout="column" height={110}><Element is={FlexSlot} canvas justify="between"><Text text="Free shipping over $100" fontSize={12} /><Nav links="Help,Track order,Support" /></Element><Element is={FlexSlot} canvas justify="between"><Brand /><Nav /></Element><Element is={FlexSlot} canvas /></Header> },
  { label: 'Header: Search', element: <Header><Element is={FlexSlot} canvas><Brand /></Element><Element is={FlexSlot} canvas justify="center"><Button text="Search input" background="#f1f5f9" color="#334155" /></Element><Element is={FlexSlot} canvas justify="end"><Nav links="Deals,Categories" /></Element></Header> },
  { label: 'Header: E-commerce', element: <Header><Element is={FlexSlot} canvas><Brand text="Shop" /></Element><Element is={FlexSlot} canvas justify="center"><Nav links="Women,Men,Kids,Sale" /></Element><Element is={FlexSlot} canvas justify="end"><IconButton icon="🔍" /><IconButton icon="🛒" /></Element></Header> },
  { label: 'Header: Auth', element: <Header><Element is={FlexSlot} canvas><Brand /></Element><Element is={FlexSlot} canvas /><Element is={FlexSlot} canvas justify="end"><Button text="Sign in" background="#e2e8f0" color="#0f172a" /><Button text="Sign up" /></Element></Header> }
];

export const footerPresets = [
  { label: 'Footer: Simple', element: <Footer><Element is={FlexSlot} id="footer-top" canvas justify="center"><Text text="© 2026 Acme Inc." fontSize={14} color="#e2e8f0" /></Element></Footer> },
  { label: 'Footer: 3 Columns', element: <Footer><Element is={FlexSlot} canvas id="footer-columns" align="start" wrap><Brand /><LinkList title="Company" links="About,Careers,Press" /><LinkList title="Support" links="Help,Docs,Contact" /></Element></Footer> },
  { label: 'Footer: 4 Columns', element: <Footer><Element is={FlexSlot} canvas id="footer-columns" align="start" wrap><LinkList title="Products" links="App,API,Integrations" /><LinkList title="Resources" links="Guides,Blog,Status" /><LinkList title="Company" links="About,Careers" /><LinkList title="Legal" links="Terms,Privacy" /></Element></Footer> },
  { label: 'Footer: Newsletter', element: <Footer><Element is={FlexSlot} canvas id="footer-top" justify="between"><Text text="Join newsletter" color="#f8fafc" /><Button text="Subscribe" /></Element><Element is={FlexSlot} canvas id="footer-columns" wrap><LinkList /><LinkList title="Company" links="About,Careers" /></Element></Footer> },
  { label: 'Footer: Social', element: <Footer><Element is={FlexSlot} canvas id="footer-bottom" justify="between"><Text text="© Acme" color="#f8fafc" /><SocialLinks /></Element></Footer> },
  { label: 'Footer: Fat', element: <Footer paddingY={56}><Element is={FlexSlot} canvas id="footer-columns" wrap><LinkList title="Products" links="A,B,C,D,E" /><LinkList title="Developers" links="Docs,API,SDKs" /><LinkList title="Support" links="Status,Help,Contact" /><LinkList title="Company" links="About,Careers,Press" /></Element><Element is={FlexSlot} canvas id="footer-bottom" justify="between"><Text text="© Acme" color="#f8fafc" /><Nav links="Privacy,Terms,Sitemap" color="#e2e8f0" /></Element></Footer> },
  { label: 'Footer: Legal + Language', element: <Footer><Element is={FlexSlot} canvas id="footer-bottom" justify="between"><Nav links="Privacy,Terms,Cookies" color="#e2e8f0" /><Button text="EN ▼" background="#1e293b" /></Element></Footer> },
  { label: 'Footer: Contact', element: <Footer><Element is={FlexSlot} canvas id="footer-columns" wrap><LinkList title="Contact" links="hello@acme.com,+1 555-111,Map" /><LinkList title="Hours" links="Mon-Fri 8-6,Sat 9-2" /></Element></Footer> },
  { label: 'Footer: App Download', element: <Footer><Element is={FlexSlot} canvas id="footer-columns" justify="between" wrap><Text text="Get our app" color="#f8fafc" /><Button text="App Store" /><Button text="Google Play" /></Element></Footer> },
  { label: 'Footer: E-commerce', element: <Footer><Element is={FlexSlot} canvas id="footer-columns" wrap><LinkList title="Support" links="Shipping,Returns,Track order" /><LinkList title="Policies" links="Terms,Privacy,Refunds" /><LinkList title="Payments" links="Visa,Mastercard,PayPal" /></Element><Element is={FlexSlot} canvas id="footer-bottom" justify="between"><Text text="© Acme Store" color="#f8fafc" /><SocialLinks /></Element></Footer> }
];
