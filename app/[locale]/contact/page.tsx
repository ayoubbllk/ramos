"use client";

import { Mail, MapPin } from "lucide-react";
import { use, useState, type FormEvent } from "react";
import { Reveal } from "@/components/animations";
import { HeroTechFrame } from "@/components/hero-tech-frame";
import { SiteButton } from "@/components/site-button";
import type { Locale } from "@/lib/data";

export default function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const fr = locale === "fr";
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${data.get("topic") || "Ramos Group"} — ${data.get("company") || data.get("name")}`;
    const body = `${fr ? "Nom" : "Name"}: ${data.get("name")}\nEmail: ${data.get("email")}\n${fr ? "Organisation" : "Company"}: ${data.get("company") || "—"}\n\n${data.get("message")}`;
    setSent(true);
    window.location.href = `mailto:contact@ramos-group.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact-page">
      <HeroTechFrame variant="page" />
      <div className="contact-intro">
        <Reveal><p className="eyebrow">Contact</p></Reveal>
        <Reveal delay={150}>
          <h1>{fr ? "Donnons une nouvelle échelle à vos ambitions." : "Give your ambitions a new scale."}</h1>
        </Reveal>
        <Reveal delay={300}>
          <p>{fr ? "Partenariat, investissement ou projet : notre équipe vous orientera vers la bonne expertise." : "Partnership, investment or project: our team will connect you with the right expertise."}</p>
        </Reveal>
        <Reveal delay={400}>
          <div className="contact-details">
            <a href="mailto:contact@ramos-group.com"><Mail size={18} />contact@ramos-group.com</a>
            <p><MapPin size={18} />Alger, Algérie</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200} direction="right">
        <form className="contact-form" onSubmit={submit}>
          <div className="field-row">
            <label>{fr ? "Prénom et nom" : "Full name"}<input required name="name" autoComplete="name" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" /></label>
          </div>
          <label>{fr ? "Organisation" : "Company"}<input name="company" autoComplete="organization" /></label>
          <label>
            {fr ? "Je souhaite parler de" : "I'd like to discuss"}
            <select name="topic" defaultValue="">
              <option value="" disabled>{fr ? "Sélectionnez un sujet" : "Select a topic"}</option>
              <option>{fr ? "Partenariat" : "Partnership"}</option>
              <option>{fr ? "Projet" : "Project"}</option>
              <option>{fr ? "Investissement" : "Investment"}</option>
              <option>{fr ? "Presse" : "Press"}</option>
            </select>
          </label>
          <label>{fr ? "Votre message" : "Your message"}<textarea required name="message" rows={5} /></label>
          <SiteButton type="submit" variant="action" fullWidth>
            {fr ? "Envoyer la demande" : "Send inquiry"}
          </SiteButton>
          {sent && (
            <p className="form-status" role="status">
              {fr ? "Votre application de messagerie va s'ouvrir pour envoyer la demande." : "Your email application will open so you can send the inquiry."}
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
