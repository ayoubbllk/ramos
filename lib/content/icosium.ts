import type { SubsidiaryDocument } from "./types";
import { en } from "./types";

/** Source: TEXTE ICOSIUM GLOBAL NETWORK ANG (1).docx — full text preserved */
export const icosiumDocument: SubsidiaryDocument = {
  overview: [
    {
      type: "p",
      text: en(
        "Icosium Global Network , a proud subsidiary of the Ramos Group, is a full-service communication and branding agency dedicated to transforming vision into influence. With a dynamic presence across North Africa, Europe, and the Mediterranean region , we serve as a strategic partner for companies seeking to elevate their image, expand their reach, and achieve lasting impact."
      ),
    },
    {
      type: "p",
      text: en(
        "With over six years of proven expertise, Icosium Global Network delivers tailored 360° communication strategies, designed to support luxury brands, high-end corporations, and forward-thinking institutions."
      ),
    },
  ],
  sections: [
    {
      id: "identity",
      title: en("Our Identity"),
      blocks: [
        { type: "p", text: en("We are more than a communication agency.") },
        {
          type: "p",
          text: en(
            "We are strategists, creatives, and technologists who understand the importance of perception, precision, and performance."
          ),
        },
        {
          type: "p",
          text: en(
            "We craft campaigns that resonate, activate and convert, combining aesthetic mastery with data-driven insights."
          ),
        },
      ],
    },
    {
      id: "what-we-do",
      title: en("What We Do Best"),
      blocks: [
        {
          type: "grid",
          items: [
            {
              title: en("Strategic Advisory"),
              body: en(
                "Brand positioning, multi-channel communication plans, and in-depth market intelligence tailored to your sector."
              ),
            },
            {
              title: en("Creative Excellence"),
              body: en(
                "Visual identity, graphic design, storytelling and high-impact advertising crafted with bold aesthetics and strategic purpose."
              ),
            },
            {
              title: en("Branding & Image Architecture"),
              body: en(
                "We build identities that last. Your brand becomes an experience — memorable, desirable, and influential."
              ),
            },
            {
              title: en("Editorial Expertise"),
              body: en(
                "Narrative creation aligned with your brand DNA. From concept to copy, every word is curated to inspire trust and drive action."
              ),
            },
            {
              title: en("Digital Performance"),
              body: en(
                "Web, mobile, and social strategies powered by the latest innovations in UX/UI and AI-based tools. We don’t follow trends — we anticipate them."
              ),
            },
            {
              title: en("Campaign Activation"),
              body: en(
                "Integrated roll-outs across print, digital, outdoor and broadcast platforms. We turn strategy into execution with precision and impact."
              ),
            },
            {
              title: en("Impact Measurement"),
              body: en(
                "KPIs. ROI. Conversions. Our tools go beyond numbers — they measure value. Your success is quantified and optimized in real time."
              ),
            },
          ],
        },
      ],
    },
    {
      id: "philosophy",
      title: en("Our Philosophy: Three Core Pillars"),
      blocks: [
        {
          type: "pillars",
          items: [
            {
              title: en("Strategic Intelligence"),
              body: en("Custom advisory rooted in deep market understanding"),
            },
            {
              title: en("Dynamic Creativity"),
              body: en("Fresh, immersive and bold ideas that stand out"),
            },
            {
              title: en("Result-Driven Content"),
              body: en("Message clarity that drives emotion and performance"),
            },
          ],
        },
      ],
    },
    {
      id: "creative",
      title: en("Creative as a Competitive Advantage"),
      blocks: [
        {
          type: "p",
          text: en("At Icosium Global Network, creativity is not a department — it is our culture."),
        },
        {
          type: "p",
          text: en(
            "Our design philosophy is inspired by harmony and purpose. Each visual is a strategic composition, balancing beauty and message. Every campaign is treated as a signature creation — bold, precise, and memorable."
          ),
        },
        {
          type: "p",
          text: en(
            "From audiovisual production to luxury packaging, our team creates moments that connect your brand to your audience in meaningful ways."
          ),
        },
      ],
    },
    {
      id: "innovation",
      title: en("Innovation for International Reach"),
      blocks: [
        {
          type: "p",
          text: en(
            "We operate across markets, languages, and cultures. Our multilingual capacity and international mindset make us the ideal partner for cross-border projects, transnational campaigns, and prestige launches ."
          ),
        },
        {
          type: "p",
          text: en(
            "We collaborate closely with the other entities of Ramos Group, ensuring that communication serves not only as a support function, but as a core growth engine for construction, industry, logistics, investment, and luxury."
          ),
        },
      ],
    },
    {
      id: "ethics",
      title: en("Ethics. Balance. Long-Term Value."),
      blocks: [
        {
          type: "p",
          text: en(
            "Our work environment is designed to foster creative excellence and well-being , empowering our team to innovate continuously."
          ),
        },
        {
          type: "p",
          text: en(
            "We are equally committed to sustainable communication, aligning our strategies with the values of responsibility, community engagement, and social impact."
          ),
        },
        {
          type: "p",
          text: en(
            "We believe that branding should inspire, respect, and transform — both the world of business and the communities it touches."
          ),
        },
      ],
    },
  ],
  closing: [
    { type: "h3", text: en("Your Vision, Our Mission") },
    {
      type: "p",
      text: en("At Icosium Global Network, we don't just follow global standards — we set them."),
    },
    {
      type: "quote",
      text: en(
        "Let us turn your ambition into a narrative that captivates, a strategy that delivers, and a brand that endures."
      ),
    },
  ],
};
