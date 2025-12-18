export const questions = [
  // --- Section A: Profile ---
  {
    id: "q1",
    section: "Section A: Profile",
    text: "1. Current posting (District / Organisation):",
    type: "text"
  },
  {
    id: "q2",
    section: "Section A: Profile",
    text: "2. Years in service (IAS):",
    type: "radio",
    options: ["0–5", "6–10", "11–20", "More than 20"]
  },
  {
    id: "q3",
    section: "Section A: Profile",
    text: "3. Current role:",
    type: "radio",
    options: ["District Magistrate", "Municipal Commissioner", "Other"]
  },

  // --- Section B: Exposure ---
  {
    id: "q4",
    section: "Section B: Exposure to Focus Domains",
    text: "4. In your career, have you had significant responsibility in the following areas? (Select all that apply)",
    type: "checkbox",
    options: [
      "Ease of Doing Business / Single Window Clearance",
      "Urban development / Town planning / Urban Local Bodies",
      "Tourism promotion / Eco-tourism / Cultural tourism",
      "Citizen service delivery (Common Service Centres, service guarantee acts, etc.)",
      "Poverty reduction / Rural development / Livelihoods",
      "Digital governance / Data, Artificial Intelligence, Sustainable Development Goals monitoring"
    ]
  },
  {
    id: "q5",
    section: "Section B: Exposure to Focus Domains",
    text: "5. In your current post, which ONE of these areas occupies the largest share of your time?",
    type: "radio",
    options: [
      "Ease of Doing Business",
      "Urban development",
      "Tourism",
      "Citizen services",
      "Poverty reduction",
      "Digital governance / Artificial Intelligence / Sustainable Development Goals"
    ]
  },

  // --- Session 1: Responsive Governance ---
  
//   Section C: Your Perception of Frontline Staff
  
  {
    id: "q6",
    section: "Session 1: Responsive Governance",
    text: "6. Most frontline staff primarily follow rules to avoid personal blame or disciplinary action",
    type: "likert"
  },
  {
    id: "q7",
    section: "Session 1: Responsive Governance",
    text: "7. A significant proportion of frontline staff are genuinely motivated by public interest.",
    type: "likert"
  },
  {
    id: "q8",
    section: "Session 1: Responsive Governance",
    text: "8. Fear of audits or vigilance inquiries often makes frontline staff overly cautious and risk averse.",
    type: "likert"
  },
  {
    id: "q9",
    section: "Session 1: Responsive Governance",
    text: "9. In practice, concerns about job security tend to override citizen-centric thinking among frontline staff.",
    type: "likert"
  },

  // --- Section C2: Discretion ---
  {
    id: "q10",
    section: "Session 1: Responsive Governance",
    text: "10. Frontline staff in my district generally feel they have limited discretion to adapt rules to local contexts.",
    type: "likert"
  },
  {
    id: "q11",
    section: "Session 1: Responsive Governance",
    text: "11. When provided with some flexibility, frontline staff often use it constructively to resolve citizen issues.",
    type: "likert"
  },
  {
    id: "q12",
    section: "Session 1: Responsive Governance",
    text: "12. Rigid, uniform implementation of schemes—without adaptation to local needs—is common.",
    type: "likert"
  },
  {
    id: "q13",
    section: "Session 1: Responsive Governance",
    text: "13. There are cases where frontline staff exercise discretion in ways that unnecessarily burden citizens or businesses.",
    type: "likert"
  },

  // --- Section C3: Accountability ---
  {
    id: "q14",
    section: "Session 1: Responsive Governance",
    text: "14. The accountability system primarily holds frontline staff answerable to superiors and reporting requirements, rather than to citizens.",
    type: "likert"
  },
  {
    id: "q15",
    section: "Session 1: Responsive Governance",
    text: "15. Citizen grievance redressal and feedback mechanisms in my district effectively influence frontline behaviour.",
    type: "likert"
  },
  {
    id: "q16",
    section: "Session 1: Responsive Governance",
    text: "16. Performance appraisals and target-setting adequately reward citizen-centric and innovative actions.",
    type: "likert"
  },
  {
    id: "q17",
    section: "Session 1: Responsive Governance",
    text: "17. In practice, frontline staff perceive greater risk in taking action (errors of commission) than in remaining inactive.",
    type: "likert"
  },

  // --- Section C4: Behaviour ---
  {
    id: "q18",
    section: "Session 1: Responsive Governance",
    text: "18. Frontline staff generally treat citizens with respect and patience.",
    type: "likert"
  },
  {
    id: "q19",
    section: "Session 1: Responsive Governance",
    text: "19. Many frontline staff lack current knowledge of procedures related to Ease of Doing Business, urban development, tourism, or welfare schemes.",
    type: "likert"
  },
  {
    id: "q20",
    section: "Session 1: Responsive Governance",
    text: "20. A culture focused on files and formalities still prevails over an outcome-oriented approach.",
    type: "likert"
  },
  {
    id: "q21",
    section: "Session 1: Responsive Governance",
    text: "21. I frequently observe frontline staff going beyond their regular duties to support vulnerable citizens during crises.",
    type: "likert"
  },

//   Session 2: Ease of Doing Business (EoDB)
    {
    id: "q22",
    section: "Session 2: Ease of Doing Business (EoDB)",
    text: "22. At the district level, Ease of Doing Business processes are generally predictable and completed within stipulated timelines for most applicants.",
    type: "likert"
  },
  {
    id: "q23",
    section: "Session 2: Ease of Doing Business (EoDB)",
    text: "23. Frontline staff handling business permissions often adopt a cautious approach by strictly enforcing all conditions.",
    type: "likert"
  },
  {
    id: "q24",
    section: "Session 2: Ease of Doing Business (EoDB)",
    text: "24. Digital systems (such as single-window portals and online approvals) have effectively reduced discretionary powers and opportunities for rent-seeking.",
    type: "likert"
  },
  {
    id: "q25",
    section: "Session 2: Ease of Doing Business (EoDB)",
    text: "25. Despite reforms, informal intermediaries (agents or facilitators) continue to play a key role in navigating district-level business clearances.",
    type: "likert"
  },

//   Session 3: Challenges in Urban Development and Way Forward
  // --- Section D2: Urban Development ---
  {
    id: "q26",
    section: "Session 3: Challenges in Urban Development and Way Forward",
    text: "26. Building permissions and land-use conversion decisions are largely rule-based and free from arbitrariness.",
    type: "likert"
  },
  {
    id: "q27",
    section: "Session 3: Challenges in Urban Development and Way Forward",
    text: "27. Frontline staff in urban areas possess sufficient capacity to use planning tools, GIS, and regulatory frameworks.",
    type: "likert"
  },
  {
    id: "q28",
    section: "Session 3: Challenges in Urban Development and Way Forward",
    text: "28. Urban approval processes often involve excessive emphasis on documentation, signatures, and in-person visits.",
    type: "likert"
  },

//   Session 4: Law Session
{
    id: "q29",
    section: "Session 4: Law Session",
    text: "29. In your district, which of the following best describes your primary approach toward managing frontline staff?",
    type: "radio",
    options: [
      "Strict enforcement of compliance ('state agent' orientation)",
      "Emphasis on citizen-centric problem-solving ('citizen agent' orientation)",
      "Encouragement of innovation ('policy entrepreneur' orientation)",
      "Focus on minimising risks and avoiding controversy"
    ]
  },

  // Session 5: PPP & Infrastructure

  {
    id: "q30",
    section: "Session 5: PPP & Infrastructure",
    text: "29. District-level approvals for tourism-related ventures are typically processed within reasonable and declared timelines.",
    type: "likert"
  },
  {
    id: "q31",
    section: "Session 5: PPP & Infrastructure",
    text: "30. Frontline staff view local communities and entrepreneurs as partners in tourism development.",
    type: "likert"
  },
  {
    id: "q32",
    section: "Session 5: PPP & Infrastructure",
    text: "31. Coordination among departments (such as police, transport, forest, and urban local bodies) remains a significant bottleneck at the implementation stage.",
    type: "likert"
  },

  
  {
    id: "q33",
    section: "Session 5: PPP & Infrastructure",
    text: "32. For most low-income households, the effort required to understand and comply with scheme requirements remains substantial.",
    type: "likert"
  },
  {
    id: "q34",
    section: "Session 5: PPP & Infrastructure",
    text: "33. Frontline workers actively identify and assist the most vulnerable households in accessing welfare schemes.",
    type: "likert"
  },
  {
    id: "q35",
    section: "Session 5: PPP & Infrastructure",
    text: "34. During crises (such as pandemics, floods, or droughts), frontline staff in my district have generally acted as protectors of public interest.",
    type: "likert"
  },
  {
    id: "q36",
    section: "Session 5: PPP & Infrastructure",
    text: "35. Selective or biased implementation of welfare schemes by frontline staff continues to be a concern.",
    type: "likert"
  },

    {
    id: "q37",
    section: "Session 5: PPP & Infrastructure",
    text: "36. District-level digital platforms (portals, dashboards, mobile applications) have substantially transformed frontline work practices.",
    type: "likert"
  },
  {
    id: "q38",
    section: "Session 5: PPP & Infrastructure",
    text: "37. The adoption of digital systems has often shifted discretionary decision-making upward (to system designers) rather than eliminating it entirely.",
    type: "likert"
  },
  {
    id: "q39",
    section: "Session 5: PPP & Infrastructure",
    text: "38. Data and dashboards are routinely used to guide frontline staff toward achieving SDG-related outcomes.",
    type: "likert"
  },
  {
    id: "q40",
    section: "Session 5: PPP & Infrastructure",
    text: "39. Limited digital literacy and inadequate infrastructure among frontline staff pose a major barrier to leveraging AI and advanced analytics.",
    type: "likert"
  },

    
  {
    id: "q41",
    section: "Session 5: PPP & Infrastructure",
    text: "41. To what extent do you agree: 'I feel empowered to protect frontline staff who act in good faith, even if they take reasonable risks to assist citizens or businesses.'",
    type: "likert"
  },
  {
    id: "q42",
    section: "Session 5: PPP & Infrastructure",
    text: "42. To what extent do you agree: 'Existing rules and accountability mechanisms often compel me to enforce rigid implementation, even when greater flexibility would yield better outcomes.'",
    type: "likert"
  },

    {
    id: "q43",
    section: "Session 5: PPP & Infrastructure",
    text: "43. Please describe one example where frontline staff in your district demonstrated exceptional commitment by acting as 'public protectors,' leading to significantly improved outcomes.",
    type: "textarea"
  },
  {
    id: "q44",
    section: "Session 5: PPP & Infrastructure",
    text: "44. Please describe one example where frontline behaviour reflected self-preservation or avoidance of responsibility, resulting in negative impacts for citizens or businesses.",
    type: "textarea"
  },
  {
    id: "q45",
    section: "Session 5: PPP & Infrastructure",
    text: "45. Suggest three specific changes—in rules, incentives, or monitoring mechanisms—that you believe would most effectively encourage citizen-centric and innovative implementation by frontline staff in your district.",
    type: "textarea"
  }


];