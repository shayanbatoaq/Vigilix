"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Arrow, Logo } from "./ui";
import { ThemeToggle } from "./theme-toggle";

type NavigationDiscipline = {
  id: string;
  short: string;
  label: string;
  description: string;
  services: { id: string; name: string }[];
};

export function Header({ disciplines }: { disciplines: NavigationDiscipline[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const close = () => { dialog.current?.close(); setMobileOpen(false); };
  return <>
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="Vigilix home" className="brand-link"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="nav-services" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)} onKeyDown={(e) => { if (e.key === "Escape") setServicesOpen(false); }}>
            <button type="button" className="nav-disclosure" aria-expanded={servicesOpen} aria-controls="services-mega" onClick={() => setServicesOpen(true)}>Services <span aria-hidden="true">⌄</span></button>
            <div className={`service-mega ${servicesOpen ? "is-open" : ""}`} id="services-mega" hidden={!servicesOpen}>
              {disciplines.map((d,i)=><section key={d.id} className={`mega-column ${d.id}`}>
                <Link href={`/services/${d.id}`} onClick={() => setServicesOpen(false)}><span>0{i+1} / {d.label}</span><strong>{d.short}</strong><p>{d.description}</p><b>Explore discipline <Arrow diagonal/></b></Link>
                <ul>{d.services.map((s)=><li key={s.id}><Link href={`/services/${d.id}#${s.id}`} onClick={() => setServicesOpen(false)}>{s.name}<Arrow diagonal/></Link></li>)}</ul>
              </section>)}
            </div>
          </div>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
          <Link href="/approach" aria-current={pathname === "/approach" ? "page" : undefined}>Our Approach</Link>
        </nav>
        <ThemeToggle />
        <Link className="header-contact" href="/contact">Speak to an Expert <Arrow /></Link>
        <button className="mobile-menu-trigger" aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { dialog.current?.showModal(); setMobileOpen(true); }}><span/><span/></button>
      </div>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" aria-label="Main menu" onClose={() => setMobileOpen(false)} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="mobile-menu-top"><Link href="/" onClick={close}><Logo /></Link><button onClick={close} aria-label="Close navigation">×</button></div>
      <nav aria-label="Mobile navigation">
        {[{href:"/",label:"Home"},{href:"/services",label:"Services"},{href:"/about",label:"About"},{href:"/approach",label:"Our Approach"},{href:"/contact",label:"Contact"}].map(item=><Link key={item.href} href={item.href} onClick={close} aria-current={pathname===item.href?"page":undefined}>{item.label}<Arrow diagonal /></Link>)}
        <div className="mobile-menu-services"><span>EXPLORE CAPABILITIES</span>{disciplines.map(d=><div key={d.id}><Link href={`/services/${d.id}`} onClick={close}>{d.short}<Arrow diagonal/></Link>{d.services.map(s=><Link className="mobile-sub-link" key={s.id} href={`/services/${d.id}#${s.id}`} onClick={close}>{s.name}</Link>)}</div>)}</div>
      </nav>
    </dialog>
  </>;
}
