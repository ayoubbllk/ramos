"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { use, useState, type FormEvent } from "react";
import { Reveal } from "@/components/animations";
import { HeroTechFrame } from "@/components/hero-tech-frame";
import { SiteButton } from "@/components/site-button";
import type { Locale } from "@/lib/data";

const copy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    company: string;
    topic: string;
    topicPlaceholder: string;
    topics: string[];
    message: string;
    submit: string;
    sent: string;
  }
> = {
  fr: {
    eyebrow: "Contact",
    title: "Donnons une nouvelle échelle à vos ambitions.",
    lead: "Partenariat, investissement ou projet : notre équipe vous orientera vers la bonne expertise.",
    name: "Prénom et nom",
    company: "Organisation",
    topic: "Je souhaite parler de",
    topicPlaceholder: "Sélectionnez un sujet",
    topics: ["Partenariat", "Projet", "Investissement", "Presse", "Filiale"],
    message: "Votre message",
    submit: "Envoyer la demande",
    sent: "Votre application de messagerie va s'ouvrir pour envoyer la demande.",
  },
  en: {
    eyebrow: "Contact",
    title: "Give your ambitions a new scale.",
    lead: "Partnership, investment or project: our team will connect you with the right expertise.",
    name: "Full name",
    company: "Company",
    topic: "I'd like to discuss",
    topicPlaceholder: "Select a topic",
    topics: ["Partnership", "Project", "Investment", "Press", "Subsidiary"],
    message: "Your message",
    submit: "Send inquiry",
    sent: "Your email application will open so you can send the inquiry.",
  },
  de: {
    eyebrow: "Kontakt",
    title: "Geben Sie Ihren Ambitionen eine neue Dimension.",
    lead: "Partnerschaft, Investition oder Projekt: unser Team führt Sie zur richtigen Expertise.",
    name: "Vor- und Nachname",
    company: "Organisation",
    topic: "Ich möchte sprechen über",
    topicPlaceholder: "Thema wählen",
    topics: ["Partnerschaft", "Projekt", "Investition", "Presse", "Tochtergesellschaft"],
    message: "Ihre Nachricht",
    submit: "Anfrage senden",
    sent: "Ihre E-Mail-Anwendung öffnet sich, um die Anfrage zu senden.",
  },
  it: {
    eyebrow: "Contatto",
    title: "Diamo una nuova scala alle vostre ambizioni.",
    lead: "Partnership, investimento o progetto: il nostro team vi orienterà verso la giusta expertise.",
    name: "Nome e cognome",
    company: "Organizzazione",
    topic: "Vorrei parlare di",
    topicPlaceholder: "Seleziona un argomento",
    topics: ["Partnership", "Progetto", "Investimento", "Stampa", "Filiale"],
    message: "Il vostro messaggio",
    submit: "Invia la richiesta",
    sent: "Si aprirà la vostra applicazione di posta per inviare la richiesta.",
  },
};

export default function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const c = copy[locale] || copy.en;
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${data.get("topic") || "Ramos Group"} — ${data.get("company") || data.get("name")}`;
    const body = `${c.name}: ${data.get("name")}\nEmail: ${data.get("email")}\n${c.company}: ${data.get("company") || "—"}\n\n${data.get("message")}`;
    setSent(true);
    window.location.href = `mailto:contact@ramos-group.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact-page">
      <HeroTechFrame variant="page" />
      <div className="contact-intro">
        <Reveal><p className="eyebrow">{c.eyebrow}</p></Reveal>
        <Reveal delay={150}>
          <h1>{c.title}</h1>
        </Reveal>
        <Reveal delay={300}>
          <p>{c.lead}</p>
        </Reveal>
        <Reveal delay={400}>
          <div className="contact-details">
            <a href="mailto:contact@ramos-group.com"><Mail size={18} />contact@ramos-group.com</a>
            <a href="tel:+213783202064"><Phone size={18} />+213 783 20 20 64</a>
            <a href="tel:+213783242623"><Phone size={18} />+213 783 24 26 23</a>
            <p><MapPin size={18} />Rue Issat Idir, Villa N° 35, Chéraga, Algérie</p>
            <p><MapPin size={18} />Rue Résidence Immar, Djenan Sfari, Gue de Constantine, Alger</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200} direction="right">
        <form className="contact-form" onSubmit={submit}>
          <div className="field-row">
            <label>{c.name}<input required name="name" autoComplete="name" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" /></label>
          </div>
          <label>{c.company}<input name="company" autoComplete="organization" /></label>
          <label>
            {c.topic}
            <select name="topic" defaultValue="">
              <option value="" disabled>{c.topicPlaceholder}</option>
              {c.topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>
          <label>{c.message}<textarea required name="message" rows={5} /></label>
          <SiteButton type="submit" variant="action" fullWidth>
            {c.submit}
          </SiteButton>
          {sent && (
            <p className="form-status" role="status">
              {c.sent}
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
