// Mirrors the "Beyond Physio | 3K Community Registration" Google Form (payment step omitted).
// type: text | email | tel | number | textarea | radio | checkbox
export const sections = [
  {
    title: 'About you',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
      { name: 'age', label: 'Age', type: 'number', required: true, min: 16, max: 99, inputMode: 'numeric' },
      { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
      {
        name: 'phone',
        label: 'Contact number',
        type: 'tel',
        required: true,
        autoComplete: 'tel',
        placeholder: '10-digit mobile number',
      },
      { name: 'gender', label: 'Gender', type: 'radio', required: true, options: ['Male', 'Female'] },
      { name: 'instagram', label: 'Instagram ID', type: 'text', required: true, placeholder: '@yourhandle' },
      {
        name: 'location',
        label: 'Location',
        type: 'radio',
        required: true,
        options: ['Hyderabad', 'Outside Hyderabad'],
      },
    ],
  },
  {
    title: 'Your work',
    fields: [
      {
        name: 'status',
        label: 'Professional current status',
        type: 'radio',
        required: true,
        options: [
          'Physiotherapy Student',
          'Physiotherapy Intern',
          'Post Graduation',
          'Faculty',
          'Physiotherapy Practitioner',
        ],
      },
      {
        name: 'institution',
        label: 'College / Institution / Hospital / Clinic name',
        type: 'text',
        required: true,
        wide: true,
        autoComplete: 'organization',
      },
    ],
  },
  {
    title: 'Interests',
    fields: [
      {
        name: 'interestArea',
        label: 'Which area of physiotherapy interests you?',
        type: 'radio',
        required: true,
        options: [
          'Orthopaedics Physiotherapy',
          'Neurological Physiotherapy',
          'Cardiopulmonary Physiotherapy',
          'Sports Physiotherapy',
          'Paediatric Physiotherapy',
          'Geriatric Physiotherapy',
          "Women's Health",
          'Exercise & Fitness',
        ],
      },
      {
        name: 'goal',
        label: 'What would you like to gain from Beyond Physio?',
        type: 'radio',
        required: true,
        options: [
          'Professional Networking',
          'Clinical Knowledge & Practical Skills',
          'Workshops & Hands-on Training',
          'Case Discussions',
          'Research & Academic Guidance',
          'Personal & Professional Development',
          'Fitness & Wellness',
          'Collaboration & Projects',
          'Others',
        ],
      },
      {
        name: 'events',
        label: 'Which Beyond Physio events would you be interested in attending?',
        hint: 'Pick all that apply',
        type: 'checkbox',
        required: true,
        options: [
          'Clinical Workshops',
          'Case Discussion Sessions',
          'Guest Lectures',
          'Educational Sessions',
          'Networking Events',
          'Sports & Fitness Events',
          'Community Runs / Fitness Challenges',
          'Social Gatherings',
        ],
      },
      {
        name: 'frequency',
        label: 'How often would you like to participate in community events?',
        type: 'radio',
        options: ['Monthly', 'Every 2–3 months', 'Depends on the event'],
      },
      {
        name: 'collaborate',
        label: 'Would you be interested in collaborating on future projects or events?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'Maybe'],
      },
    ],
  },
  {
    title: 'Anything else',
    fields: [
      {
        name: 'message',
        label: 'Questions or anything you want us to know?',
        type: 'textarea',
        wide: true,
        placeholder: "We're here to help.",
      },
    ],
  },
]

export const allFields = sections.flatMap((s) => s.fields)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+91|0)?[6-9]\d{9}$/
const INSTAGRAM_RE = /^@?[A-Za-z0-9._]{1,30}$/

// value is a string, or a string[] for checkbox groups. Returns an error message or null.
export function validateField(field, value) {
  const empty = Array.isArray(value) ? value.length === 0 : value.trim() === ''
  if (empty) {
    if (!field.required) return null
    if (field.type === 'checkbox') return 'Pick at least one option'
    if (field.type === 'radio') return 'Please choose an option'
    return 'This field is required'
  }

  switch (field.name) {
    case 'email':
      return EMAIL_RE.test(value.trim()) ? null : 'Enter a valid email address'
    case 'phone':
      return PHONE_RE.test(value.replace(/[\s-]/g, '')) ? null : 'Enter a valid 10-digit mobile number'
    case 'instagram':
      return INSTAGRAM_RE.test(value.trim()) ? null : 'Enter a valid Instagram handle'
    case 'age': {
      const n = Number(value)
      return Number.isInteger(n) && n >= field.min && n <= field.max
        ? null
        : `Enter an age between ${field.min} and ${field.max}`
    }
    default:
      return null
  }
}
