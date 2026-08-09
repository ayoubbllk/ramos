import type { SubsidiaryDocument } from "./types";
import { en } from "./types";

/** Source: FICHIE TEXTE CYBER CONTROL ANG (8).docx — full text preserved */
export const cyberControlDocument: SubsidiaryDocument = {
  overview: [
    {
      type: "p",
      text: en(
        "Cyber-Control, a subsidiary of Ramos Group and Ramos Business Center, is the Algerian leader in physical and digital security solutions for critical infrastructures.We design, deploy and maintain tailor-made security systems, integrating artificial intelligence, cybersecurity and automation, to protect airports, land borders and seaports."
      ),
    },
  ],
  mission: en(
    "Our mission:To guarantee safety, streamline flows and anticipate threats through cutting-edge, flexible and scalable technologies."
  ),
  sections: [
    {
      id: "airport",
      title: en("I. AIRPORT SECURITY SOLUTIONS"),
      blocks: [
        {
          type: "p",
          text: en(
            "Modern airports face complex challenges: passenger flow management, threat prevention, compliance with international standards (ICAO, IATA), and integration of health protocols.Cyber-Control provides a comprehensive end-to-end solution, covering every link in the airport security chain."
          ),
        },
        { type: "h3", text: en("1. Perimeter Security & Video Surveillance") },
        { type: "h4", text: en("🔹 Intelligent Video Surveillance (IVS)") },
        { type: "h4", text: en("HD / Thermal Cameras:") },
        {
          type: "ul",
          items: [
            en(
              "7 CYBER CONTROL RAMOS BUSINESS CENTER thermal cameras installed at terminal entrances, connected to the Management Center (MxMC)."
            ),
            en("Real-time body temperature detection (customizable thresholds)."),
            en(
              "In case of alert (e.g. fever > 38°C), the individual is isolated for medical control or directed to the airport COVID-19 testing center."
            ),
          ],
        },
        { type: "h4", text: en("AI-Powered Video Analytics:") },
        {
          type: "ul",
          items: [
            en(
              "Detection of suspicious movements, abandoned objects, abnormal behavior, and fire risks (even in low-light conditions)."
            ),
            en("Automatic alerts transmitted to the Airport Operations Center (APOC)."),
          ],
        },
        {
          type: "p",
          text: en(
            "🔹 Integration with Cyber-Control Security CenterOur solution seamlessly integrates with the Cyber-Control video management system, providing airport authorities with centralized control over all video surveillance applications."
          ),
        },
        { type: "h3", text: en("2. Access Control & Biometric Identification") },
        { type: "h4", text: en("🔹 Access Control Systems:") },
        {
          type: "ul",
          items: [
            en("Biometric readers: facial recognition, fingerprint, iris."),
            en("Contactless smart cards for sensitive areas (technical rooms, boarding zones)."),
            en("Real-time access rights management via the Security Center SaaS platform."),
          ],
        },
        { type: "h4", text: en("🔹 Automatic Tray Return Systems") },
        {
          type: "p",
          text: en("Optimization of baggage processing, reduced waiting times and prevention of errors."),
        },
        { type: "h3", text: en("3. Threat Detection & Screening") },
        { type: "h4", text: en("🔹 Screening Systems:") },
        {
          type: "ul",
          items: [
            en("X-ray scanners for baggage and passengers."),
            en("Metal detectors and millimeter-wave scanners (non-intrusive)."),
            en("Explosives Trace Detection (ETD) and hazardous substance detectors."),
          ],
        },
        { type: "h4", text: en("🔹 Drone Detection:") },
        {
          type: "p",
          text: en("Radar and RF systems to identify and neutralize unauthorized drones in airport zones."),
        },
        { type: "h3", text: en("4. Passenger Flow & Operational Management") },
        { type: "h4", text: en("🔹 Integrated Flow Management Solutions:") },
        {
          type: "ul",
          items: [
            en("Queue management: digital displays, interactive kiosks."),
            en("Boarding gate optimization: passenger guidance systems."),
            en("Rugged tablets for logistics (catering, staff management)."),
          ],
        },
        {
          type: "p",
          text: en("🔹 Airport Operations Center (APOC)A centralized platform supervising:"),
        },
        {
          type: "ul",
          items: [
            en("Video surveillance"),
            en("Access control"),
            en("Incident management"),
            en("Emergency communications (4,600 loudspeakers for evacuation)"),
          ],
        },
        { type: "h3", text: en("5. Fire Protection & Building Safety") },
        { type: "h4", text: en("🔹 MM8000 Hazard Management System integrated with Sinteso:") },
        {
          type: "ul",
          items: [
            en("9,000 fire detectors, 400 CO detectors, 200 surveillance cameras"),
            en("28 Cyber-Control digital recorders"),
            en("Hierarchical alerts and standardized display on the MxMC dashboard"),
          ],
        },
        { type: "h4", text: en("🔹 Building Automation (TIP – Total Integrated Power):") },
        {
          type: "ul",
          items: [
            en("Power distribution from medium voltage to socket outlets"),
            en("Electrical network stability monitoring and early anomaly detection (fire/failure prevention)"),
            en("Real-time energy consumption monitoring"),
          ],
        },
        {
          type: "p",
          text: en(
            "Security, fire protection and building automation are fully integrated into a “Total Building Solution.”"
          ),
        },
        { type: "h3", text: en("Cyber-Control Airport Security Solutions") },
        {
          type: "ul",
          items: [
            en("Airport perimeter security"),
            en("Video analytics for suspicious activity detection"),
            en("Intelligent control room"),
            en("Airport queue management"),
          ],
        },
        { type: "h3", text: en("Additional Airport Security Capabilities") },
        {
          type: "ul",
          items: [
            en("Drone detection"),
            en("Clear communication across multiple zones"),
            en("Crowd evacuation during active threats"),
            en("Airfield security"),
          ],
        },
        { type: "h3", text: en("Bosch Operational Solutions for Airports") },
        {
          type: "ul",
          items: [
            en("Airport parking management"),
            en("Airport boarding gate management"),
          ],
        },
        { type: "h3", text: en("OPTIMAL SOLUTIONS") },
        {
          type: "ul",
          items: [
            en("Video surveillance"),
            en("Intrusion systems"),
            en("Access control"),
            en("Electronic article surveillance"),
            en("Visitor management"),
            en("Security monitoring"),
            en("Workplace management"),
          ],
        },
      ],
    },
    {
      id: "land-border",
      title: en("II. LAND BORDER SECURITY SOLUTIONS"),
      blocks: [
        {
          type: "p",
          text: en(
            "Land borders require continuous surveillance, strict control of vehicles and individuals, and strong coordination between customs, police and military forces."
          ),
        },
        { type: "h3", text: en("1. Perimeter Security") },
        { type: "h4", text: en("🔹 Intrusion Detection:") },
        {
          type: "ul",
          items: [
            en("Infrared sensors, radars and thermal cameras along fences"),
            en("AI video analytics distinguishing animals from intruders"),
          ],
        },
        { type: "h4", text: en("🔹 Automatic Number Plate Recognition (ANPR):") },
        {
          type: "p",
          text: en("Instant identification of incoming and outgoing vehicles"),
        },
        { type: "h3", text: en("2. Checkpoints") },
        { type: "h4", text: en("🔹 Automated Vehicle Control:") },
        {
          type: "ul",
          items: [
            en("X-ray scanners for cargo inspection"),
            en("Metal and illicit substance detection gates"),
          ],
        },
        { type: "h4", text: en("🔹 Biometric Verification of Individuals:") },
        {
          type: "ul",
          items: [
            en("Facial recognition and fingerprint stations"),
            en("Real-time integration with national databases"),
          ],
        },
        { type: "h3", text: en("3. Integrated Command Center") },
        {
          type: "p",
          text: en("A centralized platform enabling:"),
        },
        {
          type: "ul",
          items: [
            en("Coordination between Customs, Gendarmerie and Police"),
            en("Real-time flow visualization"),
            en("Automated alerts in case of anomalies"),
          ],
        },
      ],
    },
    {
      id: "seaport",
      title: en("III. SEAPORT SECURITY SOLUTIONS"),
      blocks: [
        {
          type: "p",
          text: en(
            "Ports are highly sensitive assets. Managing containers, vessels, personnel and cargo flows requires multi-layered security."
          ),
        },
        { type: "h3", text: en("1. Perimeter & Maritime Surveillance") },
        { type: "h4", text: en("🔹 Marine Radars & PTZ Cameras:") },
        {
          type: "ul",
          items: [
            en("360° monitoring of port areas and maritime approaches"),
            en("Detection of unauthorized vessels"),
          ],
        },
        { type: "h4", text: en("🔹 Anti-Drone Systems:") },
        { type: "p", text: en("Protection against aerial threats") },
        { type: "h3", text: en("2. Container & Cargo Security") },
        { type: "h4", text: en("🔹 Gamma-Ray & X-ray Scanners:") },
        { type: "p", text: en("Non-intrusive container inspection") },
        { type: "h4", text: en("🔹 RFID Tracking:") },
        { type: "p", text: en("Real-time traceability of containers and vehicles") },
        { type: "h3", text: en("3. Access Control to Sensitive Areas") },
        {
          type: "ul",
          items: [
            en("Biometric systems for dockers, drivers and port staff"),
            en("Automated barriers with badge readers and facial recognition"),
          ],
        },
        { type: "h3", text: en("4. Incident Management & Cybersecurity") },
        { type: "h4", text: en("🔹 Security Center Platform:") },
        {
          type: "p",
          text: en("Integration of video surveillance, access control and incident management"),
        },
        { type: "h4", text: en("🔹 OT/IT Network Protection:") },
        {
          type: "p",
          text: en("Firewalls, data encryption and regular security audits"),
        },
      ],
    },
    {
      id: "ai",
      title: en("IV. ADVANCED TECHNOLOGIES & ARTIFICIAL INTELLIGENCE"),
      blocks: [
        { type: "h3", text: en("1. Artificial Intelligence in Security") },
        { type: "h4", text: en("🔹 Facial & Behavioral Recognition:") },
        {
          type: "ul",
          items: [
            en("Identification of wanted individuals"),
            en("Detection of suspicious behavior (e.g. nervousness, repetitive movements)"),
          ],
        },
        { type: "h4", text: en("🔹 Threat Prediction:") },
        {
          type: "p",
          text: en("Machine learning algorithms analyzing historical data to anticipate risks"),
        },
        { type: "h4", text: en("🔹 Crowd Analytics:") },
        {
          type: "p",
          text: en("Flow optimization, abnormal crowd detection and queue management"),
        },
        { type: "h3", text: en("2. Integrated Cybersecurity") },
        { type: "h4", text: en("🔹 Security Center SaaS:") },
        {
          type: "ul",
          items: [
            en("Access Control as a Service (CAaaS)"),
            en("Video Surveillance as a Service (VSaaS)"),
            en("Cloud-managed devices"),
          ],
        },
        { type: "h4", text: en("🔹 Critical Systems Protection:") },
        {
          type: "ul",
          items: [
            en("Video and data encryption"),
            en("Multi-factor authentication (MFA)"),
            en("Next-generation firewalls (NGFW)"),
          ],
        },
        { type: "h4", text: en("🔹 Compliance:") },
        { type: "p", text: en("ISO 27001, NIST, GDPR standards") },
      ],
    },
    {
      id: "platform",
      title: en("V. UNIFIED PLATFORM: SECURITY CENTER"),
      blocks: [
        { type: "lead", text: en("One single platform to manage everything") },
        {
          type: "table",
          headers: [en("Module"), en("Features")],
          rows: [
            [en("Access Control"), en("Rights management, badges, biometrics")],
            [en("Video Surveillance"), en("Integration of thousands of cameras, AI video analytics")],
            [en("License Plate Recognition"), en("Real-time ANPR")],
            [en("Communications"), en("Loudspeaker system for alerts and evacuation")],
            [en("Incident Management"), en("Real-time alert creation, tracking and resolution")],
          ],
        },
        {
          type: "p",
          text: en(
            "✅ Flexibility: On-Premise or Cloud (SaaS) deployment✅ Scalability: Easy addition of sensors, cameras or sites✅ Cyber-Secured: Zero-trust architecture"
          ),
        },
      ],
    },
    {
      id: "why",
      title: en("VI. WHY CHOOSE CYBER-CONTROL?"),
      blocks: [
        {
          type: "p",
          text: en(
            "🔸 Proven Expertise:Over 50 projects deployed in airports, borders and ports across Algeria and Africa."
          ),
        },
        {
          type: "p",
          text: en(
            "🔸 Technology Partnerships:Collaboration with leading international European companies."
          ),
        },
        {
          type: "p",
          text: en(
            "🔸 24/7 Support:Supervision center based in Algiers, on-site intervention within 4 hours."
          ),
        },
        {
          type: "p",
          text: en(
            "🔸 Fast Return on Investment (ROI):40% reduction in incidents and optimized operational costs."
          ),
        },
      ],
    },
  ],
  closing: [
    {
      type: "p",
      text: en("Cyber-Control – Subsidiary of Ramos Group & Ramos Business Center"),
    },
    {
      type: "p",
      text: en(
        "At Cyber-Control, we are committed to being your trusted partner, delivering unmatched expertise and absolute peace of mind."
      ),
    },
    {
      type: "p",
      text: en(
        "Our mission:To become your strongest ally by placing protection at the heart of everything we do. Through innovative, rigorous and anticipatory solutions, we turn security challenges into opportunities for serenity."
      ),
    },
    {
      type: "p",
      text: en(
        "Your security is our priority.With Cyber-Control, discover a unique solution and total protection designed to defend your critical infrastructures, safeguard your data and ensure operational continuity."
      ),
    },
    {
      type: "quote",
      text: en("🔐 Your peace of mind, our commitment."),
    },
  ],
};
