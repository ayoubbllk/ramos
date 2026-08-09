import type { SubsidiaryDocument } from "./types";
import { en } from "./types";

/** Source: Ramos Construction site copy — full text structured with varied block types */
export const constructionDocument: SubsidiaryDocument = {
  overview: [
    {
      type: "lead",
      text: en(
        "Construction of industrial metal buildings and modern warehouses — the exceptional legacy of Ramos Construction."
      ),
    },
    {
      type: "p",
      text: en(
        "Within the Ramos Group, Ramos Construction is the guardian of a rich heritage in construction, architecture and real estate investments. With decades of experience, this branch of the group perpetuates the family tradition initiated by the great builders of Algeria."
      ),
    },
    {
      type: "p",
      text: en(
        "With decades of expertise, Aimane Mahdi Ramos and the Mahdi heirs of the great builders have left an indelible mark on Algeria by associating their name with emblematic projects."
      ),
    },
  ],
  mission: en(
    "Ramos Construction, a true heir to an exceptional family tradition, continues to make its mark on history by meeting the challenges of modern architecture, innovative construction, and strategic real estate investments."
  ),
  sections: [
    {
      id: "heritage",
      title: en("Our Historical Heritage"),
      blocks: [
        {
          type: "p",
          text: en(
            "The history of Ramos Construction is closely linked to that of the ancient civilizations of the Mediterranean. From the Phoenicians to the Vandals, the Mahdi family, under the leadership of Aimane Mahdi Ramos, has left a lasting mark through its emblematic projects."
          ),
        },
        {
          type: "p",
          text: en(
            "The history of Ramos Construction is intertwined with Greek civilization, influencing the Mediterranean and leaving a lasting mark on the Numidian Empire in Algeria. Throughout the ages, from the Phoenicians to the Vandals, the Mahdi family has built an international reputation by designing and building complex civil engineering works around the world."
          ),
        },
        {
          type: "p",
          text: en(
            "Crossing North Africa under various dominations, from the Phoenicians to the Vandals, the Mahdi family contributed to building famous and international monuments, becoming an essential reference in the field of construction."
          ),
        },
        {
          type: "quote",
          text: en(
            "Each project becomes a canvas where the past dialogues with the present, creating an architectural symphony that transcends eras."
          ),
        },
      ],
    },
    {
      id: "expertise-pillars",
      title: en("Pillars of Expertise"),
      blocks: [
        {
          type: "p",
          text: en(
            "Today, Ramos Construction excels across major areas of activity: construction, industrial buildings, modern and historic renovation, transport infrastructure, hydraulics, environmental construction, and energy."
          ),
        },
        {
          type: "pillars",
          items: [
            {
              title: en("Architectural design"),
              body: en(
                "Innovative design based on the latest architectural trends, customized to client needs, with sustainability integrated into every plan and precise execution drawings."
              ),
            },
            {
              title: en("All-trades construction"),
              body: en(
                "Total control of every construction phase, effective coordination between trades, strict compliance with standards, and transparent collaborative project management."
              ),
            },
            {
              title: en("Rehabilitation & renovation"),
              body: en(
                "Precise restoration of existing buildings, adaptive reuse of space, and modernization that preserves authenticity while supporting sustainable renovation."
              ),
            },
            {
              title: en("Real estate investments"),
              body: en(
                "Full support from the search for high-potential properties to efficient portfolio management and optimization of real estate asset value."
              ),
            },
          ],
        },
      ],
    },
    {
      id: "renovation",
      title: en("Modern & Historical Renovation"),
      blocks: [
        {
          type: "lead",
          text: en(
            "Today, Ramos Construction distinguishes itself in two distinct, but complementary, approaches to renovation."
          ),
        },
        {
          type: "grid",
          items: [
            {
              title: en("A. Modern Renovation"),
              body: en(
                "With expertise in modern architectural design, the integration of cutting-edge technologies, and the meticulous selection of quality materials, Ramos Construction redefines spaces with a contemporary aesthetic and avant-garde solutions. Innovation and modernity guide every contemporary renovation."
              ),
            },
            {
              title: en("B. Historical Renovation"),
              body: en(
                "Guided by the passion to preserve the authenticity of historic buildings, the company carries out historical renovation projects with in-depth research, precise restoration and constant collaboration with heritage authorities."
              ),
            },
          ],
        },
        {
          type: "quote",
          text: en(
            "It is in this harmonious duality between historical and modern renovation that Ramos Construction fully embodies its exceptional heritage — timeless craftsmanship at the service of a modern vision."
          ),
        },
      ],
    },
    {
      id: "fields",
      title: en("Fields of Activities"),
      blocks: [
        {
          type: "p",
          text: en(
            "Ramos Construction operates across real estate development, construction of all works, rehabilitation and road networks, industrial buildings, transport, hydraulics, energy and more."
          ),
        },
        {
          type: "steps",
          items: [
            {
              number: "01",
              title: en("Real Estate Development"),
              subtitle: en("From construction to transparent sales and rental operations"),
              blocks: [
                {
                  type: "ul",
                  items: [
                    en("Real estate construction"),
                    en("Strategic development of real estate projects"),
                    en("Marketing of high-quality real estate"),
                    en("Transparent management of sales and rental operations"),
                    en("In-depth market studies for wise investments"),
                  ],
                },
              ],
            },
            {
              number: "02",
              title: en("Construction of All Works"),
              subtitle: en("Turnkey delivery with quality and safety at the core"),
              blocks: [
                {
                  type: "ul",
                  items: [
                    en("Execution of turnkey construction projects"),
                    en("Rigorous compliance with quality and safety standards"),
                    en("Effective coordination of all construction phases"),
                    en("Use of cutting-edge technologies for optimal efficiency"),
                  ],
                },
              ],
            },
            {
              number: "03",
              title: en("Road Networks"),
              subtitle: en("Rehabilitation and construction of road infrastructures"),
              blocks: [
                {
                  type: "ul",
                  items: [
                    en("Strategic rehabilitation of existing road networks"),
                    en("Design and construction of new road infrastructures"),
                    en("Innovation in sustainable construction techniques"),
                    en("Optimization of solutions for smooth traffic management"),
                  ],
                },
              ],
            },
            {
              number: "04",
              title: en("Construction & Industrial Buildings"),
              subtitle: en("Modern buildings and custom industrial facilities"),
              blocks: [
                {
                  type: "ul",
                  items: [
                    en("Expertise in the construction of modern and functional buildings"),
                    en("Use of high quality materials with deadlines and budgets respected"),
                    en("Design and construction of custom industrial facilities"),
                    en("Adaptation to sector standards and advanced technologies for efficiency"),
                    en("Sustainable solutions for the complex needs of industry"),
                  ],
                },
              ],
            },
            {
              number: "05",
              title: en("Infrastructure, Hydraulics & Energy"),
              subtitle: en("Transport, water resources, environment and sustainable energy"),
              blocks: [
                {
                  type: "ul",
                  items: [
                    en("Design and construction of critical transport infrastructures"),
                    en("Engagement in road, bridge and tunnel projects"),
                    en("Hydraulic engineering for water resources management"),
                    en("Environmentally friendly infrastructures and sustainable energy solutions"),
                    en("Safety, efficiency and environmental protection as priorities"),
                  ],
                },
              ],
            },
            {
              number: "06",
              title: en("Design, All Trades & Investments"),
              subtitle: en("From architectural intent to portfolio optimization"),
              blocks: [
                {
                  type: "ul",
                  items: [
                    en("Innovative architectural design and precise execution plans"),
                    en("Total control of all phases and coordination between trades"),
                    en("Rehabilitation and renovation with authenticity preserved"),
                    en("Search for properties with high potential"),
                    en("Efficient management of the real estate portfolio"),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "general-building",
      title: en("General Building Company"),
      blocks: [
        {
          type: "p",
          text: en(
            "Ramos Construction stands out as a general building company, capable of managing “all trades” projects thanks to the expertise of its partners. We offer extensive skills in design, construction, renovation and restructuring of works and housing of all types in Algeria."
          ),
        },
        {
          type: "p",
          text: en(
            "With more than 23 years of experience, Ramos Construction carries out new projects as well as rehabilitation and industrial maintenance work. Our design office, both national and international, develops execution plans and carries out preliminary studies, thus guaranteeing optimal preparation of each project."
          ),
        },
        {
          type: "p",
          text: en(
            "Our company, in constant evolution, places quality and safety at the center of its priorities, relying on qualified personnel and state-of-the-art equipment."
          ),
        },
        { type: "h3", text: en("Programs we deliver") },
        {
          type: "ul",
          items: [
            en("Collective housing"),
            en("Commercial and industrial premises"),
            en("Leisure centers — swimming pools, sports halls, theaters"),
            en("Public places such as schools and hospitals"),
            en("Luxury villas, duplexes and bungalows by the sea"),
          ],
        },
      ],
    },
    {
      id: "public-works",
      title: en("Leader in Public Works & Civil Engineering"),
      blocks: [
        {
          type: "p",
          text: en(
            "The leading public works and civil engineering company in Algeria and the Mediterranean region, Ramos Construction is recognized for its expertise in all market segments."
          ),
        },
        {
          type: "p",
          text: en(
            "Our achievements throughout the territory demonstrate our ability to offer a wide range of services in the design, construction, and renovation of buildings, mixed programs, and multifunctional urban blocks."
          ),
        },
        {
          type: "p",
          text: en(
            "This versatility allows us to support our clients at every stage of their project, thus creating sustainable value. We take on the challenges of sustainable cities and ensure that we meet current economic, social and environmental requirements throughout North Africa."
          ),
        },
      ],
    },
    {
      id: "values",
      title: en("Our Values & Commitments"),
      blocks: [
        {
          type: "pillars",
          items: [
            {
              title: en("Quality"),
              body: en(
                "Our primary ambition is to satisfy our customers. Quality is at the heart of our concerns, whether it is the completion of construction sites, the monitoring of work or the finishing of the building. We are committed to providing an impeccable service at every stage."
              ),
            },
            {
              title: en("Safety"),
              body: en(
                "Safety sits at the center of our priorities. Qualified personnel and state-of-the-art equipment support rigorous compliance with quality and safety standards on every site."
              ),
            },
            {
              title: en("Sustainability"),
              body: en(
                "We take on the challenges of sustainable cities and meet economic, social and environmental requirements across North Africa — from eco-friendly infrastructures to sustainable energy solutions."
              ),
            },
          ],
        },
      ],
    },
    {
      id: "industrial",
      title: en("Industrial Buildings"),
      blocks: [
        {
          type: "lead",
          text: en("Expertise in industrial building construction, expansion and renovation."),
        },
        {
          type: "p",
          text: en(
            "At Ramos Construction, we pride ourselves on our expertise in the construction, expansion and renovation of industrial buildings. With recognized know-how, we support professionals in their projects, whether it is to create new spaces or adapt existing structures to meet modern requirements."
          ),
        },
        {
          type: "p",
          text: en(
            "Industrial buildings play an essential role for many companies, providing spaces dedicated to the installation of technical teams, production machines, as well as storage areas. Each project is unique and requires special attention to technical standards and land study in order to guarantee optimal construction."
          ),
        },
        { type: "h3", text: en("Types of Industrial Buildings") },
        {
          type: "grid",
          items: [
            {
              title: en("Warehouses & storage"),
              body: en("Deposit or storage warehouses for logistics, goods or raw materials needs."),
            },
            {
              title: en("Production plants"),
              body: en("Spaces specially designed to accommodate your production lines."),
            },
            {
              title: en("Cold stores"),
              body: en("Facilities for storing products requiring controlled temperatures."),
            },
            {
              title: en("Livestock buildings"),
              body: en("Structures for agricultural and animal breeding activities."),
            },
            {
              title: en("Garages & storage areas"),
              body: en("Spaces for vehicles, equipment and machinery."),
            },
            {
              title: en("Exhibition & offices"),
              body: en(
                "Buildings combining workspace and showroom for the presentation of your products or services."
              ),
            },
          ],
        },
      ],
    },
    {
      id: "custom-industrial",
      title: en("Custom Solutions for Industrial Buildings"),
      blocks: [
        {
          type: "p",
          text: en(
            "Thanks to our flexibility and our mastery of prefabricated steel buildings, we offer custom solutions adapted to each project. Whether for a warehouse, a premises, a logistics hangar, a factory or a garage, Ramos Construction is committed to providing robust and functional buildings, perfectly adjusted to your needs."
          ),
        },
        {
          type: "p",
          text: en(
            "We also integrate specialized equipment, such as overhead cranes, monorails or jib cranes for handling, directly into the design of your building."
          ),
        },
        { type: "h3", text: en("Technical Characteristics") },
        {
          type: "p",
          text: en(
            "When designing an industrial building, several factors must be taken into account to ensure a solid and durable construction:"
          ),
        },
        {
          type: "ul",
          items: [
            en(
              "Construction materials — galvanized steel or glued laminated timber, depending on robustness requirements"
            ),
            en(
              "Foundations — reinforced concrete foundations or prefabricated pads for stability and longevity"
            ),
            en("Custom dimensions — height, length and width optimized for available space"),
            en(
              "Interior design — doors, windows, smoke vents and fittings integrated for functional needs"
            ),
            en("Technical specifications — plumbing, electricity and other installations"),
            en(
              "Architectural design — classic, dynamic or modern style according to client preferences and intended use"
            ),
          ],
        },
      ],
    },
    {
      id: "why-ramos",
      title: en("Why Choose Ramos Construction?"),
      blocks: [
        {
          type: "p",
          text: en(
            "With our expertise and commitment to quality and safety, Ramos Construction is the ideal partner for your industrial construction projects in Algeria and the Mediterranean region."
          ),
        },
        {
          type: "quote",
          text: en(
            "Entrust us with your projects, and we will take care of the rest to guarantee results that meet your expectations."
          ),
        },
      ],
    },
  ],
  closing: [
    {
      type: "p",
      text: en(
        "Ramos Construction — building tomorrow’s infrastructure today, with the strength of an exceptional family legacy."
      ),
    },
  ],
};
